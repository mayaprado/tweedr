import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Tweed from './Tweed';

export default class AllTweeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweeds: this.props.tweeds,
    };
    this.renderTweeds = this.renderTweeds.bind(this);
  }

  renderTweeds(tweedDatum, index) {
    return <Tweed editTweed={this.props.editTweed} deleteTweed={this.props.deleteTweed} tweedDatum={tweedDatum} index={index} />;
  }

  render() {
    const tweeds = this.state.tweeds.map(this.renderTweeds);
      return (
        <div className="feed">
          <h3>What You Thinking?</h3>
          <a href='/new'>Add a Tweed</a> 
          <div className="AllTweeds">
            <ul>{tweeds}</ul>
          </div>
        </div>
      )
  }
}