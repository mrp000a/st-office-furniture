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
    <Badge variant={"outline"} className="min-w-45 relative flex justify-between items-center pl-4 bg-red-primary/10 font-medium">
      <span className="size-2 bg-red-primary animate-ping absolute left-1 rounded-full"></span>
      <span className="size-2 bg-red-primary  absolute left-1 rounded-full"></span>
      <div>{new Date().toDateString()}</div>
      <span>{time}</span>
    </Badge>
  );
}
