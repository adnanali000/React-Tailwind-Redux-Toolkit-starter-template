import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { BlogAPI } from "./api.js";

const posts = createEntityAdapter({ selectId: (p) => p.id });

export const fetchPosts = createAsyncThunk("blog/fetchPosts", async () => {
  const data = await BlogAPI.list();
  return Array.isArray(data) ? data : data?.items || [];
});

export const fetchPostById = createAsyncThunk("blog/fetchById", async (id) => {
  return await BlogAPI.get(id);
});


export const createPostForm = createAsyncThunk("blog/createForm", async (formData) => {
  return await BlogAPI.createForm(formData);
});


export const updatePostForm = createAsyncThunk("blog/updateForm", async ({ id, formData }) => {
  return await BlogAPI.updateForm(id, formData);
});

export const deletePost = createAsyncThunk("blog/delete", async (id) => {
  await BlogAPI.remove(id);
  return id;
});

const slice = createSlice({
  name: "blog",
  initialState: posts.getInitialState({ status: "idle", error: null }),
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchPosts.pending, (s) => { s.status = "loading"; })
     .addCase(fetchPosts.fulfilled, (s, { payload }) => { s.status = "succeeded"; posts.setAll(s, payload); })
     .addCase(fetchPosts.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; })

     .addCase(fetchPostById.fulfilled, (s, { payload }) => { posts.upsertOne(s, payload); })

     .addCase(createPostForm.fulfilled, (s, { payload }) => { posts.addOne(s, payload); })

     .addCase(updatePostForm.fulfilled, (s, { payload }) => { posts.upsertOne(s, payload); })

     .addCase(deletePost.fulfilled, (s, { payload: id }) => { posts.removeOne(s, id); });
  },
});

export default slice.reducer;
export const { selectAll: selectAllPosts, selectById: selectPostById } =
  posts.getSelectors((state) => state.blog);
