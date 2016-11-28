import React, { Component } from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button type="text"
              className="btn"
              onClick={this.props.onClick}>
        {this.props.title}
      </button>
    );
  }
};
