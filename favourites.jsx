import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext.jsx";
import "./Favourites.css";
import { assets } from "../assets/assets";
import fav_icon_empty from "../assets/favourites_hollow.png";

const Favourites = () => {
  const {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    favouriteItems,
    toggleFavourite,
  } = useContext(StoreContext);

  const favouriteList = food_list.filter((item) => favouriteItems[item.id]);

  return (
    <div className="favourites-container">
      <h2>Your Favourite Items</h2>
      {favouriteList.length === 0 ? (
        <p>No favourites added yet.</p>
      ) : (
        <div className="favourite-items">
          {favouriteList.map((item) => {
            const itemCount = cartItems[item.id] || 0;
            const isFavourite = favouriteItems[item.id];

            return (
              <div className="favourite-card" key={item.id}>
                <div className="food-item-img-container">
                  <img
                    className="food-item-image"
                    src={item.image}
                    alt={item.name}
                  />
                  {!itemCount ? (
                    <img
                      className="add"
                      onClick={() => addToCart(item.id)}
                      src={assets.add_icon_white}
                      alt="Add"
                    />
                  ) : (
                    <div className="food-item-counter">
                      <img
                        onClick={() => removeFromCart(item.id)}
                        src={assets.remove_icon_red}
                        alt="-"
                      />
                      <p>{itemCount}</p>
                      <img
                        onClick={() => addToCart(item.id)}
                        src={assets.add_icon_green}
                        alt="+"
                      />
                    </div>
                  )}
                </div>

                <div className="food-item-info">
                  <div className="food-item-name-rating">
                    <p>{item.name}</p>
                    <img
                      className="fav-icon"
                      src={fav_icon_empty}
                      onClick={() => toggleFavourite(item.id)}
                      style={{
                        filter: isFavourite
                          ? "grayscale(0%)"
                          : "grayscale(100%)",
                        cursor: "pointer",
                        width: "40px",
                      }}
                      alt="Favorite"
                    />
                  </div>
                  <p className="food-item-desc">{item.description}</p>
                  <p className="food-item-price">Rs.{item.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favourites;
