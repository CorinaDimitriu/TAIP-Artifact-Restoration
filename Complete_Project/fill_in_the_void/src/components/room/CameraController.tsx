import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Euler } from 'three';

interface CameraControllerProps {
    roomBounds: { minX: number; maxX: number; minZ: number; maxZ: number }; // Adăugăm limitele

}

const CameraController: React.FC<CameraControllerProps> = ({ roomBounds }) => {
    const { camera } = useThree();
    const [movementDirection, setMovementDirection] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
    });

    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isRotating, setIsRotating] = useState(false);
    const movementSpeed = 0.2;
    const rotationSpeed = 0.002;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'w':
                    setMovementDirection((dir) => ({ ...dir, forward: true }));
                    break;
                case 's':
                    setMovementDirection((dir) => ({ ...dir, backward: true }));
                    break;
                case 'a':
                    setMovementDirection((dir) => ({ ...dir, left: true }));
                    break;
                case 'd':
                    setMovementDirection((dir) => ({ ...dir, right: true }));
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'w':
                    setMovementDirection((dir) => ({ ...dir, forward: false }));
                    break;
                case 's':
                    setMovementDirection((dir) => ({ ...dir, backward: false }));
                    break;
                case 'a':
                    setMovementDirection((dir) => ({ ...dir, left: false }));
                    break;
                case 'd':
                    setMovementDirection((dir) => ({ ...dir, right: false }));
                    break;
                default:
                    break;
            }
        };

        const handleMouseDown = () => setIsRotating(true);
        const handleMouseUp = () => setIsRotating(false);

        const handleMouseMove = (event: MouseEvent) => {
            if (!isRotating) return;

            setRotation((rot) => ({
                x: rot.x - event.movementY * rotationSpeed,
                y: rot.y - event.movementX * rotationSpeed,
            }));
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isRotating]);

    useFrame(() => {
        const direction = new Vector3();

        if (movementDirection.forward) direction.z -= movementSpeed;
        if (movementDirection.backward) direction.z += movementSpeed;
        if (movementDirection.left) direction.x -= movementSpeed;
        if (movementDirection.right) direction.x += movementSpeed;

        direction.applyEuler(new Euler(0, rotation.y, 0, 'YXZ'));

        camera.position.add(direction);

        camera.position.x = Math.max(roomBounds.minX, Math.min(camera.position.x, roomBounds.maxX));
        camera.position.z = Math.max(roomBounds.minZ, Math.min(camera.position.z, roomBounds.maxZ));

        // Setăm rotația camerei
        camera.rotation.set(rotation.x, rotation.y, 0, 'YXZ');
    });

    return null;
};


export default CameraController;
