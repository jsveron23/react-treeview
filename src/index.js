import React, { Component, PropTypes } from 'react';

// Tree component - root
import Tree from './Tree';

// for using defaultProps
const noop = function() {};

/**
 * @class TJTreeView Component
 * @extends {React.Component}
 */
class TJTreeView extends Component {
  getChildContext() {
    return {
      command      : this.props.command,
      searchText   : this.props.searchText,
      onClick      : this.props.onClick,
      onContextMenu: this.props.onContextMenu,
    };
  }

  render() {
    return (
      <div className="tree">
        <Tree data={this.props.data} />
      </div>
    );
  }
}

TJTreeView.childContextTypes = {
  command      : PropTypes.string,
  searchText   : PropTypes.string,
  onClick      : PropTypes.func,
  onContextMenu: PropTypes.func
};

TJTreeView.defaultProps = {
  data         : [],
  searchText   : '',
  onClick      : noop,
  onContextMenu: noop
};

TJTreeView.propTypes = {
  data         : PropTypes.array,
  searchText   : PropTypes.string,
  onClick      : PropTypes.func,
  onContextMenu: PropTypes.func
};

export default TJTreeView;
