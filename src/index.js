import React, { Component, PropTypes } from 'react';
import { findDOMNode }                 from 'react-dom';

// To make tree node having unique key
import { shortId } from './utils';

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
      treedata: []
    };
  }

  /**
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    // for searching
    if (typeof nextProps.searchText !== 'undefined') {
      const text = nextProps.searchText;

      const
        element     = this.element,
        searchQuery = `li[data-name*="${text}" i]`,
        foundNodes  = element.querySelectorAll(searchQuery),
        foundLabel  = element.querySelectorAll('label.is-found'),
        checkedEl   = element.querySelectorAll('input:checked');

      // closing all nodes before reopenning
      if (nextProps.collapseBeforeSearch) { this.collapseAll(checkedEl); }

      // clearing .is-found css class before attaching again
      if (nextProps.highlightOnSearch) { this.removeHighlight(foundLabel); }

      // opnning all parent elements of searched nodes
      foundNodes.forEach((node) => {
        if (nextProps.highlightOnSearch) { this.addHighlight(node); }

        this.openNode(node);
      });
    }
  }

  componentDidMount() {
    this.element = findDOMNode(this);

    this.setState({
      treeData: this.generateJSX(this.props.data, true)
    });
  }

  render() {
    return (
      <div className="tree">
        {this.state.treeData}
      </div>
    );
  }

  // onChange(evt) {
  //   const checkbox = evt.target;

  //   this.setData();
  // }

  collapseAll(el) {
    el.forEach((node) => {
      node.checked = false;
    });
  }

  addHighlight(el) {
    el.querySelector('label').classList.add('is-found');
  }

  removeHighlight(el) {
    el.forEach((node) => {
      node.classList.remove('is-found');
    });
  }

  /**
   * Open all parents nodes after searching specific node
   * @param {array} node
   */
  openNode(node) {
    const input = node.querySelector('input');

    // console.log(node, parent);
    if (node.classList.contains('tree')) {
      return false;
    }

    if (input) {
      input.checked = true;
    }

    // to avoid pointing ul element
    // that's why calling parentElement 2 times for that
    // - node.parentElement => li.ul
    // - node.parentElement.parentElement => li.ul.il
    this.openNode(node.parentElement.parentElement);
  }

  /**
   * Generate JSX
   * @param  {array}   data
   * @return {element}
   */
  generateJSX(data, isRoot) {
    return (
      <ul
        className={isRoot ? 'tree-root' : 'tree-children'}
      >
        {Array.isArray(data) && data.map((node, i) => {
          let
            label     = node.label,
            // upperedNm = label.toUpperCase(),
            loweredNm = label.toLowerCase(),
            uniqueKey = shortId(),
            children  = node.children;

          // console.log(isLeaf);

          return (
            <li
              key={uniqueKey}
              data-name={loweredNm}
            >
              {children && <input
                type="checkbox"
                id={uniqueKey}
                defaultValue={label}
              />}
              <label
                htmlFor={uniqueKey}
                className={children && 'has-children'}
                onClick={this.props.onClick}
                onContextMenu={this.props.onContextMenu}
              >
                {/*`${label}${!isLeaf ? ' (' + children.length + ')' : ''}`*/}
                {label}
              </label>

              {children && this.generateJSX(children, false)}

            </li>
          );
        })}
      </ul>
    );
  }
}

TreeView.defaultProps = {
  data: [],
  options: {},
  onClick: noop,
  onContextMenu: noop,
};

TreeView.propTypes = {
  data: PropTypes.array,
  options: PropTypes.object,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func
};

export default TreeView;
