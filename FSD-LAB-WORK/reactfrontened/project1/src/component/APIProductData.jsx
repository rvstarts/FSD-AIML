import React from "react";

function APIProductData({ product, onAddToCart }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.image}
        className="card-img-top p-3"
        alt={product.title}
        style={{ height: "220px", objectFit: "contain" }}
      />

      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.title}</h6>
        <p className="text-muted small mb-2">{product.category}</p>
        <p className="small text-secondary mb-3">
          {product.description.slice(0, 85)}...
        </p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold text-success">${product.price}</span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default APIProductData;
