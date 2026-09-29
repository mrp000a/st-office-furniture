"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export default function ThemeTogglerTwo() {
  const { setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme((e) => (e === "dark" ? "light" : "dark"))}
      className="bg-blue-secondary dark:bg-foreground dark:text-background bg-brand-500 text-gray-secondary hover:bg-brand-600 inline-flex size-14 items-center justify-center rounded-full transition-colors"
    >
      <span className="flex-center hidden dark:block">
        <Sun />
      </span>
      <span className="flex-center block dark:hidden">
        <Moon />
      </span>
    </button>
  );
}
