"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useBookmarkStore } from "@/store/bookmark-store";
import BookmarkCard from "./BookmarkCard";
import toast from "react-hot-toast";
import type { Database } from "@/lib/types";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

type BookmarkRow =
  Database["public"]["Tables"]["bookmarks"]["Row"];

export default function BookmarkList() {
  const supabase = createClient();

  const {
    bookmarks,
    setBookmarks,
    addBookmark,
    removeBookmark,
    updateBookmark,
    loading,
    setLoading,
  } = useBookmarkStore();

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const initialize = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to fetch bookmarks.");
        setLoading(false);
        return;
      }

      setBookmarks(data ?? []);
      setLoading(false);

      channel = supabase
        .channel("bookmarks-realtime")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
            filter: `user_id=eq.${user.id}`,
          },
          (
            payload: RealtimePostgresChangesPayload<BookmarkRow>
          ) => {
            switch (payload.eventType) {
              case "INSERT":
                addBookmark(payload.new);
                break;

              case "DELETE":
                if (payload.old?.id) {
                  removeBookmark(payload.old.id);
                }
                break;

              case "UPDATE":
                updateBookmark(payload.new);
                break;
            }
          }
        )
        .subscribe();
    };

    initialize();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []); 


  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 animate-pulse rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-lg font-medium">
          No bookmarks yet
        </p>
        <p className="text-sm">
          Add your first bookmark above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
