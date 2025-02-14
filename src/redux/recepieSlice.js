import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const APP_ID = import.meta.env.VITE_API_ID;
const APP_KEY = import.meta.env.VITE_API_KEY;


if (!APP_ID || !APP_KEY) {
  console.error("API credentials are missing! Check your .env file.");
}

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (query = "pizza", { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`
      );
      if (response.data.hits.length > 0) {
        return response.data.hits.map((hit) => hit.recipe);
      } else {
        return rejectWithValue("No recipes found!");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "API Error");
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    favorites: [], // ✅ Will be persisted
    filteredRecipes: [],
    searchQuery: "",
    loading: false,
    error: null,
    filters: {
      diet: "All",
      calories: "All",
    },
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.some((fav) => fav.uri === action.payload.uri)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((fav) => fav.uri !== action.payload);
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    
    
      state.filteredRecipes = state.recipes.filter((recipe) => {
        const meetsDiet =
          state.filters.diet === "All" || recipe.dietLabels.includes(state.filters.diet);
    
        const meetsCalories =
          state.filters.calories === "All" ||
          (state.filters.calories === "Low" && recipe.calories < 300) ||
          (state.filters.calories === "Medium" && recipe.calories >= 300 && recipe.calories <= 600) ||
          (state.filters.calories === "High" && recipe.calories > 600);
    
        return meetsDiet && meetsCalories;
      });
    },
    
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredRecipes = state.recipes.filter((recipe) =>
        recipe.label.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      
      
        state.filteredRecipes = action.payload.filter((recipe) => {
          const meetsDiet =
            state.filters.diet === "All" || recipe.dietLabels.includes(state.filters.diet);
      
          const meetsCalories =
            state.filters.calories === "All" ||
            (state.filters.calories === "Low" && recipe.calories < 300) ||
            (state.filters.calories === "Medium" && recipe.calories >= 300 && recipe.calories <= 600) ||
            (state.filters.calories === "High" && recipe.calories > 600);
      
          return meetsDiet && meetsCalories;
        });
      })
      
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.recipes = [];
        state.filteredRecipes = [];
      });
  },
});

export const { addFavorite, removeFavorite, setFilters, setSearchQuery } = recipeSlice.actions;
export default recipeSlice.reducer;
