import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import { generateUUID } from './uuid';

// SASS
import './treeview.scss';

const noop = function() {};

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
    this.element = findDOMNode(this);

    // for searching
    if (nextProps.searchText) {
      const
        element     = this.element,
        searchQuery = `li[data-name*="${nextProps.searchText}"]`,
        foundNodes  = element.querySelectorAll(searchQuery),
        foundLabel  = element.querySelectorAll('label[class="is-found"]'),
        checkedEl   = element.querySelectorAll('input:checked');

      // clearing .is-found before adding again
      foundLabel.forEach((node) => {
        node.classList.remove('is-found');
      });

      // close all nodes before reopenning
      checkedEl.forEach((node) => {
        node.checked = false;
      });

      // opnning all parent elements of searched nodes
      foundNodes.forEach((node) => {
        node.querySelector('label').classList.add('is-found');
        this.openNode(node);
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
   * Open all parents nodes after searching specific node
   * @param {array} node
   */
  openNode(node) {
    const
      input = node.querySelector('input');

    // console.log(node, parent);
    if (node.classList.contains('tree')) {
      return false;
    }

    if (input) {
      input.checked = true;
    }

    // to avoid ul element
    // - node.parentElement.parentElement => li.ul.il
    this.openNode(node.parentElement.parentElement);
  }

  /**
   * Generate HTML elements
   * @param  {array}   data
   * @return {element}
   */
  generateHTML(data, isRoot) {
    return (
      <ul
        className={isRoot ? 'tree-root' : 'tree-children'}
      >
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
