# react-tj-treeview
> for React

# Example

```bash
npm install
npm start
```

Then open http://localhost:3000 in a browser.

# Screenshot

![Screenshot](screenshot.png)

```javascript
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
```

## License

MIT, see the [LICENSE](https://github.com/jsveron23/react-tj-treeview/blob/master/LICENSE) file for detail.
