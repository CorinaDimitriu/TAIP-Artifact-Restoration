import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

interface CameraControllerProps {
    targetPosition: Vector3 | null;
    targetAngle: number | null;
    isDetailView: boolean;
    setCameraPosition: (pos: Vector3) => void;
}

const CameraController: React.FC<CameraControllerProps> = ({ targetPosition, targetAngle, isDetailView, setCameraPosition }) => {
    const { camera } = useThree();

    useFrame(() => {
        if (isDetailView && targetPosition && targetAngle !== null) {
            const distance = 15; // Modify this distance if needed
            const offsetX = distance * Math.sin(targetAngle);
            const offsetZ = distance * Math.cos(targetAngle);
            camera.position.lerp(targetPosition.clone().add(new Vector3(offsetX, 0, offsetZ)), 0.1);
            camera.lookAt(targetPosition);
        }
    });

    return null;
};

export default CameraController;
