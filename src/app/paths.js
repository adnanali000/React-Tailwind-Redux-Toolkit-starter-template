export const PATHS = {
  root: "/",
  login: "/login",
  dashboard: "/dashboard",
  blog: {
    root: "/dashboard/blog",
    new: "/dashboard/blog/new",
    edit: (id = ":id") => `/dashboard/blog/${id}/edit`,
  },
};
