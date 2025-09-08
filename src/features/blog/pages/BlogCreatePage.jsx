import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks.js";
import { PostForm } from "../components/PostForm.jsx";

export function BlogCreatePage() {
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (data) => {
    // If you add file inputs later, switch to FormData + dispatch(createPostForm(fd))
    console.log("submit==>",data)
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">New Post</h1>
      <PostForm onSubmit={handleSubmit} />
    </section>
  );
}
