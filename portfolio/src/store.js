import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userDataSlice"; // Import the new slice

export const reduxStore = configureStore({
  reducer: {
    userState: userReducer, // Add the user reducer here
  },
});
