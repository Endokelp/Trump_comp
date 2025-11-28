/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

export function CameraController() {
    const { cameraMode } = useStore();
    // @ts-ignore
    const orbitRef = useRef(null);
    const cameraRef = useRef<ThreePerspectiveCamera>(null);

    // Director mode animation logic would go here
    useFrame((state, delta) => {
        if (cameraMode === 'director' && cameraRef.current) {
            // Simple flyover animation example
            const time = state.clock.getElapsedTime();
            cameraRef.current.position.x = Math.sin(time * 0.1) * 100;
            cameraRef.current.position.z = Math.cos(time * 0.1) * 100;
            cameraRef.current.lookAt(0, 0, 0);
        }
    });

    return (
        <>
            {cameraMode === 'orbit' && (
                <OrbitControls
                    ref={orbitRef}
                    makeDefault
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2.1}
                    maxDistance={200}
                    minDistance={10}
                />
            )}

            {/* We can have a separate camera for director mode or manipulate the default one */}
        </>
    );
}
