import { api } from "../../lib/http.js";

export const BlogAPI = {
  list: (params) => api.get("/posts", { params }),
  get: (id) => api.get(`/posts/${id}`),

  // FormData create/update (for file uploads)
  createForm: (formData) => api.post("/posts", formData),
  updateForm: (id, formData) => api.put(`/posts/${id}`, formData),

  remove: (id) => api.del(`/posts/${id}`),
};
