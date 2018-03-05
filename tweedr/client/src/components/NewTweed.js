import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

export default class NewTweed extends Component {
  constructor(props) {
    super(props);
    this.state = { tweed: "" };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    e.preventDefault();
    this.setState({ tweed: e.target.value});
  }

  submitHandler(e) {
    e.preventDefault();
    console.log('in submitHandler')
    const data = {tweed: this.state.tweed, tweed_time: null};
    console.log("in addTweed, data is ", data);
    this.props.history.push('/tweeds');
    this.props.addTweed(data);
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input onChange={this.changeHandler} type="text" name="tweed" placeholder="what you thinking?" />
        <input type="submit" value='submit' />
      </form>
      )
  }
}


