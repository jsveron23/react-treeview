import React, {
  Component,
  PropTypes
} from 'react';

// to make tree node having new props will be using
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
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      data: generateNodeProps(props.data)
    };
  }

  /**
   * React context
   * @return {object}
   */
  getChildContext() {
    return {
      searchText      : this.props.searchText,
      onChangeCollapse: ::this.toggleCollapse,
      onClick         : this.props.onClick,
      onContextMenu   : this.props.onContextMenu,
    };
  }

  /**
   * React 'componentWillReceiveProps' event handler
   * @event
   * @param {object} nextProps
   * @param {object} nextContent
   */
  componentWillReceiveProps(nextProps, nextContent) {
    this.toggleCollapse({
      node      : {},
      command   : nextProps.command,
      searchText: nextProps.searchText
    });
  }

  /**
   * Toggle collpase of node handler
   * @param {object} args
   */
  toggleCollapse(args) {
    const {
        node,
        command,
        searchText
      } = args,
      data = this.state.data;

    this.setState({
      data: this.changeCollapse({
        nodes     : data,
        parent    : null,
        childId   : node.id, // received from child, fixed id
        command   : command,
        searchText: searchText,
        reText    : new RegExp(searchText, 'i')
      })
    });
  }

  /**
   * Called from 'toggleCollapse' method
   * @param  {object} args
   * @return {array}
   */
  changeCollapse(args) {
    const {
      nodes,
      parent,
      childId,
      command,
      searchText,
      reText
    } = args;

    // return array from root or node's children
    return nodes.map((node) => {
      if (typeof node.collapse !== 'undefined' && command !== 'search') {
        if (command === 'collapseAll' || command === 'expandAll') {
          node.collapse = (command === 'collapseAll') ? false : true;
        } else {
          // called from child node component
          // when mouse click a node
          if (node.id === childId) {
            node.collapse = !node.collapse;
          }
        }
      }

      // search
      if (command === 'search' && searchText) {
        if (node.label.search(reText) !== -1) {
          node.collapse = true;

          // open parent node
          if (parent) {
            parent.collapse = true;

            /**
             * Keep search parent and collapse = true (important)
             * @param {object} p
             */
            const keepSearchParentUntilRoot = (p) => {
              // p = node
              // each node hase parent node, generated by 'generateNodeProps' method
              if (p && p.id) {
                p.collapse = true;

                keepSearchParentUntilRoot(p.parent);
              }
            };

            keepSearchParentUntilRoot(parent);
          }
        }
      }

      // recursive until end of leaf
      if (Array.isArray(node.children)) {
        this.changeCollapse({
          nodes : node.children,
          parent: node,
          childId,
          command,
          searchText,
          reText
        });
      }

      // return new node
      return node;
    });
  }

  /**
   * React 'render' event handler
   * @event
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="tree">
        <Tree data={this.state.data} />
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
