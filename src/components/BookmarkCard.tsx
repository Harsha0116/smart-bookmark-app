"use client";

import type { Database } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { useBookmarkStore } from "@/store/bookmark-store";
import toast from "react-hot-toast";
import { TrashIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type Bookmark = Database["public"]["Tables"]["bookmarks"]["Row"];

interface Props {
  bookmark: Bookmark;
}

export default function BookmarkCard({ bookmark }: Props) {
  const supabase = createClient();
  const { removeBookmark } = useBookmarkStore();
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", bookmark.id);
    if (error) {
      toast.error("Failed to delete bookmark.");
      setLoading(false);
      return;
    }
    removeBookmark(bookmark.id);
    toast.success("Bookmark deleted.");
  };

  let domain = bookmark.url;
  try {
    domain = new URL(bookmark.url).hostname.replace("www.", "");
  } catch {
    domain = bookmark.url;
  }

  const screenshotSrc = "https://s0.wordpress.com/mshots/v1/" + encodeURIComponent(bookmark.url) + "?w=600&h=400";
  return (
    <div
      className="neon-card rounded-2xl overflow-hidden flex flex-col font-sans group"
      style={{ background: "var(--card-bg)" }}
    >
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full h-40 overflow-hidden"
      >
        {imgError ? (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ background: "rgba(225,29,72,0.06)" }}
          >
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {domain}
            </span>
          </div>
        ) : (
          <img
            src={screenshotSrc}
            alt={bookmark.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
          style={{
            background: "linear-gradient(to top, var(--card-bg), transparent)",
          }}
        />
        <div
          className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg p-1.5"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <ArrowTopRightOnSquareIcon
            className="w-3.5 h-3.5"
            style={{ color: "var(--neon-border)" }}
          />
        </div>
      </a>

      <div className="flex items-start justify-between gap-3 px-4 py-3">
        <div className="flex flex-col gap-1.5 min-w-0">
          <h3
            className="text-sm font-semibold leading-snug truncate"
            style={{ color: "var(--foreground)" }}
          >
            {bookmark.title}
          </h3>
          <span
            className="text-xs truncate"
            style={{ color: "var(--muted)" }}
          >
            {domain}
          </span>
          <span
            className="text-xs"
            style={{ color: "rgba(107,114,128,0.7)" }}
          >
            {new Date(bookmark.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="shrink-0 p-2 rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-40 mt-0.5"
          style={{ color: "var(--muted)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(225,29,72,0.12)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--rose-red)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--muted)";
          }}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}