import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/recepieSlice";
import "../styles/home.css";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.recipes.favorites);

  return (
    <div className="home-container">
      <h1 className="home-title">My Favorite Recipes ❤️</h1>

      {favorites.length === 0 ? (
        <p className="no-results">No favorite recipes yet. Add some!</p>
      ) : (
        <div className="recipe-list">
          {favorites.map((recipe) => (
            <div key={recipe.uri} className="recipe-card">
              <img src={recipe.image} alt={recipe.label} className="recipe-image" />
              <h3>{recipe.label}</h3>
              <p><strong>Calories:</strong> {Math.round(recipe.calories)}</p>
              <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                View Recipe
              </a>
              <button
                className="favorite-btn favorited"
                onClick={() => dispatch(removeFavorite(recipe.uri))}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
