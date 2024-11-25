import React from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import museumWall from '../textures/wall.jpg';
import museumFloor from '../textures/roog.jpg';
import door from '../textures/door.jpg';
import ceiling from '../textures/ceiling.jpg';

interface MuseumBackgroundProps {
    wallLength: number;
}

const MuseumBackground: React.FC<MuseumBackgroundProps> = ({ wallLength }) => {
    const wallTexture = useTexture(museumWall);
    const floorTexture = useTexture(museumFloor);
    const ceilingTexture = useTexture(ceiling);
    const doorTexture = useTexture(door);

    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(4, 1);

    const wallOffset = 0.05;
    const doorWidth = 6;
    const doorHeight = 10;
    const ceilingHeight = 6.6;

    return (
        <>
            <mesh position={[-wallLength/2 + 10 + 0.02, -1.7, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[doorWidth, doorHeight]} />
                <meshStandardMaterial map={doorTexture} />
            </mesh>

            <mesh position={[wallLength / 2 - 10 - 0.02, -1.7, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[doorWidth, doorHeight]} />
                <meshStandardMaterial map={doorTexture} />
            </mesh>

            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[wallLength-20, 20 / 1.5, 20]} />
                <meshStandardMaterial map={wallTexture} side={THREE.BackSide} />
            </mesh>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -20 / 3 + wallOffset, 0]}>
                <planeGeometry args={[wallLength-20, 20]} />
                <meshStandardMaterial map={floorTexture} />
            </mesh>

            <mesh position={[0, ceilingHeight, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[wallLength-20, 20]} />
                <meshStandardMaterial map={ceilingTexture} />
            </mesh>
        </>
    );
};

export default MuseumBackground;
