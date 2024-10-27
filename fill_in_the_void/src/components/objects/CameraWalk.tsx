import React, { useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';

interface ArrowProps {
    position: [number, number, number];  // Poziția săgeții
    rotation: [number, number, number];   // Rotația săgeții
    onClick: () => void;                   // Funcția de click
}

// Componenta Săgeată
const Arrow: React.FC<ArrowProps> = ({ position, rotation, onClick }) => {
    return (
        <mesh position={position} rotation={rotation} onClick={onClick}>
            <coneGeometry args={[0.5, 1, 8]} /> // Săgeata
            <meshStandardMaterial attach="material" color="red" />
        </mesh>
    );
};

interface CameraControllerProps {
    targetPosition: Vector3 | null; // Poziția țintă pentru mișcare
    targetAngle: number | null;      // Unghiul țintă pentru direcție
}

const CameraController: React.FC<CameraControllerProps> = ({ targetPosition, targetAngle }) => {
    const { camera } = useThree();

    useFrame(() => {
        if (targetPosition && targetAngle !== null) {
            const distance = 1; // Distanța de mișcare la fiecare clic
            const offsetX = distance * Math.sin(targetAngle); // Calculăm noua poziție X
            const offsetZ = distance * Math.cos(targetAngle); // Calculăm noua poziție Z

            // Mișcăm camera la noua poziție
            camera.position.lerp(targetPosition.clone().add(new Vector3(offsetX, 0, offsetZ)), 0.1);
            camera.lookAt(targetPosition); // Camera se uită la poziția țintă
        }
    });

    return null;
};

const CameraWalk: React.FC = () => {
    const [targetPosition, setTargetPosition] = useState<Vector3 | null>(null);
    const [targetAngle, setTargetAngle] = useState<number | null>(null);

    return (
        <Canvas camera={{ position: [0, 3, 14], fov: 20 }} style={{ height: '100vh' }}>
            <CameraController targetPosition={targetPosition} targetAngle={targetAngle} />
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[30, 30]} />
                <meshStandardMaterial color="lightgrey" />
            </mesh>
            {/* Săgețile pe podea */}
            <Arrow position={[0, 0, -12]} rotation={[0, Math.PI, 0]} onClick={() => {
                setTargetPosition(new Vector3(0, 0, -12));
                setTargetAngle(Math.PI); // Direcția înapoi
            }} /> {/* Înapoi */}
            <Arrow position={[0, 0, 12]} rotation={[0, 0, 0]} onClick={() => {
                setTargetPosition(new Vector3(0, 0, 12));
                setTargetAngle(0); // Direcția înainte
            }} /> {/* Înafară */}
            <Arrow position={[-12, 0, 0]} rotation={[0, Math.PI / 2, 0]} onClick={() => {
                setTargetPosition(new Vector3(-12, 0, 0));
                setTargetAngle(Math.PI / 2); // Direcția la stânga
            }} /> {/* Stânga */}
            <Arrow position={[12, 0, 0]} rotation={[0, -Math.PI / 2, 0]} onClick={() => {
                setTargetPosition(new Vector3(12, 0, 0));
                setTargetAngle(-Math.PI / 2); // Direcția la dreapta
            }} /> {/* Dreapta */}
            <OrbitControls enablePan={true} enableZoom={true} />
        </Canvas>
    );
};

export default CameraWalk;
