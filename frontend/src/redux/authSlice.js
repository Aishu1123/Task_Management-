import { createSlice } from "@reduxjs/toolkit";

const initialState = { auth: false };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLinLout: (state, actions) => {
      state.auth = actions.payload;
    },
  },
});
// ...
export const { authLinLout } = authSlice.actions;
export default authSlice.reducer;
