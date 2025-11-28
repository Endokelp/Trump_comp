"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, Environment } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Scene } from './Scene';
import { CameraController } from './CameraController';
import { useStore } from '@/store/useStore';

export function SimulationCanvas() {
    const { addOptimization } = useStore();

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('optimizationType');
        if (type) {
            addOptimization(type);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div
            className="w-full h-full bg-slate-900"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <Canvas
                shadows
                camera={{ position: [50, 50, 50], fov: 45 }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <Sky sunPosition={[100, 20, 100]} />
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <directionalLight
                        position={[10, 10, 5]}
                        intensity={1}
                        castShadow
                        shadow-mapSize={[1024, 1024]}
                    />

                    <Physics debug>
                        <Scene />
                    </Physics>

                    <CameraController />
                </Suspense>
            </Canvas>
        </div>
    );
}
