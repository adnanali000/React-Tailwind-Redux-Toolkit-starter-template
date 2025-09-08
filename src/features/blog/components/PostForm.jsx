import React, { useState } from "react";

export function PostForm({ initial, onSubmit }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [status, setStatus] = useState(initial?.status ?? "draft");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      slug,
      status,
      excerpt,
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    onSubmit?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Title">
          <input
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Field>
        <Field label="Slug">
          <input
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Status">
          <select
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </Field>
        <Field label="Tags (comma separated)">
          <input
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </Field>
      </div>

      <Field label="Excerpt">
        <textarea
          className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200 min-h-[80px]"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </Field>

      <Field label="Content">
        <textarea
          className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200 min-h-[160px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Field>

      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="rounded-xl bg-black text-white px-4 py-2 font-medium"
        >
          Save
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      <div>{children}</div>
    </label>
  );
}
