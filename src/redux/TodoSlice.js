import { createSlice } from "@reduxjs/toolkit";

export const TodoSlice = createSlice({
    name: "todo",
    initialState: [
        {
            id: 0,
            title: "Gym Workout",
            status: true, 
        },
    ],
    reducers: { 
        add: (state, action) => {
            const newId = state.length > 0 ? state[state.length - 1].id + 1 : 1; 
            state.push({ ...action.payload, id: newId }); 
        },
        toggle: (state, action) => {
            const id = action.payload;
            return state.map((note) =>
                note.id === id ? { ...note, status: !note.status } : note
            );
        },
    },
});

export const { add, toggle } = TodoSlice.actions;
export default TodoSlice.reducer;
