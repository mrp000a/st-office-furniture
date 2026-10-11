import { Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { ContentPageSkeleton } from "@/components/loading/page-skeletons";

export default function FullWidthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ThemeProvider>
        <Suspense fallback={<ContentPageSkeleton />}>{children}</Suspense>
      </ThemeProvider>
    </div>
  );
}
