import React, { Component } from 'react';

// SASS
import './app.scss';

// TJ Components
import Tree from './treeview';

const data = [{
  label: 'Fantasy',
  children: [{
    label: 'Miss Peregrine\'s Home for Peculiar Children',
    children: [{
      label: 'Eva Green'
    }, {
      label: 'Samuel L. Jackson'
    }]
  }, {
    label: 'Star Wars',
    children: [{
      label: 'Mark Hamill'
    }, {
      label: 'Harrison Ford'
    }, {
      label: 'Daisy Ridley'
    }]
  }, {
    label: 'Doctor Strange',
    children: [{
      label: 'Benedict Cumberbatch'
    }, {
      label: 'Rachel McAdams'
    }, {
      label: 'Chiwetel Ejiofor'
    }]
  }]
}, {
  label: 'Comedy',
  children: [{
    label: 'Bad Moms',
    children: [{
      label: 'Mila Kunis'
    }]
  }, {
    label: 'Ghostbusters',
    children: [{
      label: 'Kristen Wiig'
    }]
  }, {
    label: 'Deadpool',
    children: [{
      label: 'Ryan Reynolds'
    }]
  }]
}];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
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
              ref="tree"
              data={data}
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
              <h2 className="act-title">- Searching tree node</h2>
              <ul className="act-wrap">
                <label>Name:</label>
                <input type="text" />
                <button className="btn" onClick={this.handleSearchBtnClick}>Search</button>
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

    if (text) {
      this.setState({
        searchText: text
      });
    }

    evt.stopPropagation();
  }
};
