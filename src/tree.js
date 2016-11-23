import React, { Component, PropTypes } from 'react';
import { union as _union } from 'lodash';

import TreeNode from './treenode';

// for using defaultProps
const noop = function() {};

/**
 * @class TreeView Component
 * @extends {React.Component}
 */
class TreeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: props.data
    };
  }

  render() {
    return (
      <div className="tree">
        <ul className="tree-root">
          {this.state.treeData.map((node, i) =>
            <TreeNode
              key={node.id}
              node={node}
              searchText={this.props.searchText}
              command={this.props.command}
              onClick={this.props.onClick}
              onContextMenu={this.props.onContextMenu}
            />
          )}
        </ul>
      </div>
    );
  }
}

TreeView.defaultProps = {
  data         : [],
  command      : '',
  searchText   : '',
  onClick      : noop,
  onContextMenu: noop,
};

TreeView.propTypes = {
  data         : PropTypes.array,
  command      : PropTypes.string,
  searchText   : PropTypes.string,
  onClick      : PropTypes.func,
  onContextMenu: PropTypes.func
};

export default TreeView;
