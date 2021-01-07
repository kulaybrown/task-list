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
      state.tasklist.push({ title: state.title, subtask: [] });
      // state.tasklist[0].title = "auto change";
      // state.tasklist[0].subtask[0] = "auto change 2";
    },
    addSubTask: (state, action) => {
      // state.target = 1;
      // console.log(action);
      state.target = action.payload;
      state.tasklist[state.target].subtask.push("Subtask");
    },

    getTaskIndex: (state, action) => {
      state.target = action.payload;
    },

    editTask: (state, action) => {
      state.tasklist[state.target].title = action.payload;
    },

    getSubTaskIndex: (state, action) => {
      state.subtarget = action.payload;
    },

    editSubTask: (state, action) => {
      state.tasklist[state.target].subtask[state.subtarget] = action.payload;
    },

    removeTask: (state, action) => {
      state.target = action.payload;
      state.tasklist.splice(state.target, 1);
    },

    removeSubTask: (state, action) => {
      // state.target = action.payload;
      // state.tasklist.splice(state.target, 1);
      state.tasklist[state.target].subtask.splice(state.subtarget, 1);
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
} = taskSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectTask = (state) => state.task.tasklist;
export const selectTarget = (state) => state.task.target;
export const selectTitle = (state) => state.task.title;

export default taskSlice.reducer;
