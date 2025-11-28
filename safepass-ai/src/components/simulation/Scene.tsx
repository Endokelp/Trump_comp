import React, { useEffect } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useStore } from '@/store/useStore';
import { fetchSchoolData } from '@/lib/mapService';

export function Scene() {
    const { schoolData, setSchoolData } = useStore();

    useEffect(() => {
        // Load default school on mount
        fetchSchoolData('default').then(setSchoolData);
    }, [setSchoolData]);

    if (!schoolData) return null;

    return (
        <group>
            {/* Ground Plane */}
            <RigidBody type="fixed" colliders="cuboid">
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <planeGeometry args={[500, 500]} />
                    <meshStandardMaterial color="#334155" />
                </mesh>
            </RigidBody>

            {/* Dynamic Buildings */}
            {schoolData.buildings.map((b: any, i: number) => (
                <RigidBody key={b.id} type="fixed" colliders="cuboid">
                    {/* Simplified building rendering - just a box for now based on first coordinate */}
                    <mesh position={[b.coordinates[0][0], b.height / 2, b.coordinates[0][1]]} castShadow receiveShadow>
                        <boxGeometry args={[20, b.height, 20]} />
                        <meshStandardMaterial color={b.type === 'school' ? '#e2e8f0' : '#94a3b8'} />
                    </mesh>
                </RigidBody>
            ))}

            {/* Dynamic Roads */}
            {schoolData.roads.map((r: any) => (
                <mesh key={r.id} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 60]} receiveShadow>
                    <planeGeometry args={[200, r.width]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
            ))}
        </group>
    );
}
