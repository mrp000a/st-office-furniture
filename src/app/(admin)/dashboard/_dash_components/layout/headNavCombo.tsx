"use client";
import DashHeader from "./header";
import DashNavButtons from "./navButtons";
import PathOptions from "@/components/layout/PathOptions";

export default function HeadNavCombo({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pb-20">
      <DashHeader />
      <PathOptions forceShow={true} />
      <div className="flex justify-start items-start gap-1 w-full box-border p-1">
        <DashNavButtons />
        <div className="p-2 lg:p-3 border border-gray-secondary bg-background rounded-md overflow-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
