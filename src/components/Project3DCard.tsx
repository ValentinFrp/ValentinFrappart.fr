import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import type { Project3DCardProps } from '../types/project';
import { useProjectTexture } from '../hooks/useProjectTexture';
import * as THREE from 'three';
import type { Vector3 } from 'three';

const Project3DCard = ({ title, image, position }: Project3DCardProps) => {
    const mesh = useRef<THREE.Mesh>(null);
    const texture = useProjectTexture(image);

    const [springs, api] = useSpring(() => ({
        scale: [1, 1, 1] as unknown as Vector3,
        rotation: [0, 0, 0] as unknown as Vector3,
        config: { mass: 1, tension: 170, friction: 26 }
    }));

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    const handlePointerOver = () => {
        api.start({
            scale: [1.1, 1.1, 1.1] as unknown as Vector3,
            rotation: [0, 0.2, 0] as unknown as Vector3,
            config: { mass: 1, tension: 280, friction: 20 }
        });
    };

    const handlePointerOut = () => {
        api.start({
            scale: [1, 1, 1] as unknown as Vector3,
            rotation: [0, 0, 0] as unknown as Vector3,
            config: { mass: 1, tension: 280, friction: 20 }
        });
    };

    return (
        <group position={position}>
            <animated.mesh
                ref={mesh}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                scale={springs.scale}
                rotation={springs.rotation}
            >
                <planeGeometry args={[3, 2]} />
                <meshStandardMaterial
                    map={texture}
                    transparent
                    opacity={0.9}
                    roughness={0.3}
                    metalness={0.5}
                />
            </animated.mesh>
            <Text
                position={[0, -1.5, 0]}
                fontSize={0.2}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
                material-toneMapped={false}
            >
                {title}
            </Text>
        </group>
    );
};

export default Project3DCard;