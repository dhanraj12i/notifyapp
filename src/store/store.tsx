import { configureStore } from "@reduxjs/toolkit";
import notifySlice from "./slice/Notify.slice";

const store = configureStore({
  reducer: {
    Notify: notifySlice,
  },
});

export default store;
