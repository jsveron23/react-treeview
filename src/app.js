import React, { Component } from 'react';
import { extend as _extend } from 'lodash';

// SASS
import './scss/app.scss';

// Data
import data from './data.json';

// TJ Components
import Tree from './treeview/treeview';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText          : undefined,
      highlightOnSearch   : true,
      collapseBeforeSearch: true
    };

    this.handleClick          = this.handleClick.bind(this);
    this.handleContextMenu    = this.handleContextMenu.bind(this);
    this.handleSearchBtnClick = this.handleSearchBtnClick.bind(this);
  }

  render() {
    return (
      <div>
        <section className="cp">
          <h1 className="cp-title">Tree Component</h1>
          <div className="cp-wrap">
            <Tree
              data={data}
              highlightOnSearch={this.state.highlightOnSearch}
              collapseBeforeSearch={this.state.collapseBeforeSearch}
              searchText={this.state.searchText}
              onClick={this.handleClick}
              onContextMenu={this.handleContextMenu}
            />
          </div>
          <div className="cp-actions">
            <div className="act">
              <h2 className="act-title">- onClick Event</h2>
              <div className="act-wrap">
                <span>textContent:</span>
                <span ref={(el) => this.clickTextEl = el} />
              </div>
            </div>

            <div className="act">
              <h2 className="act-title">- onContextMenu Event</h2>
              <div className="act-wrap">
                <span>textContent:</span>
                <span ref={(el) => this.contextTextEl = el} />
              </div>
            </div>

            <div className="act">
              <h2 className="act-title">- Search nodes</h2>
              <ul className="act-wrap">
                <label>Name:</label>
                <input type="text" onKeyUp={this.handleSearchBtnClick} />
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }

  handleClick(evt) {
    this.clickTextEl.textContent = evt.target.textContent;

    evt.stopPropagation();
  }

  handleContextMenu(evt) {
    evt.preventDefault();

    this.contextTextEl.textContent = evt.target.textContent;
  }

  handleSearchBtnClick(evt) {
    evt.preventDefault();

    const
      inputEl = evt.target.parentElement.querySelector('input'),
      text   = inputEl.value;

    this.setState({
      searchText: text
    });

    evt.stopPropagation();
  }
};
