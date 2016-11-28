import React, { Component } from 'react';

export default class Text extends Component {
  render() {
    return (
      <div>
        <span>{this.props.label}</span>
        <span>{this.props.text}</span>
      </div>
    );
  }
};
