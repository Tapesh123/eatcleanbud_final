import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, Select } from "../../components/Form";
import Moment from "react-moment";
import "./SelectedRecipe.css";


class SelectedRecipe extends Component {
  state = {
    author: "",
    synopsis: "",
    rating: "",
    comments: []
  };
  componentDidMount() {
    this.loadComments();
  }
  loadComments = () => {
    let urlStr = this.props.recipeObj.recipeLink.substr(
      this.props.recipeObj.recipeLink.lastIndexOf("/") + 1
    );
    if (urlStr.length === 0) {
      urlStr = this.props.recipeObj.recipeLink.split("/").reverse()[1];
    }
    console.log(urlStr);
    API.getComments(urlStr)
      .then(res => {
        console.log(res);
        this.setState({
          comments: res.data
        });
      })
      .catch(err => console.log(err));
  };
  mainPage = () => {
    this.props.onChangeDisplay(false);
  };
  handleFormSubmit = event => {
    event.preventDefault();
    this.getComments();
  };
  saveRecipes = recipeInfo => {
    console.log(recipeInfo);
    API.saveRecipes(recipeInfo)
      .then(res => {
        console.log("saved");
      })
      .catch(err => {
        console.log(err);
      });
  };
  saveComment = event => {
    event.preventDefault();
    const comment = {
      commentAuthor: this.state.author,
      commentBody: this.state.synopsis,
      rating: this.state.rating,
      recipeUrl:
        this.props.recipeObj.recipeLink.substr(
          this.props.recipeObj.recipeLink.lastIndexOf("/") + 1
        ).length > 0
          ? this.props.recipeObj.recipeLink.substr(
              this.props.recipeObj.recipeLink.lastIndexOf("/") + 1
            )
          : this.props.recipeObj.recipeLink.split("/").reverse()[1]
    };
    console.log(comment);
    API.saveComments(comment)
      .then(res => {
        console.log("hey it saved");
        console.log(
          this.props.recipeObj.recipeLink.substr(
            this.props.recipeObj.recipeLink.lastIndexOf("/") + 1
          )
        );
        this.loadComments();
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleAuthorChange = event => {
    this.setState({
      author: event.target.value
    });
  };
  handleBodyChange = event => {
    this.setState({
      synopsis: event.target.value
    });
  };
  handleRatingChange = event => {
    this.setState({
      rating: event.target.value
    });
  };

  render() {
    return (
      <div id="back">
        <button
          className="btn btn-danger"
          style={{ float: "right" }}
          onClick={() => this.mainPage()}
        >
          <i className="fa fa-backward" aria-hidden="true" />
        </button>
        <div id="selectedrecipe">
          <div className="col-md-9 col-sm-7">
            <div id="recipe-detail-description">
              <h1 id="recipe-detail-title">
                {this.props.recipeObj.recipeTitle}
              </h1>
              <ul id="ingredient-list">{this.props.recipeObj.ingredient}</ul>
              <strong id="recipe-detail-servings">
                Servings: {this.props.recipeObj.recipeYield}
              </strong>
              <p id="recipe-detail-calories">
                Calories per serving:{" "}
                {Math.round(
                  this.props.recipeObj.calories /
                    this.props.recipeObj.recipeYield
                )}
              </p>
              <div id="nutrition-labels">
                <div id="diet-labels">
                  <p>Diet-Labels: {this.props.recipeObj.dietlabels}</p>
                </div>
                <div id="health-labels">
                  <p>Health-Labels:</p>
                  <li>{this.props.recipeObj.healthlabels}</li>
                </div>
                <div id="IngredientLines">
                  <p>Ingredients:</p>
                  {this.props.recipeObj.recipeIngredients.map(
                    (recipe, index) => <li key={index}> {recipe}</li>
                  )}
                </div>
                <div>
                  <a href={this.props.recipeObj.recipeLink} target="_blank">
                    Source:{this.props.recipeObj.recipeLink}
                  </a>
                </div>
              </div>
              <br />
            </div>
          </div>
          <div className="col-md-4 col-sm-6" id="recipe-detail-image">
            <img
              className="recipeimage"
              src={this.props.recipeObj.recipeImage}
              alt="finished recipe"
            />
            <button type="button" className="btn-btn-primary"
              style={{ float: "right" }}
              onClick={() =>
                this.saveRecipes({
                  recipeTitle: this.props.recipeObj.recipeTitle,
                  recipeLink: this.props.recipeObj.recipeLink,
                  recipeImage: this.props.recipeObj.recipeImage,
                  healthlabels: this.props.recipeObj.healthlabels,
                  dietlabels: this.props.recipeObj.dietlabels,
                  calories: this.props.recipeObj.calories
                })
              }
            >
            save recipe
            </button>
          </div>
        </div>
        <div className="offset-md-1 ">
          <Container>
            <Row>
              <Col size="md-10">
                <h3 id="comment">Add Comments:</h3>
                <Select
                  id="rating"
                  value={this.state.value}
                  onChange={this.handleRatingChange}
                >
                  <option value="">Give Rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  
                </Select>
                <Input
                  name="author"
                  value={this.state.value}
                  onChange={this.handleAuthorChange}
                  placeholder="Author (required)"
                />
                <TextArea
                  name="synopsis"
                  placeholder="Synopsis"
                  value={this.state.value}
                  onChange={this.handleBodyChange}
                />
                <button
                  className="btn-btn-primary"
                  onClick={this.saveComment}
                  style={{ float: "right" }}
                >
                  Save Comment
                </button>
                <br />
              </Col>
            </Row>
          </Container>
          <Container>
            <h3 id="comment">View Comments</h3>

            <Col size="md-10">
              <ul className="list-group list-group-flush">
                {this.state.comments.map((comment, index) => (
                  <li id="commentid" key={index}>
                    <h5>
                      <i className="fal fa-poo" aria-hidden="true" />
                      {""} {comment.commentAuthor}
                      <Moment format="YYYY/MM/DD" style={{ float: "right" }}>
                        {comment.commentDate}
                      </Moment>
                    </h5>
                    <strong>
                      {comment.commentBody}
                      <h6 style={{ float: "right" }}>
                        <i className="fa fa-star fa-1x" aria-hidden="true" />
                        {""} {comment.rating}
                      </h6>
                    </strong>
                  </li>
                ))}
              </ul>
            </Col>
          </Container>
        </div>
      </div>
    );
  }
}
export default SelectedRecipe;
