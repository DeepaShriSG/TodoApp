import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todoApp",
  initialState: [
    { id: 1, title: "Task 1", status: false, dueDate: "2024-11-17" },
    { id: 2, title: "Task 2", status: true, dueDate: "2024-11-18" },
    { id: 3, title: "Task 3", status: false, dueDate: "2024-11-15" },
  ],
  reducers: {
    add: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload.title, 
        status: false, 
        dueDate: action.payload.dueDate || null, 
      };
      state.push(newTask);
    },
    toggle: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.status = !task.status; 
      }
    },
  },
});

export const { add, toggle } = todoSlice.actions;
export default todoSlice.reducer;
