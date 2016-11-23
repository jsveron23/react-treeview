import React, {
  Component,
  PropTypes
} from 'react';
import classNames from 'classnames';

/**
 * @class TreeNodeComponent
 * @extends {React.Component}
 */
class TreeNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: !!props.node.collapse
    };
  }

  componentWillReceiveProps(nextProps) {
    const command = nextProps.command;

    if (command === 'collapseAll') {
      this.setState({
        isChecked: false
      });
    } else if (command === 'expandAll') {
      this.setState({
        isChecked: true
      });
    } else if (command === 'search') {
      const
        node   = nextProps.node,
        label  = node.label,
        sText  = nextProps.searchText,
        reText = new RegExp(sText, 'i');

      if (sText && label.search(reText) !== -1) {
        this.setState({
          isChecked: true
        }, () => {
          const queryParent = (node) => {
            const input = node.querySelector('input');

            if (input) {
              input.checked = true;
            }

            if (!node.classList.contains('tree')) {
              queryParent(node.parentElement.parentElement);
            }
          };

          queryParent(this.foundNode);
        });
      }
    }
  }

  render() {
    const {
        node,
        searchText,
        onClick,
        onContextMenu
      } = this.props;

    const
      label    = node.label,
      isLeaf   = !!node.leaf,
      nodeId   = node.id,
      children = node.children,
      reText   = new RegExp(searchText, 'i');

    const className = classNames({
      'is-found'    : searchText && label.search(reText) !== -1,
      'has-children': !isLeaf
    });

    return (
      <li ref={(el) => this.foundNode = el}>
        {!isLeaf && <input
          type="checkbox"
          id={nodeId}
          onChange={::this.handleChange}
          checked={this.state.isChecked}
        />}
        <label
          htmlFor={nodeId}
          className={className}
          onContextMenu={onContextMenu}
        >
          {label}
        </label>

        {Array.isArray(children) && <ul className="tree-children">
          {Array.isArray(children) && children.map((child, i) => {
            const childId = child.id;

            return (
              <TreeNode
                key={childId}
                node={child}
                searchText={this.props.searchText}
                command={this.props.command}
                onClick={this.props.onClick}
                onContextMenu={this.props.onContextMenu}
              />
            );
          })}
        </ul>}
      </li>
    );
  }

  handleChange(evt) {
    this.setState({
      isChecked: !this.state.isChecked
    });
  }
}

export default TreeNode;
