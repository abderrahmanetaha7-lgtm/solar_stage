import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

export default function AdminRoute({ children }) {
  const {
    admin,
    adminAuthenticated,
    checkingAuth,
  } = useSelector((state) => state.auth);

  if (checkingAuth) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
 
  if (!adminAuthenticated || admin?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}