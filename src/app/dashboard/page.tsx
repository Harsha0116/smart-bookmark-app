import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AuthButton from "@/components/AuthButton";
import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: "var(--background)" }}
    >
      {/* ── Navbar ── */}
      <nav
        className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-3"
        style={{
          background: "var(--nav-bg)",
          borderBottom: "1px solid rgba(251,113,133,0.2)",
          boxShadow: "0 2px 20px rgba(225,29,72,0.08)",
        }}
      >
        {/* Left — App name */}
        <div className="flex items-center gap-2.5">
          <div
  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
  style={{ background: "var(--rose-red)" }}
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
    <path fillRule="evenodd" d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm1.5 1.5a.75.75 0 0 0-.75.75V16.5a.75.75 0 0 0 1.085.67L12 15.089l4.165 2.083a.75.75 0 0 0 1.085-.671V5.25a.75.75 0 0 0-.75-.75h-9Z" clipRule="evenodd" />
  </svg>
</div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Bookmarks
          </span>
        </div>

        {/* Right — User avatar + logout via AuthButton */}
        <AuthButton />
      </nav>

      {/* ── Page Content ── */}
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Page heading */}
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            My Bookmarks
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Private · Real-time · Synced across devices
          </p>
        </div>

        {/* Thin rose divider */}
        <div
          className="w-full h-px"
          style={{ background: "rgba(251,113,133,0.15)" }}
        />

        {/* Add bookmark form */}
        <AddBookmarkForm />

        {/* Bookmark grid */}
        <BookmarkList />
      </main>
    </div>
  );
}