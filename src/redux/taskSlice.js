import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    value: 0,
    title: "",
    tasklist: [],
    target: 0,
    subtarget: 0,
    ddd: "",
  },

  reducers: {
    addTask: (state, action) => {
      state.title = action.payload;
      state.tasklist.push({ title: state.title, subtask: [] });

      const serializedState = localStorage.getItem("task");
      if (serializedState !== null) {
        // localStorage.setItem("task", JSON.stringify(state.tasklist));
        // state.tasklist.push({ title: state.title, subtask: [] });
      }
    },
    addSubTask: (state, action) => {
      state.target = action.payload;
      state.tasklist[state.target].subtask.push({
        subtaskitem: "Subtask",
        status: false,
      });
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
      state.tasklist[state.target].subtask[state.subtarget].subtaskitem =
        action.payload;
    },

    removeTask: (state, action) => {
      state.target = action.payload;
      state.tasklist.splice(state.target, 1);
    },

    removeSubTask: (state, action) => {
      state.tasklist[state.target].subtask.splice(state.subtarget, 1);
    },

    editCheckbox: (state, action) => {
      state.tasklist[state.target].subtask[state.subtarget].status =
        action.payload;
    },
    qwe2: (state, action) => {
      state.ddd = "sds";
      console.log(state.ddd);
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
  // qwe2,
} = taskSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const loadState = (state) => {
  try {
    // localStorage.setItem("task", JSON.stringify(state.task.tasklist));
    // console.log(state.task.tasklist);

    const serializedState = localStorage.getItem("task");
    console.log(JSON.parse(serializedState));
    console.log(state.task.tasklist[0]);
    if (serializedState !== null) {
      localStorage.setItem("task", JSON.stringify(state.task.tasklist));
      // return undefined;
    }
    // else {
    //   state.task.tasklist.push(JSON.parse(serializedState));
    // }
    // if (serializedState !== null) {
    //   state.task.tasklist.push(JSON.parse(serializedState));
    // }
    // return JSON.parse(JSON.parse(serializedState));
  } catch (err) {
    return undefined;
  }
};

// export const qwe = () => (dispatch) => {
//   dispatch(qwe2());
// };

export const selectTask = (state) => state.task.tasklist;
export const selectTarget = (state) => state.task.target;
export const selectTitle = (state) => state.task.title;

export default taskSlice.reducer;
