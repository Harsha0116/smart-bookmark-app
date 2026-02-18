"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.push("/dashboard");
      }
    };

    checkSession();
  }, [supabase.auth, router]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center p-6 font-sans"
      style={{ background: "var(--background)" }}
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--rose-red)" }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full blur-2xl opacity-10 pointer-events-none"
        style={{ background: "var(--neon-border)" }}
      />

      {/* Login Card */}
      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-10 flex flex-col items-center gap-8"
        style={{
          background: "var(--card-bg)",
          border: "1px solid rgba(251,113,133,0.25)",
          boxShadow:
            "0 0 40px rgba(225,29,72,0.12), 0 0 80px rgba(225,29,72,0.06)",
        }}
      >
        {/* App Logo / Title */}
        <div className="flex flex-col items-center gap-2">
          <div
  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
  style={{ background: "var(--rose-red)" }}
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
    <path fillRule="evenodd" d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm1.5 1.5a.75.75 0 0 0-.75.75V16.5a.75.75 0 0 0 1.085.67L12 15.089l4.165 2.083a.75.75 0 0 0 1.085-.671V5.25a.75.75 0 0 0-.75-.75h-9Z" clipRule="evenodd" />
  </svg>
</div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Bookmarks
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Your personal link vault
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{ background: "rgba(251,113,133,0.15)" }}
        />

        {/* Google Sign In Button */}
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer"
          style={{
            background: "var(--input-bg)",
            color: "var(--foreground)",
            border: "1px solid rgba(251,113,133,0.3)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "var(--neon-border)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 12px rgba(251,113,133,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(251,113,133,0.3)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          {/* Google SVG Icon */}
          <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
            <path
              d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.332 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              fill="#FFC107"
            />
            <path
              d="M6.306 14.691l6.571 4.819C14.655 15.108 19.001 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              fill="#FF3D00"
            />
            <path
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.316 0-9.828-3.404-11.43-8.125l-6.49 5.004C9.535 39.556 16.227 44 24 44z"
              fill="#4CAF50"
            />
            <path
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l6.19 5.238C42.021 35.636 44 30.138 44 24c0-1.341-.138-2.65-.389-3.917z"
              fill="#1976D2"
            />
          </svg>
          Continue with Google
        </button>

        <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
          By signing in, you agree to our terms & privacy policy.
        </p>
      </div>
    </main>
  );
}