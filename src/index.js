import React, {
  Component,
  PropTypes
} from 'react';

// To make tree node having unique key
import {
  generateNodeProps
} from './utils';

// Tree component - root
import Tree from './Tree';

// for using defaultProps
const noop = function() {};

/**
 * @class TJTreeView Component
 * @extends {React.Component}
 */
class TJTreeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: generateNodeProps(props.data, {})
    };
  }

  getChildContext() {
    return {
      searchText      : this.props.searchText,
      onChangeCollapse: ::this.toggleCollapse,
      onClick         : ::this.props.onClick,
      onContextMenu   : this.props.onContextMenu,
    };
  }

  componentWillReceiveProps(nextProps, nextContent) {
    const
      command    = nextProps.command,
      searchText = nextProps.searchText;

    this.toggleCollapse({}, command, searchText);
  }

  toggleCollapse(node, command = '', searchText = '') {
    const data = Array.isArray(this.state.data) ? this.state.data : [];

    this.setState({
      data: this.changeCollapse({
        nodes  : data,
        parent : null,
        childId: node.id, //received from child, fixed value
        command: command,
        text   : searchText
      })
    });
  }

  changeCollapse(args) {
    const {
      nodes,
      parent,
      childId,
      command,
      text
    } = args;

    const reText = new RegExp(text, 'i');

    return nodes.map((node) => {
      if (typeof node.collapse !== 'undefined' && command !== 'search') {
        if (command === 'collapseAll') {
          node.collapse = false;
        } else if (command === 'expandAll') {
          node.collapse = true;
        } else {
          // when click a node
          if (node.id === childId) {
            node.collapse = !node.collapse;
          }
        }
      }

      if (command === 'search' && text) {
        if (node.label.search(reText) !== -1) {
          node.collapse = true;

          if (parent) {
            parent.collapse = true;

            /**
             * Keep search parent and collapse = true (important)
             * @param {object} p
             */
            const keepSearchParentUntilRoot = (p) => {
              if (p && p.id) {
                p.collapse = true;

                keepSearchParentUntilRoot(p.parent);
              }
            };

            keepSearchParentUntilRoot(parent);
          }
        }
      }

      if (Array.isArray(node.children)) {
        this.changeCollapse({
          nodes : node.children,
          parent: node,
          childId,
          command,
          text
        });
      }

      return node;
    });
  }

  render() {
    return (
      <div className="tree">
        <Tree
          data={this.state.data} />
      </div>
    );
  }
}

TJTreeView.childContextTypes = {
  searchText      : PropTypes.string,
  onChangeCollapse: PropTypes.func,
  onClick         : PropTypes.func,
  onContextMenu   : PropTypes.func
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
