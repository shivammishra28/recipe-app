import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      if (!state.find((recipe) => recipe.uri === action.payload.uri)) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      return state.filter((recipe) => recipe.uri !== action.payload.uri);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
