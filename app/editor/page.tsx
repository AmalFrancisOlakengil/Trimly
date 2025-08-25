"use client";
import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import ScreenRecorder from "@/components/ScreenRecorder";
import TrimControls from "@/components/TrimControls";

export default function EditorPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg">
        Video Editor
      </h1>

      {!videoFile ? (
        <div className="flex flex-col md:flex-row gap-8 p-8 rounded-3xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/10">
          <FileUploader onFileSelect={setVideoFile} />
          <ScreenRecorder onRecordingComplete={setVideoFile} />
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col gap-6 p-8 rounded-3xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/10">
          <video
            src={URL.createObjectURL(videoFile)}
            controls
            className="w-full rounded-xl shadow-lg border border-gray-700"
          />

          <div className="flex gap-4 flex-wrap justify-center">
            <TrimControls videoFile={videoFile} onTrimmed={setVideoFile} />
          </div>

          <button
            onClick={() => setVideoFile(null)}
            className="mt-4 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-red-500 to-red-700 rounded-2xl hover:scale-105 transition-transform duration-300"
          >
            🔄 Start Over
          </button>
        </div>
      )}
    </main>
  );
}
