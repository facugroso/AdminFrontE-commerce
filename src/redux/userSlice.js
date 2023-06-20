import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setToken(state, action) {
      return action.payload;
    },
    clearToken: (state) => {
      return null;
    },
  },
});

const { actions, reducer } = userSlice;
export const { setToken, clearToken } = actions;
export default reducer;
