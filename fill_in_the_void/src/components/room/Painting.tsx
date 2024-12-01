import React, { useRef, useState, useEffect } from 'react';
import { useTexture, Text } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

interface PaintingProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    textureUrl: string;
    title: string;
    author: string;
    description: string;
    onClick: (position: Vector3, angle: number) => void;
}

const Painting: React.FC<PaintingProps> = ({position, rotation = [0, 0, 0], textureUrl, title, author, description, onClick}) => {
    const texture = useTexture(textureUrl);
    const ref = useRef<Mesh>(null);
    const [aspectRatio, setAspectRatio] = useState(1);
    const [isTitleVisible, setIsTitleVisible] = useState(true);
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

    const { camera } = useThree();

    useEffect(() => {
        const img = new Image();
        img.src = textureUrl;

        img.onload = () => {
            const ratio = img.width / img.height;
            setAspectRatio(ratio);
        };

        return () => {
            setAspectRatio(1);
        };
    }, [textureUrl]);

    const planeHeight = 4;
    const planeWidth = planeHeight * aspectRatio;

    useFrame(() => {
        if (ref.current) {
            const paintingPosition = new Vector3(...position);
            const cameraPosition = camera.position;
            const direction = new Vector3().subVectors(paintingPosition, cameraPosition).normalize();
            const paintingNormal = new Vector3(0, 0, 1).applyQuaternion(ref.current.quaternion);

            const angle = direction.angleTo(paintingNormal);
            const isVisible = angle < Math.PI / 2;
            setIsTitleVisible(isVisible);
        }
    });

    const [hoverPaint, setHoverPaint] = useState<boolean>(false);
    const [showButtonPaint, setShowButtonPaint] = useState<boolean>(false);


    const handlePaintHover = () => {
        setHoverPaint(true);
        setShowButtonPaint(true);
    };

    const handlePaintLeave = () => {
        setHoverPaint(false);
        setShowButtonPaint(false);
    };

    const handleReadMoreClick = () => {
        setIsDescriptionVisible(true);
    };
    const splitTextIntoLines = (text: string, maxLength: number) => {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        words.forEach((word) => {
            if ((currentLine + ' ' + word).trim().length <= maxLength) {
                currentLine = (currentLine + ' ' + word).trim();
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        });

        if (currentLine.length > 0) {
            lines.push(currentLine);
        }

        return lines;
    };
    const splitDescription = splitTextIntoLines(description, 40);

    return (
        <>
            <mesh position={position}
                  rotation={rotation}
                  ref={ref}
                  onPointerOver={handlePaintHover}
                  onPointerOut={handlePaintLeave}
            >
                <planeGeometry attach="geometry" args={[planeWidth, planeHeight]} />
                <meshStandardMaterial attach="material" map={texture} />
            </mesh>

            {hoverPaint && showButtonPaint && !isDescriptionVisible && (
                <>
                    {/* Fundal semi-transparent */}
                    <mesh
                        position={
                            position[2] < 0
                                ? [position[0] + planeWidth / 2 - 1, // Aproape de marginea dreaptă
                                  position[1] - planeHeight / 2 + 0.5, // Aproape de marginea de jos
                                  position[2] + 0.01]
                                : [position[0] - planeWidth / 2 + 1,
                                    position[1] - planeHeight / 2 + 0.5,
                                    position[2] - 0.01]
                        }
                        rotation={[rotation[0], rotation[1], rotation[2]]}
                    >
                        <planeGeometry attach="geometry" args={[1.5, 0.5]} />
                        <meshStandardMaterial
                            attach="material"
                            color="black"
                            transparent={true}
                            opacity={0.5}
                        />
                    </mesh>

                    {/* Textul "Read more" */}
                    <Text
                        position={
                            position[2] < 0
                                ? [position[0] + planeWidth / 2 - 1,
                                    position[1] - planeHeight / 2 + 0.5,
                                    position[2] + 0.04]
                                : [position[0] - planeWidth / 2 + 1,
                                    position[1] - planeHeight / 2 + 0.5,
                                    position[2] - 0.04]
                        }
                        rotation={[rotation[0], rotation[1], rotation[2]]}
                        onClick={handleReadMoreClick}
                        fontSize={0.3}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Read more
                    </Text>
                </>
            )}

            {!isTitleVisible && (
                <>
                        <Text
                        position={[position[0], position[1] + 2.5, position[2]]}
                        rotation={rotation}
                        fontSize={0.4}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {title}
                    </Text>

                    <Text
                        position={[position[0], position[1] - 2.4, position[2]]}
                        rotation={rotation}
                        fontSize={0.3}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Author: {author}
                    </Text>

                    {isDescriptionVisible && (
                        <mesh
                            position={
                                position[2] < 0
                                    ? [position[0],
                                        position[1],
                                        position[2] + 0.02]
                                    : [position[0],
                                        position[1],
                                        position[2] - 0.02]
                            }
                            rotation={rotation}
                            onClick={() => setIsDescriptionVisible(false)}
                        >
                            <planeGeometry attach="geometry" args={[planeWidth, planeHeight]} />
                            <meshStandardMaterial
                                attach="material"
                                color="black"
                                transparent={true}
                                opacity={0.8}
                            />
                            {(splitDescription.length === 1) ? (

                                <Text
                                    position={[0, splitDescription.length * 0.4, 0.1]}
                                    fontSize={0.2}
                                    color="white"
                                    anchorX="center"
                                    anchorY="middle"
                                    fontWeight="bold"
                                >
                                    Description:
                                </Text>
                            ) : (
                                <Text
                                    position={[0, splitDescription.length * 0.2, 0.1]}
                                    fontSize={0.2}
                                    color="white"
                                    anchorX="center"
                                    anchorY="middle"
                                    fontWeight="bold"
                                >
                                    Description:
                                </Text>
                            )}
                            {splitDescription.map((line, index) => (
                                <Text
                                    key={index}
                                    position={[0, (splitDescription.length / 2 - index) * 0.2, 0.1]} // Corectăm poziția pe Y
                                    fontSize={0.18}
                                    color="white"
                                    anchorX="center"
                                    anchorY="middle"
                                >
                                    {line}
                                </Text>
                            ))}
                        </mesh>
                    )}


                </>


            )}
        </>
    );
};

export default Painting;
