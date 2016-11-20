import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

// To make tree node having unique key
import { shortId } from './shortid';

// SASS
import './treeview.scss';

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
      html: []
    };
  }

  /**
   * Running when recieving props after
   * @param  {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    // for searching
    if (nextProps.searchText) {
      const
        element     = this.element,
        searchOpt   = this.props.options.search || {},
        searchQuery = `li[data-name*="${nextProps.searchText}"]`,
        foundNodes  = element.querySelectorAll(searchQuery),
        foundLabel  = element.querySelectorAll('label.is-found'),
        checkedEl   = element.querySelectorAll('input:checked');

      // closing all nodes before reopenning
      if (searchOpt.collapse) {
        this.collapseAll(checkedEl);
      }

      // clearing .is-found css class before attaching again
      if (searchOpt.highlight) {
        foundLabel.forEach((node) => {
          node.classList.remove('is-found');
        });
      }

      // opnning all parent elements of searched nodes
      foundNodes.forEach((node) => {
        if (searchOpt.highlight) {
          node.querySelector('label').classList.add('is-found');
        }

        this.openNode(node);
      });
    }
  }

  componentDidMount() {
    const data = this.generateHTML(this.props.data, true);

    this.element = findDOMNode(this);

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

  collapseAll(checkedEl) {
    checkedEl.forEach((node) => {
      node.checked = false;
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
            uniqueKey = shortId(),
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
