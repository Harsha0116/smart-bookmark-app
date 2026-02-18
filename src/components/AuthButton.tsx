"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";

export default function AuthButton() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser({
          name:
            data.user.user_metadata?.full_name ||
            data.user.email?.split("@")[0] ||
            "User",
          email: data.user.email || "",
          avatar: data.user.user_metadata?.avatar_url || "",
        });
      }
    };
    fetchUser();
  }, [supabase.auth]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Logout failed.");
      console.error(error);
      setLoading(false);
      return;
    }
    toast.success("Logged out successfully.");
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 transition-all duration-200 cursor-pointer"
        style={{
          background: open ? "rgba(251,113,133,0.1)" : "transparent",
          border: "1px solid rgba(251,113,133,0.25)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(251,113,133,0.1)";
        }}
        onMouseLeave={(e) => {
          if (!open)
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
        }}
      >
        {/* Avatar image or fallback initial */}
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
            style={{ border: "2px solid var(--neon-border)" }}
          />
        ) : (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ background: "var(--rose-red)" }}
          >
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
        )}

        {/* Name */}
        <span
          className="text-sm font-medium hidden sm:block max-w-[120px] truncate"
          style={{ color: "var(--foreground)" }}
        >
          {user?.name ?? "User"}
        </span>

        {/* Chevron */}
        <svg
          className="w-3.5 h-3.5 transition-transform duration-200"
          style={{
            color: "var(--muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden z-50"
          style={{
            background: "var(--card-bg)",
            border: "1px solid rgba(251,113,133,0.25)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(225,29,72,0.1)",
          }}
        >
          {/* User info section */}
          <div
            className="px-4 py-3"
            style={{ borderBottom: "1px solid rgba(251,113,133,0.15)" }}
          >
            <p
              className="text-sm font-semibold truncate"
              style={{ color: "var(--foreground)" }}
            >
              {user?.name}
            </p>
            <p className="text-xs truncate mt-0.5" style={{ color: "var(--muted)" }}>
              {user?.email}
            </p>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full flex items-center gap-2.5 px-4 py-3 text-sm transition-all duration-200 cursor-pointer disabled:opacity-50"
            style={{ color: "var(--neon-border)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(251,113,133,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
            }}
          >
            {/* Logout icon */}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
              />
            </svg>
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}