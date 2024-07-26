import React from "react";
import { Link } from "react-router-dom";
import "../Css/NotFound.css";
import WebAssetOffIcon from "@mui/icons-material/WebAssetOff";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found!</h2>
      <h3>
        <WebAssetOffIcon style={{ fontSize: "larger" }} />
      </h3>
      <p>Sorry, the page you are looking for doesn't exist.</p>
      <Link to="/" className="home-link">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
