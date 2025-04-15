import React from "react";
import "./Menu.css";
import { food_list } from "../../assets/assets";

const Menu = ({ addToCart }) => {
  return (
    <div className="menu-container">
      <h2 className="menu-title">Explore Our Delicious Menu</h2>

      <div className="menu-grid">
        {food_list.map((food) => (
          <div key={food.id} className="menu-card">
            <img src={food.image} alt={food.name} className="menu-image" />

            <div className="menu-info">
              <h3 className="menu-name">{food.name}</h3>
              <p className="menu-description">{food.description}</p>

              <div className="menu-footer">
                <span className="menu-price">Rs. {food.price}</span>

                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(food)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
