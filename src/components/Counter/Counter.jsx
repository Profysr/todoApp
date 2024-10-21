import React, { useState } from "react";
import "./Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState(1);

  // handle increament
  const handleIncreament = () => {
    setCount(count + Number(inputValue));
  };

  // handle decreament
  const handleDecreament = () => {
    // Test Case 1
    if (count - Number(inputValue) < 0) {
      setCount(0);
      return;
    }
    setCount(count - Number(inputValue));
  };

  const handleInputChange = (ev) => {
    setInputValue(ev.target.value);
  };

  return (
    <section className="todo-container">
      <section id="form">
        <div
          style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}
        >
          {count}
        </div>
        <div>
          <input
            type="text"
            className="todo-input"
            autoComplete="off"
            accept=""
            value={inputValue}
            onChange={handleInputChange}
            inputMode="numeric"
            pattern="\d*"
          />
        </div>
      </section>
      <div style={{ display: "flex", gap: "10px" }}>
        <button className="clear-btn" onClick={() => handleIncreament()}>
          Increament
        </button>
        <button className="clear-btn" onClick={() => handleDecreament()}>
          Decreament
        </button>
      </div>
    </section>
  );
};

export default Counter;
