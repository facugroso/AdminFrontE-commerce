import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    addCategory(state, action) {
      state.push(action.payload);
    },
    // deleteCategory(state, action) {
    //   return state.filter((category) => category.id !== action.payload);
    // },
  },
});

const { actions, reducer } = categorySlice;
export const { addCategory } = actions;
export default reducer;
