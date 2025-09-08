import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.js";
import { fetchPosts, deletePost, selectAllPosts } from "../blogSlice.js";
import { PostTable } from "../components/PostTable.jsx";

export function BlogListPage() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const status = useAppSelector((s) => s.blog.status);

  React.useEffect(() => {
    if (status === "idle") dispatch(fetchPosts());
  }, [status, dispatch]);

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Blog</h1>
        <Link to="/dashboard/blog/new" className="rounded-xl border px-3 py-2">Create Post</Link>
      </header>

      {status === "loading" ? (
        <p>Loading…</p>
      ) : (
        <PostTable posts={posts} onDelete={(id) => dispatch(deletePost(id))} />
      )}
    </section>
  );
}
