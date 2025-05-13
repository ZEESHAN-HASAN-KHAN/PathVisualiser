// app/page.tsx
"use client"; // ← convert page to client

import dynamic from "next/dynamic";

const Visualizer = dynamic(() => import("@/components/Visualizer"), {
  ssr: false, // now allowed
});

export default function Home() {
  return (
    <main className="flex flex-col items-center p-4">
      <Visualizer />
    </main>
  );
}
