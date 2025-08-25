"use client";
import React, { useState, DragEvent } from "react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export default function FileUploader({ onFileSelect }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      className={`p-6 w-80 rounded-2xl shadow-lg text-center border-2 border-dashed transition-colors duration-200 cursor-pointer 
        ${isDragging ? "border-blue-500 bg-blue-500/10" : "border-gray-600 bg-gray-800 hover:bg-gray-700"}
      `}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center">
        {/* Simple Upload Icon using Tailwind (No external libs) */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 mb-3">
          <div className="w-6 h-6 border-2 border-gray-300 border-b-transparent rounded-full animate-spin"></div>
        </div>

        <h2 className="text-lg font-semibold text-white">Upload a Video</h2>
        <p className="text-sm text-gray-400 mb-4">Drag & drop or click below</p>

        <label className="relative inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-600 transition-colors cursor-pointer">
          Choose File
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
