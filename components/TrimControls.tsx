"use client";
import React, { useState } from "react";
import { useFFmpeg } from "@/lib/useFFmpeg";

interface TrimControlsProps {
  videoFile: File;
  onTrimmed: (file: File) => void;
}

export default function TrimControls({ videoFile, onTrimmed }: TrimControlsProps) {
  const { ffmpeg, isReady, fetchFile } = useFFmpeg();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [bitrate, setBitrate] = useState(1000); // kbps
  const [loading, setLoading] = useState(false);

  const handleTrim = async () => {
    if (!isReady || !ffmpeg) return alert("FFmpeg is still loading...");
    if (end <= start) return alert("End time must be greater than start time");

    setLoading(true);
    try {
      await ffmpeg.writeFile("input.mp4", await fetchFile(videoFile));
      await ffmpeg.exec([
        "-i", "input.mp4",
        "-ss", `${start}`,
        "-to", `${end}`,
        "-b:v", `${bitrate}k`,
        "-c:a", "copy",
        "output.mp4",
      ]);

      const data = await ffmpeg.readFile("output.mp4");
      if (typeof data === "string") throw new Error("Expected binary data");

      const buffer = new Uint8Array(data);
      const trimmedFile = new File([buffer], "trimmed.mp4", { type: "video/mp4" });
      onTrimmed(trimmedFile);
    } catch (error) {
      console.error(error);
      alert("Trimming failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-xl mt-6 w-full max-w-md">
      <h3 className="text-2xl font-bold mb-6 text-center text-white">🎬 Trim & Adjust</h3>
      
      <div className="flex flex-col gap-5 mb-6">
        {/* Start Time */}
        <label className="flex flex-col text-white">
          <span className="mb-1 font-medium">Start Time (seconds)</span>
          <input
            type="number"
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            className="p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* End Time */}
        <label className="flex flex-col text-white">
          <span className="mb-1 font-medium">End Time (seconds)</span>
          <input
            type="number"
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
            className="p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Quality Slider (renamed) */}
        <label className="flex flex-col text-white">
          <span className="mb-1 font-medium">Quality ({bitrate} kbps)</span>
          <input
            type="range"
            min="300"
            max="5000"
            step="100"
            value={bitrate}
            onChange={(e) => setBitrate(Number(e.target.value))}
            className="accent-blue-500 cursor-pointer"
          />
        </label>
      </div>

      <button
        onClick={handleTrim}
        disabled={loading}
        className={`w-full py-3 text-lg font-semibold rounded-xl transition-colors 
          ${loading 
            ? "bg-gray-600 cursor-not-allowed" 
            : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"} 
          text-white`}
      >
        {loading ? "⏳ Processing..." : "✂️ Trim Video"}
      </button>
    </div>
  );
}
