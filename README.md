[![npm](https://img.shields.io/npm/v/react-tj-treeview.svg?style=flat-square)](https://www.npmjs.com/package/react-tj-treeview) [![npm](https://img.shields.io/npm/l/react-tj-treeview.svg?style=flat-square)](LICENSE)
# react-tj-treeview

## Example

```bash
npm install
cd examples && npm install
npm start
```

Then open http://localhost:3000 in a browser.

## Install

```bash
npm install react-tj-treeview
```

## Screenshot

![Screenshot](screenshot.png)

## Customize

### SCSS

You will need CSS for using this module, customize from SCSS.

```sass
$hoverBorderColor: #e0e0e0;

.tree {
  &-root {
    margin: 7px 0;
  }

  ul,
  li {
    list-style: none;
  }

  li {
    margin:      1px 0;
    user-select: none;
  }

  li > label {
    display:       inline-block;
    cursor:        pointer;
    padding:       3px 7px;
    border-radius: 6px;
    border-bottom: 1px solid transparent;

    &:hover {
      border-bottom: 1px solid $hoverBorderColor;
    }

    &:before {
      content: "";
      display: inline-block;
    }

    &.has-children {
      font-size:   110%;
      font-weight: bold;

      &:before {
        font-family:  FontAwesome;
        content:      "\f067";
        font-size:    10px;
        font-weight:  lighter;
        margin-right: 5px;
      }
    }
  }

  input:checked + label.has-children {
    &:before {
      font-family: FontAwesome;
      content:     "\f068";
    }
  }

  input {
    display: none;
  }

  & input + label + ul {
    margin-left: 10px;
  }

  input ~ ul {
    display: none;
  }

  input:checked ~ ul {
    display: block;
  }
}
```

## Data (JSON)

```json
[{
  "label": "Sci-Fi",
  "collapse": false,
  "children": [{
    "label": "Interstella",
    "collapse": false,
    "children": [{
      "label": "Matthew McConaughey",
      "leaf": true
    }]
  }]
}, {
  "label": "Action",
  "collapse": false,
  "children": [{
    "label": "Edge of Tomorrow",
    "collapse": false,
    "children": [{
      "label": "Emily Blunt",
      "leaf": true
    }]
  }]
}, {
  "label": "Fantasy",
  "collapse": false,
  "children": [{
    "label": "Fantastic Beasts and Where to Find Them",
    "collapse": false,
    "children": [{
      "label": "Eddie Redmayne",
      "leaf": true
    }]
  }, {
    "label": "Miss Peregrine\"s Home for Peculiar Children",
    "collapse": false,
    "children": [{
      "label": "Eva Green",
      "leaf": true
    }, {
      "label": "Samuel L. Jackson",
      "leaf": true
    }]
  }, {
    "label": "Star Wars",
    "collapse": false,
    "children": [{
      "label": "Mark Hamill",
      "leaf": true
    }, {
      "label": "Harrison Ford",
      "leaf": true
    }, {
      "label": "Felicity Jones",
      "leaf": true
    }, {
      "label": "Daisy Ridley",
      "leaf": true
    }, {
      "label": "Mads Mikkelsen",
      "leaf": true
    }, {
      "label": "Emilia Clarke",
      "leaf": true
    }]
  }, {
    "label": "Doctor Strange",
    "collapse": false,
    "children": [{
      "label": "Benedict Cumberbatch",
      "leaf": true
    }, {
      "label": "Rachel McAdams",
      "leaf": true
    }, {
      "label": "Chiwetel Ejiofor",
      "leaf": true
    }, {
      "label": "Mads Mikkelsen",
      "leaf": true
    }]
  }]
}, {
  "label": "Comedy",
  "collapse": false,
  "children": [{
    "label": "The Wolf of Wall Street",
    "collapse": false,
    "children": [{
      "label": "Leonardo DiCaprio",
      "leaf": true
    }, {
      "label": "Matthew McConaughey",
      "leaf": true
    }]
  }, {
    "label": "Bad Moms",
    "collapse": false,
    "children": [{
      "label": "Mila Kunis",
      "leaf": true
    }]
  }, {
    "label": "Ghostbusters",
    "collapse": false,
    "children": [{
      "label": "Kristen Wiig",
      "leaf": true
    }]
  }, {
    "label": "Deadpool",
    "collapse": false,
    "children": [{
      "label": "Ryan Reynolds",
      "leaf": true
    }]
  }]
}]
```

## License

MIT, see the [LICENSE](LICENSE) file for detail.
