import React, { Component } from 'react';
// import { extend as _extend } from 'lodash';

// SASS
import './scss/app';

// Data
import data from './data';

// Containers
import Click       from './containers/click';
import ContextMenu from './containers/contextmenu';
import Search      from './containers/search';

// TJ TreeView
import TreeView from 'react-tj-treeview';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData            : data,
      searchText          : undefined,
      highlightOnSearch   : true,
      collapseBeforeSearch: true,

      clickText      : '',
      contextMenuText: ''
    };

    this.handleClick       = this.handleClick.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleLiveSearch  = this.handleLiveSearch.bind(this);
  }

  render() {
    return (
      <div>
        <section className="cp">
          <h1 className="cp-title">Tree Component</h1>
          <div className="cp-wrap">
            <TreeView
              data={this.state.treeData}
              highlightOnSearch={this.state.highlightOnSearch}
              collapseBeforeSearch={this.state.collapseBeforeSearch}
              searchText={this.state.searchText}
              onClick={this.handleClick}
              onContextMenu={this.handleContextMenu}
            />
          </div>

          <div className="cp-actions">
            <Click textContent={this.state.clickText} />
            <ContextMenu textContent={this.state.contextMenuText} />
            <Search onKeyUp={this.handleLiveSearch} />
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
      searchText: text
    });

    evt.stopPropagation();
  }
};
