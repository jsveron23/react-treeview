import React, { Component } from 'react';

// SASS
import './treeview.scss';

const noop = function() {};

/**
 * @see {@link https://jsfiddle.net/briguy37/2MVFd/}
 * @return {string}
 */
const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};


/**
 * Generate HTML elements
 * @param  {array}   data
 * @return {element}
 */
const generateHTML = (data, evtList = {}) => {
  return (
    <ul>
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
            <input
              type="checkbox"
              id={uniqueKey}
            />
            <label
              htmlFor={uniqueKey}
              className={children && 'has-children'}
              onContextMenu={evtList.onContextMenu}
            >
              {label}
            </label>

            {children && generateHTML(children)}

          </li>
        );
      })}
    </ul>
  );
}

/**
 * @class Tree Component
 * @extends {React.Component}
 */
export default class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.setState({
      data: generateHTML(this.props.data)
    });
  }

  render() {
    return (
      <div id={this.props.id} className="tree">
        {this.state.data}
      </div>
    );
  }
}
