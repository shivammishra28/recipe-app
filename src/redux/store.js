import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import recipeReducer from "./recepieSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["recipes"],
};

const rootReducer = combineReducers({
  recipes: recipeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
