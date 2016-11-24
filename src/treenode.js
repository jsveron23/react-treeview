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
      // this value could be undefined
      isChecked: !!props.node.collapse
    };
  }

  componentWillReceiveProps(nextProps, nextContent) {
    const command = nextContent.command;

    if (command === 'collapseAll' || command === 'expandAll') {
      this.setState({
        isChecked: command === 'collapseAll' ? false : true
      });
    } else if (command === 'search') {
      const
        node   = nextProps.node,
        label  = node.label,
        sText  = nextContent.searchText,
        reText = new RegExp(sText, 'i');

      if (sText && label.search(reText) !== -1) {
        this.setState({
          isChecked: true
        }, () => {
          // openning every found node parents
          const queryParent = (nd) => {
            const input = nd.querySelector('input');

            if (input) {
              input.checked = true;
            }

            if (!nd.classList.contains('tree')) {
              // no ul
              // li.ul.li
              queryParent(nd.parentElement.parentElement);
            }
          };

          queryParent(this.foundNode);
        });
      }
    }
  }

  render() {
    const {
        node
      } = this.props;

    const {
      command,
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
          onClick={onClick}
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
                searchText={searchText}
                command={command}
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
    this.setState({
      isChecked: !this.state.isChecked
    });
  }
}

TreeNode.contextTypes = {
  command      : PropTypes.string,
  searchText   : PropTypes.string,
  onClick      : PropTypes.func,
  onContextMenu: PropTypes.func
};

export default TreeNode;
