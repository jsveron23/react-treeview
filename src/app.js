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

    this.handleContextMenu = this.handleContextMenu.bind(this);
  }

  render() {
    return (
      <div>
        <section className="cp">
          <h2 className="cp-title">Tree Component</h2>
          <div className="cp-wrap">
            <Tree data={data} onContextMenu={this.handleContextMenu} />
          </div>
        </section>
      </div>
    );
  }

  handleContextMenu(evt) {
    evt.preventDefault();

    console.log(evt.target.textContent);
  }
};
