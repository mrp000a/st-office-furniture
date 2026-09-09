import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const InputErrorMessage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <span className="text-[10px] text-red-primary">{children}</span>;
};

export const MaxHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex-center text-2xl font-bold bg-violet-primary/30 py-2 rounded-md border border-gray-primary/40">
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
      className={` rounded-full flex-center ring-2 ring-gray-secondary bg-violet-primary/20 px-2 ${visible ? "" : "hidden"}`}
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
      className={`w-fit font-bold  border-b-4 border-b-red-primary pb-2 text-lg ${visible ? "" : "hidden"}`}
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
      className={`hover:text-red-primary flex items-center pl-0 hover:pl-2 gap-2 hover:gap-0 transition-all ${visible ? "" : "hidden"}`}
    >
      <ChevronRight className="text-red-primary" />
      <span>{children}</span>
    </Link>
  );
};

export const NavLinks = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link
      href={href}
      className="px-2 py-1 rounded-md hover:bg-background/50 transition-all hover:outline hover:outline-gray-primary/40"
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
      className="px-2 py-1 active:translate-y-0.5 rounded-md bg-red-primary text-background font-semibold hover:ring-1 active:ring-2 ring-gray-primary ring hover:bg-blue-secondary/80 active:bg-blue-secondary transition-all hover:outline hover:outline-gray-primary/40"
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
    <div className="px-2 py-1 border border-gray-secondary text-center rounded-sm mx-auto my-4">
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
      className="px-4 py-3 flex-center hover:bg-blue-secondary active:bg-foreground hover:-translate-y-0.5 border cursor-pointer transition-all  rounded-md bg-red-primary text-background text-center w-full font-bold"
    >
      {children}
    </div>
  );
};
