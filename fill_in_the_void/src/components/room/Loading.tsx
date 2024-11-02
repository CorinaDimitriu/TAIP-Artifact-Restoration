import React from 'react';
import { Html } from '@react-three/drei';

const Loading: React.FC = () => {
    return (
        <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="green" />
            <Html center>
                <div style={{ color: 'white' }}>Loading...</div>
            </Html>
        </mesh>
    );
};

export default Loading;
