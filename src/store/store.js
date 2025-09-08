import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../features/blog/blogSlice.js";

export const store = configureStore({
  reducer: { blog: blogReducer },
});
