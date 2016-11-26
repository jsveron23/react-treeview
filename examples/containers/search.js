import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  onChange(evt) {
    const {
      onChange
    } = this.props,
    text = evt.target.value;

    this.setState({
      value: text
    });

    onChange(text);
  }

  render() {
    return (
      <div className="act">
        <h2 className="act-title">- Search nodes (Live search)</h2>
        <ul className="act-wrap">
          <label>Name:</label>
          <input type="text" onChange={::this.onChange} value={this.state.value} />
        </ul>
      </div>
    );
  }
};
