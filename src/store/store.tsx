import { configureStore } from "@reduxjs/toolkit";
import NotifySlice from "./slice/notify.slice";

const store = configureStore({
  reducer: {
    Notify: NotifySlice,
  },
});

export default store;
