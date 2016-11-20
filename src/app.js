import React, { Component } from 'react';

// SASS
import './app.scss';

// TJ Components
import Tree from './treeview';

const data = [{
  label: 'Sci-Fi',
  children: [{
    label: 'Interstella',
    children: [{
      label: 'Matthew McConaughey'
    }]
  }]
}, {
  label: 'Action',
  children: [{
    label: 'Edge of Tomorrow',
    children: [{
      label: 'Emily Blunt'
    }]
  }]
}, {
  label: 'Fantasy',
  children: [{
    label: 'Fantastic Beasts and Where to Find Them',
    children: [{
      label: 'Eddie Redmayne'
    }]
  }, {
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
      label: 'Felicity Jones'
    }, {
      label: 'Daisy Ridley'
    }, {
      label: 'Mads Mikkelsen'
    }, {
      label: 'Emilia Clarke'
    }]
  }, {
    label: 'Doctor Strange',
    children: [{
      label: 'Benedict Cumberbatch'
    }, {
      label: 'Rachel McAdams'
    }, {
      label: 'Chiwetel Ejiofor'
    }, {
      label: 'Mads Mikkelsen'
    }]
  }]
}, {
  label: 'Comedy',
  children: [{
    label: 'The Wolf of Wall Street',
    children: [{
      label: 'Leonardo DiCaprio'
    }, {
      label: 'Matthew McConaughey'
    }]
  }, {
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
              options={
                {
                  search: {
                    highlight: true,
                    collapse : true
                  }
                }
              }
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
              <h2 className="act-title">- Search tree node</h2>
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
