import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full max-w-200 aspect-video mx-auto flex-center">
      <div className="flex-center flex-col gap-3">
        <h2 className="text-4xl font-bold text-center">404</h2>
        <h2 className="text-2xl font-bold text-center">Not Found</h2>
        <p className="text-sm text-gray-secondary">Could not find requested resource</p>
        <Link href="/" className="rounded-md ring hover:bg-red-primary active:bg-red-primary/50 transition-all ring-gray-secondary px-3 p-1 text-center bg-gray-secondary/20 ">Return Home</Link>
      </div>
    </div>
  );
}
