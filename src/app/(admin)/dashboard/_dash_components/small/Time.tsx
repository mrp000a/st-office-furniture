"use client";

import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Badge
      variant={"outline"}
      className="bg-red-primary/10 relative flex min-w-45 items-center justify-between pl-4 font-medium"
    >
      <span className="bg-red-primary absolute left-1 size-2 animate-ping rounded-full"></span>
      <span className="bg-red-primary absolute left-1 size-2 rounded-full"></span>
      <div>{new Date().toDateString()}</div>
      <span>{time}</span>
    </Badge>
  );
}
