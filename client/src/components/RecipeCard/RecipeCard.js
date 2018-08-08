import React from "react";
import "./RecipeCard.css";


const RecipeCard = props => (
  <div className="container">
      <img  className="img-fluid" alt="recipe" src={props.image} key ={props.id}  />
      <h3 id="recipe-detail-title">{props.label}</h3>
   </div>
);

export default RecipeCard;