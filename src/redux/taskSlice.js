import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    value: 0,
    title: "",
    tasklist: [],
    target: 0,
    subtarget: 0,
  },

  reducers: {
    addTask: (state, action) => {
      state.title = action.payload;
      const serializedState = localStorage.getItem("task");
      if (serializedState !== null) {
        state.tasklist = JSON.parse(serializedState);
        state.tasklist.push({ title: state.title, subtask: [] });
        localStorage.setItem("task", JSON.stringify(state.tasklist));
        console.log(state.tasklist);
      } else {
        state.tasklist.push({ title: state.title, subtask: [] });
        localStorage.setItem("task", JSON.stringify(state.tasklist));
      }
    },
    addSubTask: (state, action) => {
      state.target = action.payload;
      state.tasklist[state.target].subtask.push({
        subtaskitem: "Subtask",
        status: false,
      });
      localStorage.setItem("task", JSON.stringify(state.tasklist));
    },

    getTaskIndex: (state, action) => {
      state.target = action.payload;
    },

    editTask: (state, action) => {
      state.tasklist[state.target].title = action.payload;
      localStorage.setItem("task", JSON.stringify(state.tasklist));
    },

    getSubTaskIndex: (state, action) => {
      state.subtarget = action.payload;
    },

    editSubTask: (state, action) => {
      state.tasklist[state.target].subtask[state.subtarget].subtaskitem =
        action.payload;
      localStorage.setItem("task", JSON.stringify(state.tasklist));
    },

    removeTask: (state, action) => {
      state.target = action.payload;
      state.tasklist.splice(state.target, 1);
      localStorage.setItem("task", JSON.stringify(state.tasklist));
    },

    removeSubTask: (state, action) => {
      state.tasklist[state.target].subtask.splice(state.subtarget, 1);
      localStorage.setItem("task", JSON.stringify(state.tasklist));
    },

    editCheckbox: (state, action) => {
      state.tasklist[state.target].subtask[state.subtarget].status =
        action.payload;
      localStorage.setItem("task", JSON.stringify(state.tasklist));
    },
  },
});

export const {
  addTask,
  addSubTask,
  editTask,
  getTaskIndex,
  editSubTask,
  getSubTaskIndex,
  removeTask,
  removeSubTask,
  editCheckbox,
  setLocalStore,
} = taskSlice.actions;

export const selectTask = (state) => state.task.tasklist;
export const selectTarget = (state) => state.task.target;
export const selectTitle = (state) => state.task.title;

export default taskSlice.reducer;
