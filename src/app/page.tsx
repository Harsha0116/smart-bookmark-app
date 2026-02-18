"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="flex min-h-screen items-center justify-center p-6 font-sans"
      style={{ background: "var(--background)" }}
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--rose-red)" }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full blur-2xl opacity-10 pointer-events-none"
        style={{ background: "var(--neon-border)" }}
      />

      {/* Card */}
      <div
        className="relative z-10 flex flex-col items-center gap-6 text-center max-w-md w-full rounded-2xl p-10"
        style={{
          background: "var(--card-bg)",
          border: "1px solid rgba(251,113,133,0.25)",
          boxShadow: "0 0 40px rgba(225,29,72,0.12), 0 0 80px rgba(225,29,72,0.06)",
        }}
      >
        {/* Logo */}
       <div
  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
  style={{ background: "var(--rose-red)" }}
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
    <path fillRule="evenodd" d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm1.5 1.5a.75.75 0 0 0-.75.75V16.5a.75.75 0 0 0 1.085.67L12 15.089l4.165 2.083a.75.75 0 0 0 1.085-.671V5.25a.75.75 0 0 0-.75-.75h-9Z" clipRule="evenodd" />
  </svg>
</div>

        {/* Title */}
        <div className="space-y-2">
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Smart Bookmarks
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Private · Real-time · Google Login Only
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{ background: "rgba(251,113,133,0.15)" }}
        />

        {/* Features */}
        <div className="flex flex-col gap-2 w-full text-left">
          {[
            "🔒  Private to your account only",
            "⚡  Realtime sync across devices",
            "🔖  Save links with one click!",
          ].map((feature) => (
            <div
              key={feature}
              className="text-sm px-4 py-2.5 rounded-xl"
              style={{
                background: "var(--input-bg)",
                color: "var(--muted)",
                border: "1px solid rgba(251,113,133,0.1)",
              }}
            >
              {feature}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/login"
          className="w-full py-3.5 rounded-xl text-sm font-semibold text-white text-center transition-all duration-200"
          style={{
            background: "var(--rose-red)",
            boxShadow: "0 0 20px rgba(225,29,72,0.3)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 30px rgba(225,29,72,0.5)";
            (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 20px rgba(225,29,72,0.3)";
            (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
          }}
        >
          Get Started →
        </Link>
      </div>
    </main>
  );
}