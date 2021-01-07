import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentEditable from "react-contenteditable";

import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
  selectTask,
  addTask,
  addSubTask,
  selectTarget,
  selectTitle,
} from "./taskSlice";
import styles from "./Task.module.css";

export function Task() {
  const count = useSelector(selectCount);
  const task = useSelector(selectTask);
  const target = useSelector(selectTarget);
  const title = useSelector(selectTitle);
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("Title");
  console.log(task);
  console.log(target);
  console.log(title);
  const text = useRef("asdasd");

  const handleChange = (evt) => {
    text.current = evt.target.value;
  };

  const handleBlur = () => {
    console.log(text.current);
  };
  const renderTask = task.map((taskItem, i) => (
    <div key={i} className={styles.card} data-card={i}>
      <div className={styles.cardHeader}>
        <ContentEditable
          html={taskItem.title}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <button
          className={styles.button}
          aria-label="Add Value"
          data-key={i}
          onClick={() => dispatch(addSubTask(i))}
        >
          +
        </button>
      </div>
      <ul className={styles.cardItems}>
        {taskItem.subtask.map((item, i2) => (
          <li className={styles.cardItem} key={i2} data-carditem={i2}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  ));
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button
          className={styles.button}
          aria-label="Add Value"
          onClick={() => dispatch(addTask(taskTitle))}
        >
          +
        </button>
      </div>
      <div className={styles.cards}>{renderTask}</div>
      {/* <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div> */}
    </div>
  );
}
