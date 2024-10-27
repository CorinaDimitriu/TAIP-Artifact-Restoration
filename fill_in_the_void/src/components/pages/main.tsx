import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Html, Text } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import * as THREE from 'three';

// Import images
import girlWithAPearlEarring from '../paintings/girl-with-a-pearl-earring.jpg';
import monaLisa from '../paintings/mona-lisa.jpg';
import theBirthOfVenus from '../paintings/the-birth-of-venus.jpg';
import theKiss from '../paintings/the-kiss.jpg';
import theStarryNight from '../paintings/the-starry-night.jpg';
import balDuMoulinDeLaGalette from '../paintings/bal-du-moulin-de-la-galette.jpg';
import selfPortraitWithBandagedEar from '../paintings/self-portrait-with-bandaged-ear.jpg';
import theScream from '../paintings/the-scream.jpg';
import theLasSupper from '../paintings/the-las-supper.jpg';
import museumBackground from '../textures/museum-background.jpg';

const paintingUrls = [
    girlWithAPearlEarring,
    monaLisa,
    theBirthOfVenus,
    theKiss,
    theStarryNight,
    balDuMoulinDeLaGalette,
    selfPortraitWithBandagedEar,
    theScream,
    theLasSupper,
];

const MuseumBackground: React.FC<{ paintingCount: number }> = ({ paintingCount }) => {
    const roomWidth = Math.max(30, paintingCount * 3);
    const roomHeight = 30;
    const roomDepth = Math.max(30, paintingCount * 3);
    const texture = useTexture(museumBackground);

    return (
        <mesh>
            <boxGeometry args={[roomWidth, roomHeight, roomDepth]} />
            <meshStandardMaterial attach="material" map={texture} side={THREE.BackSide} />
        </mesh>
    );
};

interface PaintingProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    textureUrl: string;
    title: string;
    onClick: (position: Vector3, angle: number) => void; // Change onClick to pass the angle
}

const Painting: React.FC<PaintingProps> = ({ position, rotation = [0, 0, 0], textureUrl, title, onClick }) => {
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

    const planeHeight = 3;
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
                    position={[position[0], position[1] + 2, position[2]]}
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

const Loading: React.FC = () => {
    return (
        <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="orange" />
            <Html center>
                <div style={{ color: 'white' }}>Loading...</div>
            </Html>
        </mesh>
    );
};

const CameraController: React.FC<{ paintingCount: number; targetPosition: Vector3 | null; targetAngle: number | null }> = ({ paintingCount, targetPosition, targetAngle }) => {
    const { camera } = useThree();

    useFrame(() => {
        const roomWidth = Math.max(30, paintingCount * 6);
        const roomHeight = 30;
        const roomDepth = Math.max(30, paintingCount * 6);

        const { x, y, z } = camera.position;

        const minX = -roomWidth / 2 + 1;
        const maxX = roomWidth / 2 - 1;
        const minY = 1;
        const maxY = roomHeight - 1;
        const minZ = -roomDepth / 2 + 1;
        const maxZ = roomDepth / 2 - 1;

        camera.position.x = THREE.MathUtils.clamp(x, minX, maxX);
        camera.position.y = THREE.MathUtils.clamp(y, minY, maxY);
        camera.position.z = THREE.MathUtils.clamp(z, minZ, maxZ);

        // Smoothly move camera to target position with an offset
        if (targetPosition && targetAngle !== null) {
            const distance = 13; // Distance from the painting
            const offsetX = distance * Math.sin(targetAngle); // X offset based on angle
            const offsetZ = distance * Math.cos(targetAngle); // Z offset based on angle
            camera.position.lerp(targetPosition.clone().add(new Vector3(offsetX, 0, offsetZ)), 0.1);
            camera.lookAt(targetPosition);
        }
    });

    return null;
};

const CameraRoom: React.FC = () => {
    const height = 2;
    const paintingCount = paintingUrls.length;
    const distanceBetweenPaintings = 2;
    const planeHeight = 3;

    const [targetPosition, setTargetPosition] = useState<Vector3 | null>(null);
    const [targetAngle, setTargetAngle] = useState<number | null>(null); // State to hold the target angle
    const [isDetailView, setIsDetailView] = useState(false); // New state for detail view

    const paintingWidths = paintingUrls.map((url) => {
        const img = new Image();
        img.src = url;
        return planeHeight * (img.width / img.height);
    });

    const totalPaintingWidth = paintingWidths.reduce((sum, width) => sum + width, 0);
    const totalDistance = distanceBetweenPaintings * (paintingCount - 1);
    const paintingRadius = (totalPaintingWidth + totalDistance) / (2 * Math.PI);
    const angleIncrement = (2 * Math.PI) / paintingCount;

    const paintingTitles = [
        'Girl with a Pearl Earring',
        'Mona Lisa',
        'The Birth of Venus',
        'The Kiss',
        'The Starry Night',
        'Bal du Moulin de la Galette',
        'Self-Portrait with Bandaged Ear',
        'The Scream',
        'The Last Supper',
    ];

    useEffect(() => {
        const handleWheel = () => {
            if (isDetailView) {
                setIsDetailView(false);
                setTargetPosition(null);
                setTargetAngle(null);
            }
        };

        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [isDetailView]);

    return (
        <Canvas camera={{ position: [0, 3, 14], fov: 20 }} style={{ height: '100vh' }}>
            <CameraController paintingCount={paintingCount} targetPosition={targetPosition} targetAngle={targetAngle} />
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <MuseumBackground paintingCount={paintingCount} />
            <Suspense fallback={<Loading />}>
                {Array.from({ length: paintingCount }).map((_, index) => {
                    const angle = index * angleIncrement;
                    const x = paintingRadius * Math.sin(angle);
                    const z = paintingRadius * Math.cos(angle);
                    const rotationY = angle + Math.PI;

                    return (
                        <Painting
                            key={index}
                            position={[x, height, z]}
                            rotation={[0, rotationY, 0]}
                            textureUrl={paintingUrls[index]}
                            title={paintingTitles[index]}
                            onClick={(position, angle) => {
                                setTargetPosition(position); // Set target position for painting
                                setTargetAngle(angle); // Set target angle
                                setIsDetailView(true); // Enter detail view
                            }}
                        />
                    );
                })}
            </Suspense>
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                zoomSpeed={4}
                maxPolarAngle={Math.PI * 0.8}
                target={isDetailView ? targetPosition || new Vector3(0, height, 0) : new Vector3(0, height, 0)}
            />
        </Canvas>
    );
};

export default CameraRoom;
