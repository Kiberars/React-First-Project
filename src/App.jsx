import { useState } from 'react';
import './App.css';
import Welcome from './components/welcome';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <header className="App-Header">
        <h1>Мое первое React приложение! 🚀</h1>
        <Welcome name="Ars" message="text" />
        <Welcome name="Разработчик" message="Это крутой путь!" />
        <div className="card" onClick={increment}>
          <button>Кликов: {count}</button>
          <p>
            Редактируй <code>src/App.jsx</code> и сохрани для обновления.
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
