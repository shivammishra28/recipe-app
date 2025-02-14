/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, addFavorite, removeFavorite } from "../redux/recepieSlice"; 
import RecipeCard from "../components/RecepieCard"; 
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const dispatch = useDispatch();
  
  // Extract Redux state
  const { filteredRecipes, favorites, loading, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div className="home-container">
      <h1 className="home-title">Find Your Favorite Recipes 🍽️</h1>

   
       <Link to="/favorites" className="favorites-link">
        ❤️ View Favorites
      </Link>

      <SearchBar />
      <Filters />

      {loading && <p className="loading">Loading recipes...</p>}
      {error && <p className="error">{error}</p>}

      <h2 className="section-title">Recipes</h2>
      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.uri}
              recipe={recipe}
              isFavorite={favorites.some((fav) => fav.uri === recipe.uri)}
              onFavoriteToggle={() =>
                favorites.some((fav) => fav.uri === recipe.uri)
                  ? dispatch(removeFavorite(recipe.uri))
                  : dispatch(addFavorite(recipe))
              }
            />
          ))
        ) : (
          <p className="no-results">No recipes match the search or filters.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
