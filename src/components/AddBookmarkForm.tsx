"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AddBookmarkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !url) {
      alert("Both fields are required.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Not authenticated.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("bookmarks")
      .insert([
        {
          title,
          url,
          user_id: user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    console.log("Inserted row:", data);

    setTitle("");
    setUrl("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="font-sans w-full">
      {/* Card wrapper */}
      <div
        className="rounded-2xl p-6 space-y-4"
        style={{
          background: "var(--card-bg)",
          border: "1px solid rgba(251,113,133,0.2)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        {/* Section label */}
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-1 h-5 rounded-full"
            style={{ background: "var(--rose-red)" }}
          />
          <span
            className="text-sm font-semibold tracking-wide"
            style={{ color: "var(--foreground)" }}
          >
            Add New Bookmark
          </span>
          {loading && (
            <span className="text-xs ml-auto" style={{ color: "var(--muted)" }}>
              Saving...
            </span>
          )}
        </div>

        {/* Name input */}
        <div className="relative">
          <div
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--muted)" }}
          >
            {/* Tag icon */}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A2 2 0 013 10V5a2 2 0 012-2z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Bookmark name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 font-sans"
            style={{
              background: "var(--input-bg)",
              color: "var(--foreground)",
              border: "1px solid rgba(251,113,133,0.2)",
              caretColor: "var(--rose-red)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "1px solid var(--neon-border)";
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(251,113,133,0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border =
                "1px solid rgba(251,113,133,0.2)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* URL input */}
        <div className="relative">
          <div
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--muted)" }}
          >
            {/* Link icon */}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 font-sans"
            style={{
              background: "var(--input-bg)",
              color: "var(--foreground)",
              border: "1px solid rgba(251,113,133,0.2)",
              caretColor: "var(--rose-red)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "1px solid var(--neon-border)";
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(251,113,133,0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border =
                "1px solid rgba(251,113,133,0.2)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Hint text */}
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Press{" "}
          <kbd
            className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{
              background: "rgba(251,113,133,0.1)",
              border: "1px solid rgba(251,113,133,0.2)",
              color: "var(--neon-border)",
            }}
          >
            Enter
          </kbd>{" "}
          to save your bookmark
        </p>
      </div>

      {/* Hidden submit button — Enter key still triggers form submit */}
      <button type="submit" className="hidden" disabled={loading} />
    </form>
  );
}