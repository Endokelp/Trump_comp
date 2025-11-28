"use client";

import React from 'react';
import { Header } from '@/components/overlay/Header';
import { Sidebar } from '@/components/overlay/Sidebar';
import { Dashboard } from '@/components/overlay/Dashboard';
import { SchoolSearch } from '@/components/overlay/SchoolSearch';
import { VideoRecorder } from '@/components/overlay/VideoRecorder';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background flex flex-col overflow-hidden p-4 gap-4">
            <Header />
            <div className="flex flex-1 overflow-hidden gap-4 rounded-3xl">
                <Sidebar />
                <main className="flex-1 relative overflow-hidden bg-white/50 rounded-3xl shadow-inner border border-white/20">
                    <SchoolSearch />
                    <Dashboard />
                    <VideoRecorder />
                    {children}
                </main>
            </div>
        </div>
    );
}
