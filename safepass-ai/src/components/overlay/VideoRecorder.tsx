"use client";

import React, { useState, useRef } from 'react';
import { Video, StopCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';

export function VideoRecorder() {
    const { setCameraMode, setIsPlaying } = useStore();
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const startRecording = () => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        const stream = canvas.captureStream(30); // 30 FPS
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                setRecordedChunks((prev) => [...prev, event.data]);
            }
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsRecording(true);

        // Start Director Mode Sequence
        setCameraMode('director');
        setIsPlaying(true);

        // Auto-stop after 4 minutes (or 1 minute for demo)
        setTimeout(() => {
            stopRecording();
        }, 60000);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setCameraMode('orbit');
            setIsPlaying(false);
        }
    };

    const downloadVideo = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = 'safepass-ai-submission.webm';
        a.click();
        window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
    };

    return (
        <div className="absolute bottom-4 right-4 z-50 flex gap-2">
            {!isRecording && recordedChunks.length === 0 && (
                <Button onClick={startRecording} className="bg-red-600 hover:bg-red-700 text-white">
                    <Video className="w-4 h-4 mr-2" />
                    Record Submission
                </Button>
            )}

            {isRecording && (
                <Button onClick={stopRecording} variant="destructive" className="animate-pulse">
                    <StopCircle className="w-4 h-4 mr-2" />
                    Stop Recording
                </Button>
            )}

            {recordedChunks.length > 0 && (
                <Button onClick={downloadVideo} variant="secondary">
                    <Download className="w-4 h-4 mr-2" />
                    Download Video
                </Button>
            )}
        </div>
    );
}
