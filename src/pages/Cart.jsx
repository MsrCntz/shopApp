import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Cart.css";
import axios from "axios";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Header from "../components/Header";
import CreditScoreTwoToneIcon from "@mui/icons-material/CreditScoreTwoTone";
import Loading from "../pages/Loading";

const Cart = () => {
  const [favData, setFavData] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return products
      .filter((product) => favData.includes(product.id))
      .reduce(
        (total, product) =>
          total + product.price * (quantities[product.id] || 1),
        0
      );
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setFavData(cart);
    const initialQuantities = cart.reduce(
      (acc, id) => ({ ...acc, [id]: 1 }),
      {}
    );
    setQuantities(initialQuantities);
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

  console.log(isLoading);

  const handleHomeRedirect = () => {
    navigate("/");
  };

  const handleQuantityChange = (id, delta) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 1) + delta, 1),
    }));
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = favData.filter((productId) => productId !== id);
    setFavData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <Header />
      <div className="cart-container">
        <h3>
          <ChevronRightIcon /> My Cart
        </h3>

        {isLoading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty!</p>
            <button onClick={handleHomeRedirect}>Go to Homepage →</button>
          </div>
        ) : (
          <ul className="product-list">
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <h4>{product.title}</h4>
                <p>${product.price}</p>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="product-image"
                />
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(product.id, -1)}>
                    -
                  </button>
                  <span>{quantities[product.id] || 1}</span>
                  <button onClick={() => handleQuantityChange(product.id, 1)}>
                    +
                  </button>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  Remove{" "}
                  <DeleteForeverIcon
                    sx={{
                      ml: "8px",
                    }}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="total">
          <h2>Cart Total Price: ${getTotalPrice().toFixed(2)}</h2>

          <div className="onay">
            <button
              style={{
                justifyContent: "center",
              }}
            >
              Sepeti Onayla <CreditScoreTwoToneIcon sx={{ ml: "8px" }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
