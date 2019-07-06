const { useState } = React;

const RandomQuoteMachine = () => {
  const [loading, setLoading] = useState(true);

  const handleClick = e => {
    setLoading(!loading);
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      {loading ? <p>Loading...</p> : <p>Loaded!!!</p>}
      <button onClick={handleClick}>
        {loading ? 'Click Me!' : 'Clicked!'}
      </button>
    </div>
  );
};

const mountingNode = document.getElementById('app');

ReactDOM.render(<RandomQuoteMachine />, mountingNode);
