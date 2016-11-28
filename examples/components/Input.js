import React, { Component } from 'react';

export default class Input extends Component {
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
      <input type="text"
             onChange={::this.onChange}
             placeholder={this.props.placeholder} />
    );
  }
};
