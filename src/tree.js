import React, {
  Component,
  PropTypes
} from 'react';

// TreeNode component
import TreeNode from './TreeNode';

/**
 * @class Tree Component
 * @extends {React.Component}
 */
class Tree extends Component {
  render() {
    return (
      <ul className="tree-root">
        {this.props.data.map((node) =>
          <TreeNode key={node.id}
                    node={node} />
        )}
      </ul>
    );
  }
}

Tree.defaultProps = {
  data: [],
};

Tree.propTypes = {
  data: PropTypes.array
};

export default Tree;
