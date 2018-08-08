import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row } from "../../components/Grid";
import { Input, FormBtn, Select } from "../../components/Form";
import RecipeCard from "../../components/RecipeCard";
import SelectedRecipe from "../../components/SelectedRecipe";
class Main extends Component {
  state = {
    recipes: [],
    queryTerm: "",
    vote: 0,
    selectValue: "",
    Calories: "",
    displayChild: false,
    recipeDetail: {},
    savedPage: true
  };

  //display the saved recipes
  componentDidMount() {
    this.loadSavedRecipes();
  }

  loadSavedRecipes = () => {
    API.getSavedRecipes()
      .then(res => {
        console.log(res.data);
        this.setState({
          recipes: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getRecipes = () => {
    let query = `${this.state.queryTerm}`;
    // console.log(this.state.selectValue)
    if (this.state.selectValue) {
      query = `${query}&diet=${this.state.selectValue}`;
    }
    if (this.state.Calories) {
      query = `${query}&calories=lte${this.state.Calories}`;
      console.log(query);
    }
    API.recipeSearch(query)
      .then(res => {
        console.log(res.data.hits);
        this.setState({
          recipes: res.data.hits,
          queryTerm: "",
          selectValue: "",
          Calories: "",
          singleRecipe: ""
        });
        console.log(this.state.recipes[0].recipe.label);
      })
      .catch(err => console.log(err));
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleChange = event => {
    this.setState({
      selectValue: event.target.value
    });
    console.log(this.state.selectValue);
  };
  handleCalories = event => {
    this.setState({
      Calories: event.target.value
    });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({ recipes: "" });
    this.setState({ savedPage: false });
    this.getRecipes();
  };

  recipeDetail = recipeInfo => {
    this.setState({ displayChild: true });
    this.setState({ recipeDetail: recipeInfo }, this.otherFunction);
    console.log(this.state.recipeObj);
  };

  // Accessing this.state after calling this method can potentially return the existing value.

  otherFunction = () => {
    //console.log(this.state.recipeDetail);
    console.log(this.state.displayChild);
  };

  changeDisplay = status => {
    this.setState({ displayChild: status }, this.otherFunction);
  };

  render() {
    return (
      <div>
        <Jumbotron>
        </Jumbotron>
        <br />
        <div className="row" >
        <Col size='md-3 sm-3 xs-3'>
        <label
            htmlFor="advanced-search-input"
            className="searchbar-input-labels"
          >
            Name
          </label>
          <Input
            value={this.state.queryTerm}
            onChange={this.handleInputChange}
            name="queryTerm"
            placeholder="Chicken"
          />
        </Col>
        <Col size='md-3 sm-3 xs-3'>
        <label
        htmlFor="diet-label-drop-down"
        className="searchbar-input-labels lbt-setting"
      >
        Type of Diet
      </label>
      <Select
        id="diet-label-drop-down"
        value={this.state.selectValue}
        onChange={this.handleChange}
      >
        <option value="" />
        <option value="high-protein">high protein</option>
        <option value="high-fiber">high fiber</option>
        <option value="low-fat">low fat</option>
        <option value="low-carb">low carb</option>
        <option value="low-sodium">low sodium</option>
      </Select>
        </Col>
        <Col size='md-3 sm-3 xs-3 '>
        <label
        htmlFor="calories-drop-down"
        className="searchbar-input-labels lbt-setting"
      >
        Amount of calories
      </label>
      <Select
        id="calories-drop-down"
        value={this.state.Calories}
        onChange={this.handleCalories}
      >
        <option defaultValue="selected" value=" " />
        <option value="400">400</option>
        <option value="500">500</option>
        <option value="600">600</option>
      </Select>
        </Col>
        <Col size='md-1 sm-1 xs-1'  >    
        <label>  </label>
<FormBtn onClick={this.handleFormSubmit} style={{marginTop:"15%"}}>Search</FormBtn>


</Col>
        </div>      
        <h1 id="labeltext" className="text-center"> {this.state.queryTerm} {this.state.Calories} {this.state.selectValue}</h1>
        {this.state.savedPage ? (
          <Col size="md-12">
            <div className="row text-center">
              {this.state.recipes.length ? (
                <div className="cards">
                  {this.state.recipes.map(recipe => (
                    <div className="md-4" key={recipe._id}>
                      <RecipeCard
                        image={recipe.recipeImage}
                        className="img-fluid"
                        key={recipe.recipeLink}
                      />
                      <a href={recipe.recipeLink} target="_blank" className="recipe-label-setting recipe-link">
                        <strong>{recipe.recipeTitle}</strong>
                      </a>

                    </div>
                  ))}
                </div>
              ) : (
                <span
                  role="img"
                  id="notes"
                >
                  No Results to Display
                </span>
              )}
            </div>
          </Col>
        ) : (
          <Col size="col-md-3 col-sm-1">
            {this.state.displayChild ? (
              <SelectedRecipe
                recipeObj={this.state.recipeDetail}
                onChangeDisplay={this.changeDisplay}
              />
            ) : (
              <Row>
                <div className="row text-center">
                  {this.state.recipes.length ? (
                    <div className="cards">
                      {this.state.recipes.map(recipe => (
                        <div className="col-md-6" key={recipe.recipe.url}>
                          <RecipeCard
                            image={recipe.recipe.image}
                            className="img-fluid"
                            key={recipe.recipe.url}
                          />
                          <div className="recipe-label-setting"
                            onClick={() =>
                              this.recipeDetail({
                                recipeYield: recipe.recipe.yield,
                                recipeTitle: recipe.recipe.label,
                                recipeLink: recipe.recipe.url,
                                recipeImage: recipe.recipe.image,
                                healthlabels: recipe.recipe.healthLabels,
                                dietlabels: recipe.recipe.dietLabels,
                                calories: recipe.recipe.calories,
                                recipeIngredients:
                                  recipe.recipe.ingredientLines,
                                recipeIngredient: recipe.recipe.ingredients
                              })
                            }
                          >
                            {recipe.recipe.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span
                      role="img"
                      id="notes"
        
                    >
                      No Results to Display
                    </span>
                  )}
                </div>
              </Row>
            )}
          </Col>
        )}
      </div>
    );
  }
}
export default Main;
