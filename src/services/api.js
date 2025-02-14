import axios from "axios";

const API_URL = "https://api.edamam.com/search";

export const fetchRecipesFromAPI = async (query) => {
  const response = await axios.get(`${API_URL}?q=${query}&app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY`);
  return response.data.hits;
};
