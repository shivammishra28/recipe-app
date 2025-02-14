import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../redux/recepieSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.recipes.filters);

  const handleDietChange = (e) => {
    dispatch(setFilters({ ...filters, diet: e.target.value }));
  };

  const handleCaloriesChange = (e) => {
    dispatch(setFilters({ ...filters, calories: e.target.value }));
  };

  return (
    <div className="filters">
      <label>
        Diet:
        <select value={filters.diet} onChange={handleDietChange}>
          <option value="All">All</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Paleo">Paleo</option>
        </select>
      </label>

      <label>
        Calories:
        <select value={filters.calories} onChange={handleCaloriesChange}>
          <option value="All">All</option>
          <option value="Low">Low (Below 300)</option>
          <option value="Medium">Medium (300-600)</option>
          <option value="High">High (Above 600)</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;
