import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    value: 0,
    title: "",
    tasklist: [],
    target: 0,
  },

  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.title += action.payload;
    },
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
      state.tasklist[state.target].subtask.push("hello");
    },

    editTask: (state, action) => {
      state.tasklist[0].title = "auto change";
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  addTask,
  addSubTask,
} = taskSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// export const targetAsync = (amount) => (dispatch) => {
//   dispatch(addSubTask(amount));
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.task.value;
export const selectTask = (state) => state.task.tasklist;
export const selectTarget = (state) => state.task.target;
export const selectTitle = (state) => state.task.title;
export default taskSlice.reducer;
