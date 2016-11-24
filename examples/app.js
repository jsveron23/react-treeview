import React, { Component } from 'react';
// import { extend as _extend } from 'lodash';

// SASS
import './scss/app';

// Data
import data from './data';

// Containers
import MouseClick  from './containers/MouseClick';
import Search      from './containers/Search';
import CtrlNode    from './containers/CtrlNode';

// TJ TreeView
import TreeView from 'react-tj-treeview';

// To make tree node having unique key
import { shortId } from './utils';

// generate node id
// you should add id even manually for every node
function generateNodeId(nodes) {
  return nodes.map((node) => {
    node.id = shortId();

    if (Array.isArray(node.children)) {
      generateNodeId(node.children);
    }

    return node;
  });
}

// finish attach id
const treeData = generateNodeId(data);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: treeData,

      searchText: undefined,
      command   : '',

      clickText      : '',
      contextMenuText: ''
    };
  }

  render() {
    return (
      <div>
        <section className="cp">
          <h1 className="cp-title">Tree Component</h1>

          <div className="cp-actions">
            <MouseClick
              clickText={this.state.clickText}
              contextMenuText={this.state.contextMenuText}
            />
            <Search onKeyUp={::this.handleLiveSearch} />
            <CtrlNode
              onCollapseAllClick={::this.handleCollpaseAll}
              onExpandAllClick={::this.handleExpandAll} />
          </div>

          <div className="cp-wrap">
            <TreeView
              data={this.state.treeData}
              command={this.state.command}
              searchText={this.state.searchText}
              onClick={::this.handleClick}
              onContextMenu={::this.handleContextMenu}
            />
          </div>
        </section>
      </div>
    );
  }

  /**
   * Return node element when click node
   * @param {object} evt
   */
  handleClick(evt) {
    const node = evt.target;

    this.setState({
      clickText: node.textContent
    });

    evt.stopPropagation();
  }

  /**
   * Return node element when right click node
   * @param {object} evt
   */
  handleContextMenu(evt) {
    evt.preventDefault();

    const node = evt.target;

    this.setState({
      contextMenuText: node.textContent
    });
  }

  /**
   * Live search
   * @param {onject} evt
   */
  handleLiveSearch(evt) {
    evt.preventDefault();

    const
      inputEl = evt.target.parentElement.querySelector('input'),
      text    = inputEl.value;

    this.setState({
      command: 'collapseAll'
    }, () => {
      this.setState({
        command   : 'search',
        searchText: text
      });
    });

    evt.stopPropagation();
  }

  handleCollpaseAll(evt) {
    evt.preventDefault();

    this.setState({
      command   : 'collapseAll',
      searchText: ''
    }, () => {
      this.setState({
        command: ''
      });
    });

    evt.stopPropagation();
  }

  handleExpandAll(evt) {
    evt.preventDefault();

    this.setState({
      command   : 'expandAll',
      searchText: ''
    }, () => {
      this.setState({
        command: ''
      });
    });

    evt.stopPropagation();
  }
};
