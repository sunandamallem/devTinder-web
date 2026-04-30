import { createSlice } from "@reduxjs/toolkit";
const connectionSlice = createSlice({
  name: "connectionSlice",
  initialState: [],
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: (state, action) => {
      return action.payload;
    },
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
