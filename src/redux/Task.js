import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentEditable from "react-contenteditable";

import {
  selectTask,
  addTask,
  addSubTask,
  selectTarget,
  selectTitle,
  editTask,
  getTaskIndex,
  editSubTask,
  getSubTaskIndex,
  removeTask,
  removeSubTask,
} from "./taskSlice";
import styles from "./Task.module.css";

export function Task() {
  const task = useSelector(selectTask);
  const target = useSelector(selectTarget);
  const title = useSelector(selectTitle);
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("title");
  console.log(task);
  console.log(target);
  console.log(title);
  const text = useRef("");

  const handleChange = (evt) => {
    text.current = evt.target.value;
  };

  const handleBlur = (e) => {
    console.log(e.target.parentNode);
    dispatch(
      getTaskIndex(e.target.parentNode.parentNode.getAttribute("data-card"))
    );
    dispatch(editTask(e.target.innerHTML));
  };

  const handleBlurItem = (e) => {
    dispatch(
      getTaskIndex(
        e.target.parentNode.parentNode.parentNode.getAttribute("data-card")
      )
    );
    dispatch(
      getSubTaskIndex(e.target.parentNode.getAttribute("data-carditem"))
    );
    dispatch(editSubTask(e.target.innerHTML));
  };

  const handleRemoveCard = (e) => {
    dispatch(removeTask(e.target.parentNode.getAttribute("data-card")));
    // console.log(e.target.parentNode.getAttribute("data-card"));
  };

  const handleRemoveSubTask = (e) => {
    dispatch(
      getTaskIndex(
        e.target.parentNode.parentNode.parentNode.getAttribute("data-card")
      )
    );
    dispatch(
      getSubTaskIndex(e.target.parentNode.getAttribute("data-carditem"))
    );
    dispatch(removeSubTask());
  };

  const renderTask = task.map((taskItem, i) => (
    <div key={i} className={styles.card} data-card={i}>
      <div className={styles.cardHeader}>
        <ContentEditable
          html={taskItem.title}
          onBlur={handleBlur}
          onChange={handleChange}
          className={styles.textleft}
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
            <ContentEditable
              html={item}
              onBlur={handleBlurItem}
              onChange={handleChange}
            />
            <button
              className={styles.cardRemoveSubTask}
              onClick={handleRemoveSubTask}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.cardRemove} onClick={handleRemoveCard}>
        x
      </button>
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
    </div>
  );
}
