"use client";
import React, { useState, useEffect } from "react";
import { useFFmpeg } from "@/lib/useFFmpeg";
import { Range, getTrackBackground } from "react-range";

interface TrimControlsProps {
  videoFile: File;
  onTrimmed: (file: File) => void;
}

export default function TrimControls({ videoFile, onTrimmed }: TrimControlsProps) {
  const { ffmpeg, isReady, fetchFile } = useFFmpeg();
  const [duration, setDuration] = useState(30);
  const [values, setValues] = useState([0, 5]);
  const [bitrate, setBitrate] = useState(1000);
  const [loading, setLoading] = useState(false);

  const start = values[0];
  const end = values[1];

  useEffect(() => {
    const videoEl = document.createElement("video");
    videoEl.src = URL.createObjectURL(videoFile);
    videoEl.onloadedmetadata = () => {
      setDuration(videoEl.duration);
      setValues([0, Math.min(5, videoEl.duration)]);
    };
  }, [videoFile]);

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
    <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-2xl mt-6 w-full max-w-lg mx-auto">
      {/* Title */}
      <h3 className="text-2xl font-bold mb-6 text-center text-white">
        🎬 Trim & Adjust
      </h3>

      {/* Start/End Labels */}
      <div className="flex justify-between mb-3 text-white font-medium text-sm">
        <span>Start: <span className="text-blue-400">{start.toFixed(2)}s</span></span>
        <span>End: <span className="text-blue-400">{end.toFixed(2)}s</span></span>
      </div>

      {/* Dual-Handle Slider */}
      <div className="mb-8">
        <Range
          values={values}
          step={0.1}
          min={0}
          max={duration}
          onChange={setValues}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 w-full rounded-full cursor-pointer"
              style={{
                background: getTrackBackground({
                  values,
                  colors: ["#3b82f6", "#2563eb", "#3b82f6"],
                  min: 0,
                  max: duration,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="h-5 w-5 bg-white border-2 border-blue-500 rounded-full shadow-md"
            />
          )}
        />
      </div>

      {/* Quality Slider */}
      <div className="mb-8">
        <label className="flex flex-col gap-2 text-white text-sm font-medium">
          Quality: <span className="text-blue-400">{bitrate} kbps</span>
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

      {/* Action Button */}
      <button
        onClick={handleTrim}
        disabled={loading}
        className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-200 
          ${loading 
            ? "bg-gray-600 cursor-not-allowed" 
            : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"} 
          text-white shadow-md`}
      >
        {loading ? "⏳ Processing..." : "✂️ Trim Video"}
      </button>
    </div>
  );
}
