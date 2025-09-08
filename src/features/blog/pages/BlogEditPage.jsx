import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.js";
import { fetchPostById, selectPostById } from "../blogSlice.js";
import { PostForm } from "../components/PostForm.jsx";

export function BlogEditPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector((s) => selectPostById(s, id));
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id)).finally(() => setLoaded(true));
    }
  }, [id, dispatch]);

  const nav = useNavigate();
  const handleSubmit = (data) => {
    //update api
  console.log("submit==>",data)
  };

  if (!post && !loaded) return <p className="text-gray-500">Loading…</p>;
  if (!post && loaded) return <p className="text-gray-500">Post not found.</p>;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Edit Post</h1>
      <PostForm initial={post} onSubmit={handleSubmit} />
    </section>
  );
}
