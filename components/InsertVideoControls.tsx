"use client";
import { useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

interface InsertVideoControlsProps {
  videoFile: File;
  onMerged: (file: File) => void;
}

export default function InsertVideoControls({
  videoFile,
  onMerged,
}: InsertVideoControlsProps) {
  const [insertFile, setInsertFile] = useState<File | null>(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleMerge = async () => {
    if (!insertFile) return alert("Please select a second video!");

    setLoading(true);

    // Initialize FFmpeg
    const ffmpeg = new FFmpeg();
    await ffmpeg.load();

    // Write videos into FFmpeg FS
    await ffmpeg.writeFile("video1.mp4", await fetchFile(videoFile));
    await ffmpeg.writeFile("video2.mp4", await fetchFile(insertFile));

    // Extract part1 (0 - start)
    await ffmpeg.exec([
      "-i",
      "video1.mp4",
      "-ss",
      "0",
      "-to",
      start.toString(),
      "-c",
      "copy",
      "part1.mp4",
    ]);

    // Extract part2 (end - endOfVideo)
    await ffmpeg.exec([
      "-i",
      "video1.mp4",
      "-ss",
      end.toString(),
      "-c",
      "copy",
      "part2.mp4",
    ]);

    // Create concat list
    await ffmpeg.writeFile(
      "concat.txt",
      new TextEncoder().encode(`file 'part1.mp4'\nfile 'video2.mp4'\nfile 'part2.mp4'\n`)
    );

    // Concatenate videos
    await ffmpeg.exec([
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      "concat.txt",
      "-c",
      "copy",
      "output.mp4",
    ]);

    // Read final file
    const data = await ffmpeg.readFile("output.mp4");
    if (typeof data === "string") throw new Error("Expected binary data");
    const buffer = new Uint8Array(data);
    const mergedFile = new File([buffer], "output.mp4", { type: "video/mp4" });
    onMerged(mergedFile);
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white/10 rounded-2xl flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-center">Insert Video</h3>

        <input
            type="file"
            accept="video/*"
            onChange={(e) => setInsertFile(e.target.files?.[0] || null)}
            className="file:px-4 file:py-2 file:border-0 file:rounded-lg file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white file:font-semibold hover:file:opacity-90 cursor-pointer text-white"
        />


      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Start (s)"
          value={start}
          onChange={(e) => setStart(Number(e.target.value))}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="number"
          placeholder="End (s)"
          value={end}
          onChange={(e) => setEnd(Number(e.target.value))}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
      </div>

      <button
        onClick={handleMerge}
        disabled={loading}
        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 rounded-xl hover:scale-105 transition-transform"
      >
        {loading ? "Processing..." : "Insert & Merge"}
      </button>
    </div>
  );
}
