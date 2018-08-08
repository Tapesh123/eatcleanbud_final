import axios from "axios";

// const APIKEY = '3b2e46f3aeb2e244cbfc575413199e1f';

//const queryUrlBase = "https://api.edamam.com/search?q=+'&q='+&app_id=4fd9db8b&app_key=3b2e46f3aeb2e244cbfc575413199e1f" ;
const APP_ID = "4fd9db8b";
const APP_KEY = "3b2e46f3aeb2e244cbfc575413199e1f";
const queryUrlBase = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}+&q=+`;

export default {
  recipeSearch: function(queryTerms) {
    return axios.get(`${queryUrlBase}${queryTerms}`);
  },
  getSavedRecipes: function() {
    return axios.get("/api/saved/");
  },
  deleteRecipes: function(id) {
    return axios.delete("/api/saved/" + id);
  },
  saveRecipes: function(recipeData) {
    return axios.post("/api/saved", recipeData);
  },
  getComments: function(id) {
    return axios.get("/api/saved/comments/" + id);
  },
  // Gets the book with the given id
  
  // Deletes the book with the given id
  deleteComment: function(id) {
    return axios.delete("/api/saved/comments/" + id);
  },
  saveComments: function(commentData) {
    return axios.post("/api/saved/comments", commentData);
  }

};
