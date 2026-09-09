import { ThemeProvider } from "next-themes";

export default function FullWidthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ThemeProvider>{children}</ThemeProvider>
    </div>
  );
}
