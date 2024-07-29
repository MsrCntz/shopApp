import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const ContentWrapper = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ContentWrapper;
