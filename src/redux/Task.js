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
  editCheckbox,
  // loadState,
  setLocalStorage,
} from "./taskSlice";
import styles from "./Task.module.css";

export function Task() {
  const task = useSelector(selectTask);
  const target = useSelector(selectTarget);
  const title = useSelector(selectTitle);
  // const ls = useSelector(loadState);
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("Task");
  // console.log(task);
  // console.log(target);
  // console.log(ls);
  const text = useRef("");

  const handleChange = (evt) => {
    text.current = evt.target.value;
  };

  const handleBlur = (e) => {
    // console.log(e.target.parentNode);
    dispatch(
      getTaskIndex(e.target.parentNode.parentNode.getAttribute("data-card"))
    );
    dispatch(editTask(e.target.innerHTML));
    // dispatch(setLocalStorage());
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
    console.log(e.target);
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

  const handleCheck = (e) => {
    dispatch(
      getTaskIndex(
        e.target.parentNode.parentNode.parentNode.getAttribute("data-card")
      )
    );
    dispatch(
      getSubTaskIndex(e.target.parentNode.getAttribute("data-carditem"))
    );

    dispatch(editCheckbox(e.target.checked));
  };

  const handleProgress = (e) => {
    console.log(e);
  };
  // const storedTask = JSON.parse(localStorage.getItem("task"));

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
          <li
            className={styles.cardItem}
            key={i2}
            data-carditem={i2}
            data-crossout={item.status}
          >
            <input
              type="checkbox"
              {...(item.status ? { checked: true } : "")}
              onChange={handleCheck}
            />
            <ContentEditable
              html={item.subtaskitem}
              onBlur={handleBlurItem}
              onChange={handleChange}
              className={styles.cardItemInner}
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
