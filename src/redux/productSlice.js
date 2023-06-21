import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    addProduct(state, action) {
      state.push(action.payload);
    },
    editProduct(state, action) {
      return;
    },
    deleteProduct: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

const { actions, reducer } = productSlice;
export const { addProduct, deleteProduc, editProduct } = actions;
export default reducer;
