import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="act">
        <h2 className="act-title">- Search nodes (Live search)</h2>
        <ul className="act-wrap">
          <label>Name:</label>
          <input type="text" onKeyUp={this.props.onKeyUp} />
        </ul>
      </div>
    );
  }
};
