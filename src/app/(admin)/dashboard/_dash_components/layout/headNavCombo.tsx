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
      <div className="box-border flex w-full items-start justify-start gap-1 p-1">
        <DashNavButtons />
        <div className="border-gray-secondary bg-background w-full overflow-auto rounded-md border p-2 lg:p-3">
          {children}
        </div>
      </div>
    </div>
  );
}
