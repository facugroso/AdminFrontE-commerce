import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addProduct(state, action) {
      state.push(action.payload);
    },
    deleteProduct: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

const { actions, reducer } = productSlice;
export const { addProduct, deleteProduct } = actions;
export default reducer;
