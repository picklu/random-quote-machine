class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ loading: !this.state.loading });
    e.target.innerText = 'Clicked!';
  }

  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        {this.state.loading && <p>Loading...</p>}
        <button onClick={this.handleClick}>Click Me!</button>
      </div>
    );
  }
}

const mountingNode = document.getElementById('app');

ReactDOM.render(<RandomQuoteMachine />, mountingNode);
