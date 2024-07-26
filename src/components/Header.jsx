import { BorderColor } from "@mui/icons-material";
import { colors } from "@mui/material";
import { blue } from "@mui/material/colors";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ setData, setIsLoading }) => {
  const navigate = useNavigate();
  const searchPar = useRef();
  const [cartCount, setCartCount] = useState();

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCartCount(JSON.parse(cartData));
    }
  }, [localStorage.getItem("cart")]);

  // console.log(cartCount);

  const handleSearch = () => {
    const searchValue = searchPar.current.value;
    console.log(searchValue);
    setIsLoading(true);
    axios
      .get(`https://dummyjson.com/products/search?q=${searchValue}`)
      .then((res) => {
        setData(res.data.products);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <header className="header">
        <h1
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          MsrShop
        </h1>
        <div className="search-container">
          <input
            type="text"
            className="search"
            placeholder="Search products..."
            ref={searchPar}
          />
          <button onClick={handleSearch} className="button">
            Search
          </button>
        </div>

        <i
          onClick={() => navigate("/Cart")}
          style={{
            cursor: "pointer",
          }}
          className="fas fa-shopping-cart add-to-cart-icon"
        ></i>
        {cartCount?.length > 0 && (
          <div
            style={{
              marginLeft: "4px",
              marginBottom: "25px",
              border: "solid, 1px, gray",
              borderRadius: "50px",
              fontSize: "12px",
              backgroundColor: "red",
              color: "white",
              padding: "4px",
            }}
          >
            {cartCount?.length}
          </div>
        )}

        <i
          onClick={() => navigate("/Favorite")}
          style={{
            cursor: "pointer",
          }}
          className="fas fa-heart heart-icon"
        ></i>
      </header>
    </>
  );
};

export default Header;
