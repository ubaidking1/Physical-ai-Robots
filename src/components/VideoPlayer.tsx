// src/components/VideoPlayer.tsx
import React from "react";

interface VideoPlayerProps {
  src: string;
  width?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, width = "100%", className }) => {
  return (
    <div className={`flex justify-center ${className || ""}`}>
      <video
        width={width}
        controls
        className="rounded-lg shadow-lg"
      >
        <source src={src} type="video/mp4" /> {/* ← Correct MIME type */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
