"use client";

import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl">
      <ReactPlayer
        src={url}
        width="100%"
        height="100%"
        controls
        muted
      />
    </div>
  );
}