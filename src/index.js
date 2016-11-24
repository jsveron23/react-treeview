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
  render() {
    return (
      <div className="tree">
        <Tree {...this.props} />
      </div>
    );
  }
}

TJTreeView.defaultProps = {
  data         : [],
  command      : '',
  searchText   : '',
  onClick      : noop,
  onContextMenu: noop,
};

TJTreeView.propTypes = {
  data         : PropTypes.array,
  command      : PropTypes.string,
  searchText   : PropTypes.string,
  onClick      : PropTypes.func,
  onContextMenu: PropTypes.func
};

export default TJTreeView;
