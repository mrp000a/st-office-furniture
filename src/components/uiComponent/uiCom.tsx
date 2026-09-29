import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const InputErrorMessage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <span className="text-red-primary text-[10px]">{children}</span>;
};

export const MaxHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center bg-violet-primary/30 border-gray-primary/40 w-full rounded-md border py-2 text-2xl font-bold">
      <span>{children}</span>
    </div>
  );
};

export const SimpleBubble = ({
  children,
  visible = true,
}: {
  children: React.ReactNode;
  visible?: boolean;
}) => {
  return (
    <span
      className={`flex-center ring-gray-secondary bg-violet-primary/20 rounded-full px-2 ring-2 ${visible ? "" : "hidden"}`}
    >
      <span>{children}</span>
    </span>
  );
};

export const SpeacialH3Header = ({
  children,
  visible = true,
}: {
  children: React.ReactNode;
  visible?: boolean;
}) => {
  return (
    <span
      className={`border-b-green-primary w-fit border-b-4 pb-2 text-lg font-bold ${visible ? "" : "hidden"}`}
    >
      <span>{children}</span>
    </span>
  );
};

export const SpecialLink = ({
  children,
  visible = true,
  href,
}: {
  children: React.ReactNode;
  visible?: boolean;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className={`hover:text-green-primary flex items-center gap-2 pl-0 transition-all hover:gap-0 hover:pl-2 ${visible ? "" : "hidden"}`}
    >
      <ChevronRight className="text-green-primary" />
      <span>{children}</span>
    </Link>
  );
};

export const NavLinks = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link
      href={href}
      className="hover:bg-background/50 hover:outline-gray-primary/40 rounded-md px-2 py-1 transition-all hover:outline"
    >
      {label}
    </Link>
  );
};

export const SpecialButton = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  return (
    <Link
      href={href}
      className="bg-green-primary text-background ring-gray-primary hover:bg-blue-secondary/80 active:bg-blue-secondary hover:outline-gray-primary/40 rounded-md px-2 py-1 font-semibold ring transition-all hover:ring-1 hover:outline active:translate-y-0.5 active:ring-2"
    >
      {label}
    </Link>
  );
};

export const NoItemsFound = ({
  label = "No Items Found!",
}: {
  label?: string;
}) => {
  return (
    <div className="border-gray-secondary mx-auto my-4 w-full rounded-sm border px-2 py-1 text-center">
      {label}
    </div>
  );
};

export const SpeacialOrderButton = ({
  children,
  // onClick,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      // onClick={}
      className="flex-center hover:bg-green-primary/60 active:bg-foreground bg-green-primary text-background dark:text-foreground w-full cursor-pointer rounded-md border px-4 py-3 text-center font-bold transition-all hover:-translate-y-0.5"
    >
      {children}
    </div>
  );
};
