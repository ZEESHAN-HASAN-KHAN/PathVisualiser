import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-100 dark:bg-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
