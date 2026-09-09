"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export default function ThemeTogglerTwo() {
  const { setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme((e) => (e === "dark" ? "light" : "dark"))}
      className="inline-flex bg-blue-secondary dark:bg-foreground dark:text-background size-14 items-center justify-center rounded-full bg-brand-500 text-gray-secondary transition-colors hover:bg-brand-600 "
    >
      <span className="flex-center hidden dark:block">
        <Sun />
      </span>
      <span className="flex-center dark:hidden block">
        <Moon />
      </span>
    </button>
  );
}
