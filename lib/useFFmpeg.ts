"use client";
import { useEffect, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export function useFFmpeg() {
  const [ffmpeg, setFfmpeg] = useState<FFmpeg | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      const ffmpegInstance = new FFmpeg();
      await ffmpegInstance.load();
      setFfmpeg(ffmpegInstance);
      setIsReady(true);
    };
    load();
  }, []);

  return { ffmpeg, isReady, fetchFile };
}
