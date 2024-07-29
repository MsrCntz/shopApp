import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({ setData, setIsLoading }) => {
  const navigate = useNavigate();
  const searchPar = useRef();
  const [cartCount, setCartCount] = useState([]);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCartCount(JSON.parse(cartData));
    }
  }, [localStorage.getItem("cart")]);

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
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <h1
            style={{
              cursor: "pointer",
              margin: "0",
              flex: "1",
              fontSize: "50px",
            }}
            onClick={() => navigate("/")}
          >
            MsrShop
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <i
              onClick={() => navigate("/Cart")}
              style={{
                cursor: "pointer",
                fontSize: "30px",
                marginRight: "10px",
              }}
              className="fas fa-shopping-cart add-to-cart-icon"
            ></i>
            {cartCount?.length > 0 && (
              <div className="cartNo">{cartCount.length}</div>
            )}
            <i
              onClick={() => navigate("/Favorite")}
              style={{
                cursor: "pointer",
                fontSize: "30px",
                marginLeft: "10px",
              }}
              className="fas fa-heart heart-icon"
            ></i>
          </div>
        </div>
        <div
          style={{
            marginTop: "10px",
            width: "100%",
            maxWidth: "600px",
            display: "flex",
          }}
        >
          <input
            type="text"
            className="search"
            placeholder="Search products..."
            ref={searchPar}
            style={{
              width: "70%",
              padding: "10px",
              borderRadius: "4px",
              border: "3px solid #ddd",
              marginRight: "10px",
            }}
          />
          <button
            onClick={handleSearch}
            className="button"
            style={{
              width: "30%",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              color: "white",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Search{" "}
            <SearchIcon
              sx={{
                ml: "5px",
              }}
            />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
