import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./Context/AuthProvider.tsx";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </AuthProvider>
  </React.StrictMode>
);
