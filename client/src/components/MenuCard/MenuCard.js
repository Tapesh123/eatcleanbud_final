import React from "react";
import "./MenuCard.css";
const MenuCard = props => (
  
   <div className="card">
	  <img className="card-img-top" src={props.image} alt="Card image"/>
	  <div className="card-body">
	    <h5 className="card-title">{props.label}</h5>
	    <h5>{props.urlLink}</h5>
	    <p className="card-text">Calories:{props.calories}</p>
	  </div>
	</div>  
);

export default MenuCard;