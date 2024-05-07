import React from "react";
import { DUMMY_PRODUCTS } from "../dummy_projects";
import Product from "./Product";
const Shop = ({ onAddItemToCart }) => {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Shop;
