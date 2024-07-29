import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabs from "../components/Tabs";
import Header from "../components/Header";
import Loading from "./Loading";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const Alert = ({ message }) => <div className="alert">{message}</div>;

const Home = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setData(res.data.products);
        const allCategories = [
          ...new Set(res.data.products.map((product) => product.category)),
        ];
        setCategories(["all", ...allCategories]);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleFavoriteClick = (productId) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setFavorites(favorites);
      setAlertMessage("Product added to favorites!");
    } else {
      setAlertMessage("Product is already in favorites!");
    }
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const handleCartClick = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.includes(productId)) {
      cart.push(productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      setCart(cart);
      setAlertMessage("Product added to cart!");
    } else {
      setAlertMessage("Product is already in the cart!");
    }
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredData =
    selectedCategory === "all"
      ? data
      : data.filter((product) => product.category === selectedCategory);

  return (
    <div className="app">
      <Header setData={setData} setIsLoading={setIsLoading} />

      <Tabs categories={categories} />

      {alertMessage && <Alert message={alertMessage} />}

      {isLoading ? (
        <Loading />
      ) : data.length > 1 ? (
        <>
          <div className="category-buttons-container">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="List">
            {filteredData.map((product) => (
              <div key={product.id} className="Item">
                <h4>{product.title}</h4>
                <p>{product.description}</p>
                <p className="Price">Price: ${product.price}</p>
                <img src={product.thumbnail} alt={product.title} />
                <div className="ikons">
                  <div className="favorites">
                    <button onClick={() => handleFavoriteClick(product.id)}>
                      <FavoriteTwoToneIcon />
                    </button>
                  </div>
                  <div className="cart">
                    <button onClick={() => handleCartClick(product.id)}>
                      <AddShoppingCartTwoToneIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            textAlign: "center",
          }}
        >
          <SentimentDissatisfiedIcon
            sx={{
              fontSize: "50px",
              marginBottom: "10px",
            }}
          />
          <h1>Sonuç Bulunamadı...</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
