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
