import React, { useState } from 'react';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="lab-component">
      <h3>Todo List</h3>
      <div className="todo-input-group">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="todo-list">
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => deleteTask(task.id)} className="delete-btn">X</button>
          </li>
        ))}
        {tasks.length === 0 && <li>No tasks yet.</li>}
      </ul>
    </div>
  );
};

export default Todo;
