// // app/layout.tsx
// import "./globals.css";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
//         <div className="w-[820px] bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-xl p-6">
//           {children}
//         </div>
//       </body>
//     </html>
//   );
// }
import "./globals.css";
import { Sun, Moon, Github } from "lucide-react";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // (optional) simple cookie‑based dark‑mode toggle
  const theme = (await cookies()).get("theme")?.value ?? "dark";

  return (
    <html lang="en" className={theme}>
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        {/* ---------- top bar ---------- */}
        <header className="flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-2 text-2xl font-bold">
            PathFinder
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/"
              className="hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={20} />
            </a>
            {/* fake theme toggle */}
            <button className="hover:text-blue-400">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* ---------- main flex ---------- */}
        <main className="flex px-6 pb-6 gap-6">
          {/* left area holds the visualiser */}
          <div className="flex-1">{children}</div>

          {/* right area is reserved for the sidebar */}
          {/* children will include the sidebar component */}
        </main>
      </body>
    </html>
  );
}
