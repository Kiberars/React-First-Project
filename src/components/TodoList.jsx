import { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [
    { id: 1, Text: 'Изучить React', completed: true },
    { id: 2, Text: 'Создать первый компонент', completed: true },
    { id: 3, Text: 'Разобраться с состоянием', completed: false },
  ];
});
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null); // ID редактируемой задачи
  const [editingText, setEditingText] = useState(''); // Текст для редактирования
  const [filter, setFilter] = useState('all')


  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  },todos)

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const delTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const startEdit = (id, currentText) =>{
    setEditingId(id);
    setEditingText(currentText);
  }
  
  const saveEdit = ()=>{
    if (editingText.trim === '') return;
    setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, Text: editingText } : todo)));

    setEditingId(null);
    setEditingText('');
  }
  const cencelEdit = () =>{
    setEditingId(null);
    setEditingText('');
  }
  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape'){
      cencelEdit();
    }
  };


  const getFilteredTodos = ()=>{
    switch(filter){
      case 'active':
        return todos.filter( todo => !todo.completed)
      case 'completed':
        return todos.filter( todo => todo.completed)
      case 'all':
      default:
        return todos
    }
  }


  const filteredTodos = getFilteredTodos()
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

      {/* 🔥 КНОПКИ ФИЛЬТРАЦИИ */}
    <div className="filter-buttons">
      <button 
        className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
        onClick={() => setFilter('all')}
      >
        Все
      </button>
      <button 
        className={filter === 'active' ? 'filter-btn active' : 'filter-btn'}
        onClick={() => setFilter('active')}
      >
        Активные
      </button>
      <button 
        className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
        onClick={() => setFilter('completed')}
      >
        Выполненные
      </button>
    </div>

      <ul className="todos">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} className="todo-checkbox" />

            {editingId === todo.id ? (  
              <div className="edit-container">
                <input type="text" 
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyPress={handleEditKeyPress}
                onBlur={saveEdit}
                className="edit-input"
                autoFocus
                />
                <button onClick={saveEdit} className="save-btn">💾</button>
                <button onClick={cencelEdit} className="cancel-btn">❌</button>
              </div>
            ):(
              <>
                <span className="todo-text" onDoubleClick={() => startEdit(todo.id, todo.Text)}>
                {todo.Text}
                </span>
                <button onClick={() => delTodo(todo.id)} className="delete-btn">
                ❌
                </button>
              </>
            )}
            



            
          </li>
        ))}
      </ul>

      <div className="todo-stats">
        Всего задачь: {todos.length} 
        | Выполнено: {todos.filter((todo) => todo.completed).length} 
        | Не выполнено: {todos.filter((todo) => !todo.completed).length}
        | Показано: {filteredTodos.length}
      </div>

       {/* Отладочная информация */}
      <div className="debug-info">
        <h4>Отладочная информация (localStorage):</h4>
        <button onClick={() => console.log(localStorage)}>Показать localStorage</button>
        <button onClick={() => console.log(JSON.parse(localStorage.getItem('todos')))}>Показать todos</button>
      </div>
    </div>
  );
}

export default TodoList;
