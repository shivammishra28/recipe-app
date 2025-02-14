/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "../styles/recepieCard.css";

const RecipeCard = ({ recipe, isFavorite, onFavoriteToggle }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.label} className="recipe-image" />
      <h3>{recipe.label}</h3>
      <p>{recipe.cuisineType?.join(", ")}</p>

      {/* ❤️ Favorite Button */}
      <button className={`favorite-btn ${isFavorite ? "favorited" : ""}`} onClick={onFavoriteToggle}>
        {isFavorite ? "❤️ Remove" : "♡ Add to Favorites"}
      </button>
    </div>
  );
};

export default RecipeCard;
