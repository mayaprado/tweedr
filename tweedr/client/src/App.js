import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import AllTweeds from './components/AllTweeds';
import NewTweed from './components/NewTweed';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweeds: [],
      dataLoaded: false
    };
    this.loadTweeds = this.loadTweeds.bind(this);
    this.editTweed = this.editTweed.bind(this);
    this.deleteTweed = this.deleteTweed.bind(this);
    this.addTweed = this.addTweed.bind(this);
  }

  loadTweeds() {
    axios("http://localhost:3001/api/tweeds").then(response => {
      console.log('in componentDidMount AllTweeds.js, response data is ', response.data);
      this.setState({ tweeds: response.data.data.tweeds, dataLoaded: true });
    });
  }

  addTweed(data) {
    console.log("in addTweed, data is ", data);
      axios({
      url: `http://localhost:3001/api/tweeds/`,
      method: "POST",
      data
    }).then(response => {
      console.log('in addTweed then, response.data:', response.data);
      this.setState({dataLoaded: false})
      this.loadTweeds();
    });
  }

  editTweed(data) {
    console.log("in editTweed, data is ", data);
    axios({
      url: `http://localhost:3001/api/tweeds/${data.id}`,
      method: "PUT",
      data
    }).then(response => {
      console.log('in editTweed then, response.data:', response.data);
      this.setState(prevState => {
        return { tweeds: prevState.tweeds.concat(response.data) };
      });
      this.setState({dataLoaded: false})
      this.loadTweeds();
    });
  }

  deleteTweed(data) {
    console.log("in addTweed, data is ", data);
    axios({
      url: `http://localhost:3001/api/tweeds/${data.id}`,
      method: "DELETE",
      data
    }).then(response => {
      console.log('in deleteTweed then, response.data:', response.data);
      this.setState(prevState => {
        return { tweeds: prevState.tweeds.concat(response.data) };
      });
      this.setState({dataLoaded: false})
      this.loadTweeds();
    });
  }
  
  componentDidMount() {
    this.loadTweeds();
  }

  render() {
    if (this.state.dataLoaded) {
      return (
        <BrowserRouter>
          <div className="main-container">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => 
                      <div>
                        <h1>Welcome to Tweedr</h1>
                        <a href='/tweeds'>to tweeds</a>
                      </div>}
                 />
                <Route
                  exact
                  path="/tweeds"
                  render={props => {
                    return <AllTweeds {...props} loadTweeds={this.loadTweeds} editTweed={this.editTweed} deleteTweed={this.deleteTweed} tweeds={this.state.tweeds} />
                  }}

                />
                <Route
                  exact
                  path="/new"
                  render={props => {
                    return <NewTweed {...props} addTweed={this.addTweed} />
                  }}
                />
              </Switch>
          </div>
        </BrowserRouter>
      );
    } return <div>LOADING</div>
  }
}

