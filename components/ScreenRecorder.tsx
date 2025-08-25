"use client";
import React, { useRef, useState } from "react";

interface ScreenRecorderProps {
  onRecordingComplete: (file: File) => void;
}

export default function ScreenRecorder({
  onRecordingComplete,
}: ScreenRecorderProps) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordedChunks.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        recordedChunks.current = [];
        const file = new File([blob], "recording.webm", { type: "video/webm" });
        onRecordingComplete(file);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Screen recording error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-lg w-80 text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">🎥 Screen Recorder</h2>
      <p className="text-gray-400 mb-6 text-sm">
        {recording
          ? "Recording in progress... Click stop to finish."
          : "Click start to begin recording your screen."}
      </p>

      {!recording ? (
        <button
          onClick={startRecording}
          className="w-full bg-green-500 hover:bg-green-600 active:scale-95 transition-transform duration-150 px-5 py-3 rounded-xl font-semibold text-lg shadow-md"
        >
          Start Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="w-full bg-red-500 hover:bg-red-600 active:scale-95 transition-transform duration-150 px-5 py-3 rounded-xl font-semibold text-lg shadow-md"
        >
          Stop Recording
        </button>
      )}
    </div>
  );
}
