import React, { Component } from 'react';

// to check performance
import Perf from 'react-addons-perf';

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

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data,

      searchText: undefined,
      command   : '',

      clickText      : '',
      contextMenuText: ''
    };
  }

  componentDidMount() {
    window.Perf = Perf;
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
            <Search text="Live Search, reset collapse" onChange={::this.handleLiveSearchReset} />
            <Search text="Live Search, stay collapse" onChange={::this.handleLiveSearchStay} />
            <CtrlNode
              onCollapseAllClick={::this.handleCollpaseAll}
              onExpandAllClick={::this.handleExpandAll} />
          </div>

          <div className="cp-wrap">
            <TreeView
              data={this.state.data}
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
      command  : 'click',
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
      command        : 'contextMenu',
      contextMenuText: node.textContent
    });
  }

  /**
   * Live search
   * @param {onject} evt
   */
  handleLiveSearchReset(text) {
    this.setState({
      command: 'collapseAll'
    }, () => {
      this.setState({
        command   : 'search',
        searchText: text
      });
    });
  }

  /**
   * Live search
   * @param {onject} evt
   */
  handleLiveSearchStay(text) {
    this.setState({
      command   : 'search',
      searchText: text
    });
  }

  handleCollpaseAll(evt) {
    evt.preventDefault();

    this.setState({
      command: 'collapseAll'
    });

    evt.stopPropagation();
  }

  handleExpandAll(evt) {
    evt.preventDefault();

    this.setState({
      command: 'expandAll'
    });

    evt.stopPropagation();
  }
};
