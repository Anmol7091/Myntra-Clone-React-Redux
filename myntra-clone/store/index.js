import { configureStore, createSlice } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice.js";
import fetchStatusSlice from "./fetchStatusSlice";
import bagSlice from "./BagSlice.js";

const myntraStore = configureStore({
  reducer: { items: itemsSlice.reducer, fetchStatus: fetchStatusSlice.reducer ,bag:bagSlice.reducer}
});
export default myntraStore;
