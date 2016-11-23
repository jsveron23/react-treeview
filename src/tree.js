import React, {
  Component,
  PropTypes
} from 'react';

// TreeNode component
import TreeNode from './TreeNode';

// for using defaultProps
const noop = function() {};

/**
 * @class Tree Component
 * @extends {React.Component}
 */
class Tree extends Component {
  render() {
    const {
      data,
      command,
      searchText,
      onClick,
      onContextMenu
    } = this.props;

    return (
      <ul className="tree-root">
        {data.map((node, i) =>
          <TreeNode key={node.id}
                    node={node}
                    searchText={searchText}
                    command={command}
                    onClick={onClick}
                    onContextMenu={onContextMenu} />
        )}
      </ul>
    );
  }
}

Tree.defaultProps = {
  data         : [],
  command      : '',
  searchText   : '',
  onClick      : noop,
  onContextMenu: noop,
};

Tree.propTypes = {
  data         : PropTypes.array,
  command      : PropTypes.string,
  searchText   : PropTypes.string,
  onClick      : PropTypes.func,
  onContextMenu: PropTypes.func
};

export default Tree;
