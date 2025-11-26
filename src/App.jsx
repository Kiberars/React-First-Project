import { useState } from 'react';
import './App.css';
import Welcome from './components/welcome';
import TodoList from './components/TodoList';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <header className="App-Header">
        <h1>Мое первое React приложение! 🚀</h1>

        <div className="card" onClick={increment}>
          <button>Кликов: {count}</button>
          <p>
            Редактируй <code>src/App.jsx</code> и сохрани для обновления.
          </p>
        </div>
      </header>
      <Welcome name="Арсений" message="Начало положено" />
	  <TodoList/>
    </div>
  );
}

export default App;
