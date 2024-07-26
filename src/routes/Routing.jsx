import { Route, Routes } from "react-router-dom";
import ContentWrapper from "../ContentWrapper";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";

const Routing = () => {
  return (
    <Routes>
      <Route element={<ContentWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
