import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [todolist, setTodolist] = useState([]);
  const [task, setTask] = useState('');

  const saveToDoList = (event) => {
    event.preventDefault();
    if (task.trim() === '') {
      alert("To-Do Name cannot be empty.");
      return;
    }
    if (!todolist.includes(task)) {
      setTodolist([...todolist, task]);
      setTask(''); // Clear the input field
    } else {
      alert("To-Do Name Already Exists.");
    }
  };

  const list = todolist.map((value, index) => (
    <ToDoListItem
      value={value}
      key={index}
      indexNumber={index}
      todolist={todolist}
      setTodolist={setTodolist}
    />
  ));

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={saveToDoList}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">Save</button>
      </form>
      <div className="outerDiv">
        <ul>{list}</ul>
      </div>
    </div>
  );
}

export default App;

function ToDoListItem({ value, indexNumber, todolist, setTodolist }) {
  const [status, setStatus] = useState(false);

  const deleteRow = () => {
    const finalData = todolist.filter((_, i) => i !== indexNumber);
    setTodolist(finalData);
  };

  const checkStatus = () => {
    setStatus(!status);
  };

  return (
    <li
      className={status ? 'completetodo' : ''}
      onClick={checkStatus}
    >
      {indexNumber + 1}. {value}
      <span onClick={deleteRow} style={{ cursor: 'pointer', marginLeft: '10px' }}>
        ×
      </span>
    </li>
  );
}
