import React, {
  Component,
  PropTypes
} from 'react';
import cx from 'classnames';

/**
 * @class TreeNodeComponent
 * @extends {React.Component}
 */
class TreeNode extends Component {
  render() {
    const {
      node
    } = this.props;

    const {
      searchText,
      onClick,
      onContextMenu
    } = this.context;

    const
      label    = node.label,
      isLeaf   = !!node.leaf,
      nodeId   = node.id,
      children = node.children,
      reText   = new RegExp(searchText, 'i');

    return (
      <li>
        {!isLeaf && <input
          type="checkbox"
          id={nodeId}
          onChange={::this.handleChange}
          checked={node.collapse}
        />}
        <label
          htmlFor={nodeId}
          className={cx({
            'is-found'    : searchText && label.search(reText) !== -1,
            'has-children': !isLeaf
          })}
          onClick={onClick}
          onContextMenu={onContextMenu}
        >
          {label}
        </label>

        {Array.isArray(children) && <ul className="tree-children">
          {Array.isArray(children) && children.map((child) => {
            const childId = child.id;

            return (
              <TreeNode
                key={childId}
                id={childId}
                node={child}
                searchText={searchText}
                onClick={onClick}
                onContextMenu={onContextMenu}
              />
            );
          })}
        </ul>}
      </li>
    );
  }

  handleChange(evt) {
    const { onChangeCollapse } = this.context;

    onChangeCollapse(this.props.node);
  }
}

TreeNode.contextTypes = {
  searchText      : PropTypes.string,
  onChangeCollapse: PropTypes.func,
  onClick         : PropTypes.func,
  onContextMenu   : PropTypes.func
};

export default TreeNode;
