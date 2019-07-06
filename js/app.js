const { useState } = React;

const RandomQuoteMachine = () => {
  const [loading, setLoading] = useState(true);

  const handleClick = e => {
    setLoading(false);
    e.target.innerText = 'Clicked!';
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      {loading && <p>Loading...</p>}
      <button onClick={handleClick}>Click Me!</button>
    </div>
  );
};

const mountingNode = document.getElementById('app');

ReactDOM.render(<RandomQuoteMachine />, mountingNode);
