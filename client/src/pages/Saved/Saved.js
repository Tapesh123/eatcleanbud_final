import React, { Component } from 'react';
import { Col, Row } from '../../components/Grid';
import {List, ListItem} from '../../components/List';
import API from '../../utils/API';

class Saved extends Component {
  state = {
    recipes: []
  };

  componentDidMount() {
    this.loadRecipes();
  }

  loadRecipes = () => {
    API.getSavedRecipes()
      .then(res => {
        console.log(res.data);
        this.setState({
          recipes: res.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteRecipes = id => {
    API.deleteRecipes(id)
      .then(res => this.loadRecipes())
      .catch(err => console.log(err));
  };
 
  render() {
    return (
        <Row>
          <Col id="saved" size="md-6">
            {this.state.recipes.length ? (          
              <List>
                {this.state.recipes.map(recipe=> (
                  <ListItem key={recipe.id}>
                  <div className="card" size="md-6">
                   <h5 className="card-title"><a href={recipe.recipeLink} target="_blank">{recipe.recipeTitle}</a></h5>
                  <img id ="savedimg" className="card-img-top" src={recipe.recipeImage} alt="RECIPE"/>
                  <div className="card-body">  
                    <strong className="card-text">Diet Labels:{recipe.dietlabels}</strong><br/>
                    <strong className="card-text">Calories:{recipe.calories}</strong><br/><br/>
                    <strong className="card-text">Health Type:{recipe.healthlabels}</strong>   <br/>    
                   </div>
                </div>  
                    <br />   
                    <button
                    className="btn btn-warning"
                    onClick={() => this.deleteRecipes(recipe._id)}
                  >
                    Delete Article
                  </button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Saved Recipes to Display</h3>
            )}
          </Col>
        </Row>
    );
  }
}

export default Saved;
