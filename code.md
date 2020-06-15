```js
class ColorsPage extends React.Component {
  state = {};
  render() {
    return <h1>Colors</h1>;
  }
}

function App() {
  return <ColorsPage />;
}

ReactDOM.render(<App />, document.getElementById("root"));
```

```shell
npm install bootstrap-css-only
```

```html
<link
  rel="stylesheet"
  href="node_modules/bootstrap-css-only/css/bootstrap.css"
/>
<link rel="stylesheet" href="styles.css" />
```

```css
.card {
  width: 18rem;
}

.color-block {
  min-height: 5rem;
}
```

```js
function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
class Color {
  constructor(id, title, value) {
    this.id = id;
    this.title = title;
    this.value = value;
  }
}

function getInitialColors() {
  return [
    new Color(generateId(), "Red", "red"),
    new Color(generateId(), "Green", "green"),
    new Color(generateId(), "Blue", "blue"),
  ];
}

class ColorList extends React.Component {
  render() {
    const { colors } = this.props;
    return colors.map((color) => {
      return (
        <div className="card" key={color.id}>
          <div className="card-body">
            <h5 className="card-title">{color.title}</h5>
            <div
              className="color-block"
              style={{
                backgroundColor: color.value,
              }}
            ></div>
          </div>
        </div>
      );
    });
  }
}

class ColorsPage extends React.Component {
  state = { colors: [] };

  componentDidMount() {
    this.setState({ colors: getInitialColors() });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Colors</h1>
        <ColorList colors={this.state.colors} />
      </React.Fragment>
    );
  }
}

function App() {
  return (
    <div className="container">
      <ColorsPage />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

## Form Displays always (no hide or show, removed title)

```js
function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
class Color {
  constructor(id, value) {
    this.id = id;
    this.value = value;
  }
}

function getInitialColors() {
  return [
    new Color(generateId(), "#ff0000"),
    new Color(generateId(), "#008000"),
    new Color(generateId(), "#0000FF"),
  ];
}

class ColorListItem extends React.Component {
  render() {
    const { color } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <div
            className="color-block"
            style={{
              backgroundColor: color.value,
            }}
          ></div>
        </div>
      </div>
    );
  }
}

class ColorForm extends React.Component {
  render() {
    const { color } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <form className="form">
            <div className="form-group">
              <input
                className="form-control"
                type="color"
                name={color.value}
                id={color.value}
                defaultValue={color.value}
              />
            </div>
            <button className="btn btn-outline-primary">Save</button>
            <button className="btn btn-link">cancel</button>
          </form>
        </div>
      </div>
    );
  }
}

class ColorList extends React.Component {
  render() {
    const { colors } = this.props;
    return colors.map((color) => {
      return (
        <React.Fragment key={color.id}>
          <ColorListItem color={color} />
          <ColorForm color={color} />
        </React.Fragment>
      );
    });
  }
}

class ColorsPage extends React.Component {
  state = { colors: [] };

  componentDidMount() {
    this.setState({ colors: getInitialColors() });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Colors</h1>
        <ColorList colors={this.state.colors} />
      </React.Fragment>
    );
  }
}

function App() {
  return (
    <div className="container">
      <ColorsPage />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

### onEdit

```js
function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
class Color {
  constructor(id, value) {
    this.id = id;
    this.value = value;
  }
}

function getInitialColors() {
  return [
    new Color(generateId(), "#ff0000"),
    new Color(generateId(), "#008000"),
    new Color(generateId(), "#0000FF"),
  ];
}

class ColorListItem extends React.Component {
  render() {
    const { color, onEdit } = this.props;
    return (
      <div className="card" onClick={() => onEdit(color)}>
        <div className="card-body">
          <div
            className="color-block"
            style={{
              backgroundColor: color.value,
            }}
          ></div>
        </div>
      </div>
    );
  }
}

class ColorForm extends React.Component {
  render() {
    const { color } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <form className="form">
            <div className="form-group">
              <input
                className="form-control"
                type="color"
                name={color.value}
                id={color.value}
                defaultValue={color.value}
              />
            </div>
            <button className="btn btn-outline-primary">Save</button>
            <button type="button" className="btn btn-link">
              cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

class ColorList extends React.Component {
  state = {
    editingColor: null,
  };

  handleEdit = (color) => {
    console.log(color);
    this.setState({ editingColor: color });
  };

  render() {
    const { colors } = this.props;
    return colors.map((color) => {
      return (
        <React.Fragment key={color.id}>
          {color !== this.state.editingColor ? (
            <ColorListItem color={color} onEdit={this.handleEdit} />
          ) : (
            <ColorForm color={color} />
          )}
        </React.Fragment>
      );
    });
  }
}

class ColorsPage extends React.Component {
  state = { colors: [] };

  componentDidMount() {
    this.setState({ colors: getInitialColors() });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Colors</h1>
        <ColorList colors={this.state.colors} />
      </React.Fragment>
    );
  }
}

function App() {
  return (
    <div className="container">
      <ColorsPage />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

### Update

```js
function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
class Color {
  constructor(id, value) {
    this.id = id;
    this.value = value;
  }
}

function getInitialColors() {
  return [
    new Color(generateId(), "#ff0000"),
    new Color(generateId(), "#008000"),
    new Color(generateId(), "#0000FF"),
  ];
}

class ColorListItem extends React.Component {
  render() {
    const { color, onEdit } = this.props;
    return (
      <div className="card" onClick={() => onEdit(color)}>
        <div className="card-body">
          <div
            className="color-block"
            style={{
              backgroundColor: color.value,
            }}
          ></div>
        </div>
      </div>
    );
  }
}

class ColorForm extends React.Component {
  state = {
    id: this.props.color.id || generateId(),
    value: this.props.color.value,
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    const { id, value } = this.state;
    event.preventDefault();
    const newColor = new Color(id, value);
    onSubmit(newColor);
  };
  render() {
    const { onCancel } = this.props;
    const { value } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="color"
                name={value}
                id={value}
                value={value}
                onChange={this.handleChange}
              />
            </div>
            <button className="btn btn-outline-primary">Save</button>
            <button type="button" className="btn btn-link" onClick={onCancel}>
              cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

class ColorList extends React.Component {
  state = {
    editingColor: null,
  };

  handleEdit = (color) => {
    this.setState({ editingColor: color });
  };
  handleCancel = () => {
    this.setState({ editingColor: null });
  };

  render() {
    const { colors, onUpdate } = this.props;
    return colors.map((color) => {
      return (
        <React.Fragment key={color.id}>
          {color !== this.state.editingColor ? (
            <ColorListItem color={color} onEdit={this.handleEdit} />
          ) : (
            <ColorForm
              color={color}
              onCancel={this.handleCancel}
              onSubmit={onUpdate}
            />
          )}
        </React.Fragment>
      );
    });
  }
}

class ColorsPage extends React.Component {
  state = { colors: [] };

  updateColor = (updatedColor) => {
    this.setState((state) => {
      let colors = state.colors.map((color) => {
        return color.id === updatedColor.id
          ? Object.assign({}, color, updatedColor)
          : color;
      });
      return { colors };
    });
  };

  componentDidMount() {
    this.setState({ colors: getInitialColors() });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Colors</h1>
        <ColorList colors={this.state.colors} onUpdate={this.updateColor} />
      </React.Fragment>
    );
  }
}

function App() {
  return (
    <div className="container">
      <ColorsPage />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```
