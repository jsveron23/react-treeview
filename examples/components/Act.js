import React, { Component } from 'react';

export default class Act extends Component {
  render() {
    return (
      <div className="act">
        <h2 className="act-title">{this.props.title}</h2>
        <div className="act-wrap">
          {this.props.children}
        </div>
      </div>
    );
  }
};
