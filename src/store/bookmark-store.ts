import { create } from "zustand";

interface Bookmark {
  id: string;
  user_id: string;
  title: string;
  url: string;
  created_at: string;
  updated_at: string;
}

interface BookmarkState {
  bookmarks: Bookmark[];
  loading: boolean;

  setLoading: (value: boolean) => void;
  setBookmarks: (bookmarks: Bookmark[]) => void;

  addBookmark: (bookmark: Bookmark) => void;
  updateBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: [],
  loading: false,

  setLoading: (value) => set({ loading: value }),

  setBookmarks: (bookmarks) => set({ bookmarks }),

  addBookmark: (bookmark) => {
    const exists = get().bookmarks.some((b) => b.id === bookmark.id);
    if (exists) return;

    set((state) => ({
      bookmarks: [bookmark, ...state.bookmarks],
    }));
  },

  updateBookmark: (bookmark) =>
    set((state) => ({
      bookmarks: state.bookmarks.map((b) =>
        b.id === bookmark.id ? bookmark : b
      ),
    })),

  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.id !== id),
    })),
}));
