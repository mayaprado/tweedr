import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

export default class Tweed extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, tweed: "", tweed_id: this.props.tweedDatum.id };

    this.editing = this.editing.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.delete = this.delete.bind(this);
  }

  changeHandler(e) {
    e.preventDefault();
    this.setState({ tweed: e.target.value});
  }

  submitHandler(e) {
    e.preventDefault();
    console.log('in submitHandler')
    const data = {id: this.state.tweed_id, tweed: this.state.tweed, tweed_time: null};
    this.props.editTweed(data);
    this.editing();
  }

  delete(e) {
    e.preventDefault();
    console.log('in delete')
    const data = {id: this.state.tweed_id};
    this.props.deleteTweed(data);
  }

  editing() {
    this.setState(previousState => {
      previousState.editing = !previousState.editing;
      return previousState;
    });
  }

  componentDidMount() {
    axios("http://localhost:3001/api/tweeds").then(response => {
      this.setState({ tweeds: response.data.tweeds });
    });
  }

  render() {
    const tweedDatum = this.props.tweedDatum;
    const index = this.props.index;
    const tweed = tweedDatum.tweed;

    if (this.state.editing) {
      return (
        <li key={this.props.index}>
          <form onSubmit={this.submitHandler}>
            <input onChange={this.changeHandler} type="text" name="tweed" placeholder={tweed} />
            <input type="submit" value='submit' />
          </form>
        </li>
        ) 
      } else {
        return (
          <li key={this.props.index}>
            <span className="tweed">
              {tweed}
            </span><span>   </span>
            <button onClick={this.editing}>Edit</button>
            <button onClick={this.delete}>Delete</button>
          </li>
        )
      }
  }
}
