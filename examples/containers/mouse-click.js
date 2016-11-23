import React, { Component } from 'react';

export default class MouseClick extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="act">
        <h2 className="act-title">- onClick Event</h2>
        <div className="act-wrap">
          <p>
            <span>onClickText:</span>
            <span>{this.props.clickText}</span>
          </p>

          <p>
            <span>onContextMenuText:</span>
            <span>{this.props.contextMenuText}</span>
          </p>
        </div>
      </div>
    );
  }
};
