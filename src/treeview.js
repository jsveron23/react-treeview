import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

// SASS
import './treeview.scss';

const noop = function() {};

/**
 * @see {@link https://jsfiddle.net/briguy37/2MVFd/}
 * @return {string}
 */
const generateUUID = () => {
  let d = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};

/**
 * @class TreeView Component
 * @extends {React.Component}
 */
class TreeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      html: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchText) {
      // this.props.onSearchNode(findDOMNode(this));
      console.log(nextProps.searchText);
      const
        dom   = findDOMNode(this),
        nodes = dom.querySelectorAll(`li[data-name*="${nextProps.searchText}"]`);

      // close all nodes before reopenning
      dom.querySelectorAll('input:checked').forEach((node) => {
        node.checked = false;
      });

      // opnning all parent elements of searched nodes
      nodes.forEach((node) => {
        this.openParent(node);
      });
    }
  }

  componentDidMount() {
    const data = this.generateHTML(this.props.data, true);

    this.setState({
      html: data
    });
  }

  render() {
    return (
      <div className="tree">
        {this.state.html}
      </div>
    );
  }

  /**
   * [openParent description]
   * @param  {array} node
   */
  openParent(node) {
    const parent = node.parentElement;

    // console.log(node, parent);
    if (parent.classList.contains('tree')) {
      return false;
    }

    this.openParent(parent);

    node.querySelector('input').checked = true;
  }

  /**
   * Generate HTML elements
   * @param  {array}   data
   * @return {element}
   */
  generateHTML(data, isRoot) {
    return (
      <ul className={isRoot ? 'tree-root' : 'tree-children'}>
        {Array.isArray(data) && data.map((item, i) => {
          let
            label     = item.label,
            // upperedNm = label.toUpperCase(),
            loweredNm = label.toLowerCase(),
            uniqueKey = generateUUID(),
            children  = item.children;

          return (
            <li
              key={uniqueKey}
              data-name={loweredNm}
              data-children-length={children && children.length}
            >
              <input
                type="checkbox"
                id={uniqueKey}
                defaultValue={label}
              />
              <label
                htmlFor={uniqueKey}
                className={children && 'has-children'}
                onClick={this.props.onClick}
                onContextMenu={this.props.onContextMenu}
              >
                {label}
              </label>

              {children && this.generateHTML(children, false)}

            </li>
          );
        })}
      </ul>
    );
  }
}

TreeView.propTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func
};

export default TreeView;
