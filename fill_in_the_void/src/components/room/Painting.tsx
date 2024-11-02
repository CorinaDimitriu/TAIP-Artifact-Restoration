import React, { useRef, useState, useEffect } from 'react';
import { useTexture, Text } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

interface PaintingProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    textureUrl: string;
    title: string;
    onClick: (position: Vector3, angle: number) => void;
}

const Painting: React.FC<PaintingProps> = ({position, rotation = [0, 0, 0], textureUrl, title, onClick}) => {
    const texture = useTexture(textureUrl);
    const ref = useRef<Mesh>(null);
    const [aspectRatio, setAspectRatio] = useState(1);
    const [isTitleVisible, setIsTitleVisible] = useState(true);
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

    return (
        <>
            <mesh position={position} rotation={rotation} ref={ref} onClick={() => onClick(new Vector3(...position), rotation[1])}>
                <planeGeometry attach="geometry" args={[planeWidth, planeHeight]} />
                <meshStandardMaterial attach="material" map={texture} />
            </mesh>
            {!isTitleVisible && (
                <Text
                    position={[position[0], position[1] + 2.5, position[2]]}
                    rotation={rotation}
                    fontSize={0.2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {title}
                </Text>
            )}
        </>
    );
};

export default Painting;
