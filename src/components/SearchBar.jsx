/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery, fetchRecipes } from "../redux/recepieSlice";
import "../styles/searchbar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      dispatch(fetchRecipes(query));
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={handleSearch}
      />
      <button type="submit">🔍</button>
    </form>
  );
};

export default SearchBar;
