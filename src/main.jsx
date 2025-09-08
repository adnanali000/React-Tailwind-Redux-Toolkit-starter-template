import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app/AppRouter.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { AuthProvider } from "./providers/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
