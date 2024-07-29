import React, { useEffect, useState } from "react";
import "../Css/Favorites.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Header from "../components/Header";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import Loading from "./Loading";
import Tabs from "../components/Tabs";

const Alert = ({ message }) => <div className="alert">{message}</div>;

const Favorites = () => {
  const [favData, setFavData] = useState([]);
  const [products, setProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleRemoveFavorite = (productId) => {
    const updatedFavData = favData.filter((id) => id !== productId);
    setFavData(updatedFavData);

    localStorage.setItem("favorites", JSON.stringify(updatedFavData));

    setProducts(products.filter((product) => product.id !== productId));
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavData(favorites);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const requests = favData.map((id) =>
          axios.get(`https://dummyjson.com/products/${id}`)
        );
        const responses = await Promise.all(requests);
        const productsData = responses.map((response) => response.data);

        setProducts(productsData);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    if (favData.length > 0) {
      fetchProducts();
    }
  }, [favData]);

  const handleRedirect = () => {
    navigate("/");
  };

  const handleAddToCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.includes(productId)) {
      cart.push(productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      setAlertMessage("Product added to cart!");
    } else {
      setAlertMessage("Product is already in the cart!");
    }
    setTimeout(() => setAlertMessage(""), 2000);
  };

  return (
    <div className="fav-container">
      <Header />
      <Tabs />
      <h3>
        <ChevronRightIcon /> My Favorites
      </h3>

      {alertMessage && <Alert message={alertMessage} />}
      {isLoading ? (
        <Loading />
      ) : products.length === 0 ? (
        <div className="empty-favorites">
          <p>Your favorites list is empty!</p>
          <button onClick={handleRedirect} className="home-button">
            Go to Homepage →
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="fav-kaldır">
                <button onClick={() => handleRemoveFavorite(product.id)}>
                  <CloseTwoToneIcon />
                </button>
              </div>

              <h4 className="product-name">{product.title}</h4>
              <p className="product-price">${product.price}</p>
              <img
                src={product?.images[0]}
                alt=""
                style={{
                  width: "200px",
                  height: "200px",
                }}
              />
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product.id)}
              >
                <AddShoppingCartIcon />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
