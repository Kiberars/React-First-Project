// import { useState } from 'react';

import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, Text: 'Изучить React', completed: true },
    { id: 2, Text: 'Создать первый компонент', completed: true },
    { id: 3, Text: 'Разобраться с состоянием', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim === '') return;

    const todo = {
      id: Date.now(),
      Text: newTodo,
      completed: false,
    };

    setTodos([todo, ...todos]);

    setNewTodo('');
  };

  const delTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="todo-list">
      <h3>Список задачь</h3>

      <div className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Добавить новую задачу..."
          className="todo-input"
        />
        <button onClick={addTodo} className="add-btn">
          Добавить
        </button>
      </div>

      <ul className="todos">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} className="todo-checkbox" />
            <span className="todo-text">{todo.Text}</span>
            <button onClick={() => delTodo(todo.id)} className="delete-btn">
              ❌
            </button>
          </li>
        ))}
      </ul>

      <div className="todo-stats">
        Всего задачь: {todos.length} | Выполнено: {todos.filter((todo) => todo.completed).length} | Не выполнено:{' '}
        {todos.filter((todo) => !todo.completed).length}
      </div>
    </div>
  );
}

export default TodoList;
