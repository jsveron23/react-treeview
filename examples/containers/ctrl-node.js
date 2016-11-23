import React, { Component } from 'react';

export default class CtrlNode extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="act">
        <h2 className="act-title">- Collapse/Expand All</h2>
        <div className="act-wrap">
          <button type="text" className="btn" onClick={this.props.onCollapseAllClick}>Collapse All</button>
          <button type="text" className="btn" onClick={this.props.onExpandAllClick}>Expand All</button>
        </div>
      </div>
    );
  }
};
