import { useEffect, useState } from "react";
import "./Todo.css";

import { MdCheck, MdDeleteForever } from "react-icons/md";

// Reusebale Code
const todoListKey = "todoList";
const setLocalStorageData = (data) => {
  return localStorage.setItem(todoListKey, JSON.stringify(data));
};

const getLocalStorageData = () => {
  return JSON.parse(localStorage.getItem(todoListKey)) || [];
  // const data = localStorage.getItem(todoListKey);
  // if (!data) return [];
  // return JSON.parse(data);
};

export const Todo = () => {
  const [todoList, setTodoList] = useState(getLocalStorageData);

  const handleOnSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;
    // Test Case 1
    if (content === "") return;
    // Test Case 2
    const isMatched = todoList.find((todo) => todo.content === content);
    if (isMatched) return;

    setTodoList((prev) => [...prev, { id, content, checked }]);
  };

  // handle Todo Item Functionalities
  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  const handleCheckTodo = (id) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      } else {
        return todo;
      }
    });
    setTodoList(updatedTodoList);
  };

  const handleClearAllTodo = () => {
    setTodoList([]);
  };

  // add todo to local storage , as todoList change, it will re-render the whole component again
  setLocalStorageData(todoList);
  return (
    <section className="todo-container">
      <header>
        <h1>Todo List </h1>
        <TimeComponent />
      </header>

      <section id="form">
        <TodoForm handleOnSubmit={handleOnSubmit} />
      </section>

      <section className="myUnOderList">
        <ul className="todo-list">
          {todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleCheckTodo={handleCheckTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          ))}
        </ul>
      </section>

      <button className="clear-btn" onClick={handleClearAllTodo}>
        Clear All
      </button>
    </section>
  );
};

const TimeComponent = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setDateTime(`${date}-${time}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return <h2 className="date-time">{dateTime}</h2>;
};

const TodoForm = ({ handleOnSubmit }) => {
  const [inputValue, setInputValue] = useState({});

  // handle input change
  const handleInputChange = (value) => {
    setInputValue({
      id: new Date().getTime(),
      content: value.trim(),
      checked: false,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleOnSubmit(inputValue);
    setInputValue({ id: "", content: "", checked: false });
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <input
          type="text"
          className="todo-input"
          autoComplete="off"
          value={inputValue.content}
          onChange={(event) => handleInputChange(event.target.value)}
        />
      </div>
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};

const TodoItem = ({ todo, handleCheckTodo, handleDeleteTodo }) => {
  return (
    <li className="todo-item">
      <span className={todo.checked ? "checkList" : "notCheckList"}>
        {todo.content}
      </span>
      <button className="check-btn" onClick={() => handleCheckTodo(todo.id)}>
        <MdCheck />
      </button>
      <button className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>
        <MdDeleteForever />
      </button>
    </li>
  );
};
