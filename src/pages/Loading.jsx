import React from "react";
import { CircularProgress } from "@mui/material";
import "../Css/Loading.css";
function Loading() {
  return (
    <div className="loading-container">
      <h1>Loading...</h1>
      <CircularProgress />
    </div>
  );
}

export default Loading;
