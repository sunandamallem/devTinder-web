import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requestSlice",
  initialState: [],
  reducers: {
    addRequest: (state, action) => {
      return action.payload();
    },
    removeRequest: (state, action) => {
      return action.payload();
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
