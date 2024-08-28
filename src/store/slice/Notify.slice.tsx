import { createSlice } from "@reduxjs/toolkit";

type Notify = {
  id: number;
  text: string;
  completed: boolean;
};

export const NotifySlice = createSlice({
  name: "Notify",
  initialState: [] as Notify[],
  reducers: {
    todoAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      });
    },
    todoToggled(state, action) {
      const todo = state.find((item) => item.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { todoAdded, todoToggled } = NotifySlice.actions;
export default NotifySlice.reducer;
