import React, { Component } from 'react';

export default class ContextMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="act">
        <h2 className="act-title">- onContextMenu Event</h2>
        <div className="act-wrap">
          <span>textContent:</span>
          <span>{this.props.textContent}</span>
        </div>
      </div>
    );
  }
};
