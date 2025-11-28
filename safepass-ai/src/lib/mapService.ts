import { useStore } from '@/store/useStore';

export interface SchoolData {
    id: string;
    name: string;
    location: [number, number]; // [lat, lng]
    buildings: {
        id: string;
        coordinates: [number, number][]; // Polygon
        height: number;
        type: 'school' | 'residential' | 'commercial';
    }[];
    roads: {
        id: string;
        coordinates: [number, number][]; // LineString
        width: number;
        type: 'road' | 'path';
    }[];
}

const FALLBACK_SCHOOLS: SchoolData[] = [
    {
        id: 'cascade-view',
        name: 'Cascade View Elementary',
        location: [47.449, -122.261],
        buildings: [
            {
                id: 'b1',
                coordinates: [[-50, -50], [50, -50], [50, 50], [-50, 50]], // Simple box relative to center
                height: 10,
                type: 'school'
            }
        ],
        roads: [
            {
                id: 'r1',
                coordinates: [[-100, 60], [100, 60]],
                width: 8,
                type: 'road'
            }
        ]
    }
];

export async function fetchSchoolData(query: string): Promise<SchoolData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return fallback for now
    return FALLBACK_SCHOOLS[0];
}
