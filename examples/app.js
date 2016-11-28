import React, { Component } from 'react';

// to check performance
import Perf from 'react-addons-perf';

// SASS
import './scss/app.scss';

// Data
import data from './data.json';

// Containers
import Act    from './components/Act';
import Text   from './components/Text';
import Input  from './components/Input';
import Button from './components/Button';

// TJ TreeView
import TreeView from 'react-tj-treeview';

/**
 * @class App
 */
export default class App extends Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      data: data,

      searchText: '',
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
            <Act title="Mouse Events">
              <Text label="onClick:"
                    text={this.state.clickText} />
              <Text label="onContextMenu:"
                    text={this.state.contextMenuText} />
            </Act>

            <Act title="Live Search">
              <div className="flex flex-row">
                <p>
                  <label>R:</label>
                  <Input onChange={::this.handleLiveSearchReset}
                         placeholder="reset collapse" />
                </p>
                <p>
                  <label>S:</label>
                  <Input onChange={::this.handleLiveSearchStay}
                         placeholder="stay collapse" />
                </p>
              </div>
            </Act>

            <Act title="Buttons">
              <Button title="Collapse All"
                      onClick={::this.handleCollpaseAll} />
              <Button title="Expand All"
                      onClick={::this.handleExpandAll} />
            </Act>
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
   * @param {object} node
   */
  handleClick(node) {
    const label = node.label;

    this.setState({
      command  : 'click',
      clickText: label
    });
  }

  /**
   * Return node element when right click node
   * @param {object} node
   */
  handleContextMenu(node) {
    const label = node.label;

    this.setState({
      command        : 'contextMenu',
      contextMenuText: label
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
