import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setToken(state, action) {
      return action.payload;
    },
    logout: (state) => {
      return null;
    },
  },
});

const { actions, reducer } = userSlice;
export const { setToken, logout } = actions;
export default reducer;
