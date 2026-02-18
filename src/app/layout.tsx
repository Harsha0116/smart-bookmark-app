import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Bookmark App",
  description: "Private real-time bookmark manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} font-sans`}
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--card-bg)",
              color: "var(--foreground)",
              border: "1px solid rgba(251,113,133,0.25)",
              boxShadow: "0 0 20px rgba(225,29,72,0.15)",
              fontFamily: "inherit",
              fontSize: "0.875rem",
            },
            success: {
              iconTheme: {
                primary: "#e11d48",
                secondary: "#1a1a1a",
              },
            },
            error: {
              iconTheme: {
                primary: "#fb7185",
                secondary: "#1a1a1a",
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}