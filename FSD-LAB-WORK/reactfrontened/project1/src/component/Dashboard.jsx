import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIProductData from "./APIProductData";

function Dashboard() {
  const navigate = useNavigate();
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail") || "";
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartError, setCartError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("https://fakestoreapi.com/products/");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Unable to load products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchCart() {
      if (!loggedInUserEmail) {
        setCart([]);
        return;
      }

      try {
        setCartError("");
        const res = await fetch(
          `http://localhost:4007/cart?email=${encodeURIComponent(loggedInUserEmail)}`
        );

        if (!res.ok) {
          throw new Error("Unable to fetch cart");
        }

        const data = await res.json();
        setCart(Array.isArray(data.cart) ? data.cart : []);
      } catch (err) {
        setCartError(err.message || "Unable to load cart");
      }
    }

    fetchCart();
  }, [loggedInUserEmail]);

  async function addToCart(product) {
    if (!loggedInUserEmail) {
      setCartError("Please login first to use cart");
      return;
    }

    try {
      setCartError("");
      const res = await fetch("http://localhost:4007/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loggedInUserEmail, product }),
      });

      if (!res.ok) {
        throw new Error("Unable to add item to cart");
      }

      const data = await res.json();
      setCart(Array.isArray(data.cart) ? data.cart : []);
    } catch (err) {
      setCartError(err.message || "Unable to add item");
    }
  }

  async function updateQty(productId, qty) {
    if (!loggedInUserEmail) {
      setCartError("Please login first to use cart");
      return;
    }

    try {
      setCartError("");
      const res = await fetch("http://localhost:4007/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loggedInUserEmail, productId, qty }),
      });

      if (!res.ok) {
        throw new Error("Unable to update cart");
      }

      const data = await res.json();
      setCart(Array.isArray(data.cart) ? data.cart : []);
    } catch (err) {
      setCartError(err.message || "Unable to update cart");
    }
  }

  function incrementQty(productId) {
    const item = cart.find((cartItem) => cartItem.id === productId);
    if (!item) {
      return;
    }
    updateQty(productId, item.qty + 1);
  }

  function decrementQty(productId) {
    const item = cart.find((cartItem) => cartItem.id === productId);
    if (!item) {
      return;
    }
    updateQty(productId, item.qty - 1);
  }

  function handleLogout() {
    localStorage.removeItem("loggedInUserEmail");
    setCart([]);
    setShowCart(false);
    navigate("/login");
  }

  const cartSummary = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    return {
      totalItems,
      totalAmount: totalAmount.toFixed(2),
    };
  }, [cart]);

  return (
    <div className="container-fluid py-4 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Products</h3>
        <div className="d-flex gap-2 align-items-center">
          <span className="badge text-bg-primary fs-6">{products.length} items</span>
          <button className="btn btn-dark" onClick={() => setShowCart(true)}>
            Cart ({cartSummary.totalItems})
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {loading && <p className="text-secondary">Loading products...</p>}
      {error && !loading && <p className="text-danger">{error}</p>}
      {cartError && <p className="text-danger">{cartError}</p>}

      {!loading && !error && (
        <div className="row g-3">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <APIProductData product={product} onAddToCart={addToCart} />
            </div>
          ))}
        </div>
      )}

      {showCart && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
            style={{ opacity: 0.45, zIndex: 1040 }}
            onClick={() => setShowCart(false)}
          />

          <div
            className="position-fixed top-50 start-50 translate-middle bg-white rounded shadow p-3"
            style={{ width: "min(92vw, 520px)", maxHeight: "80vh", overflowY: "auto", zIndex: 1050 }}
          >
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
              <h5 className="mb-0">Cart</h5>
              <button className="btn btn-sm btn-outline-dark" onClick={() => setShowCart(false)}>
                Close
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="mb-0 text-secondary">No items in cart yet.</p>
            ) : (
              <div>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center"
                  >
                    <div className="me-2">
                      <p className="mb-1 fw-semibold small">{item.title.slice(0, 45)}</p>
                      <p className="mb-0 text-success small">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => decrementQty(item.id)}
                      >
                        -
                      </button>
                      <span className="fw-semibold">{item.qty}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => incrementQty(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-content-between fw-semibold border-top pt-2 mt-3">
                  <span>Total</span>
                  <span>${cartSummary.totalAmount}</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
