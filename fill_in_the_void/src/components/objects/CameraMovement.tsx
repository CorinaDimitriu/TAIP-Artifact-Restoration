// CameraMovement.tsx
import React, { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

// Define the props interface (no need for camera prop)
const CameraMovement: React.FC = () => {
    const { camera } = useThree(); // Get camera from useThree
    const speed = 0.5; // Adjust speed as needed
    const keys = {
        w: false,
        a: false,
        s: false,
        d: false,
        q: false, // Move up
        e: false, // Move down
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key in keys) {
            keys[event.key as keyof typeof keys] = true; // Use type assertion
        }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key in keys) {
            keys[event.key as keyof typeof keys] = false; // Use type assertion
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useFrame(() => {
        const direction = new Vector3();
        camera.getWorldDirection(direction);
        direction.y = 0; // Ignore Y for forward/backward movement
        direction.normalize();

        const right = new Vector3();
        right.crossVectors(direction, new Vector3(0, 1, 0)); // Get right vector

        // Move camera
        if (keys.w) {
            camera.position.add(direction.multiplyScalar(speed));
        }
        if (keys.s) {
            camera.position.add(direction.multiplyScalar(-speed));
        }
        if (keys.a) {
            camera.position.add(right.multiplyScalar(-speed));
        }
        if (keys.d) {
            camera.position.add(right.multiplyScalar(speed));
        }
        if (keys.q) {
            camera.position.y += speed; // Move up
        }
        if (keys.e) {
            camera.position.y -= speed; // Move down
        }

        // Maintain the camera's Y position to prevent it from looking up or down
        camera.position.y = 2; // Set camera height to a fixed value, e.g., 2
        camera.lookAt(new Vector3(0, 0, 0)); // Keep looking at a point
    });

    return null; // This component doesn't need to render anything
};

export default CameraMovement;
