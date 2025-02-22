import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk("user/fetchUserData", async (email, thunkApi) => {
  try {
    const response = await axios.get(`https://portfolio-server-two-tawny.vercel.app/user/get-data/${email}`);
    return response.data; // Assuming response contains user data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data || "Failed to fetch user data");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
    isLoading: false,
    errorMessage: "",
  },
  reducers: {
    clearUserData: (state) => {
      state.userData = {};
      state.isLoading = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload.payload;
        state.isLoading = false;
        state.errorMessage = "";
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.userData = {};
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});

// Export actions
export const { clearUserData } = userSlice.actions;
// Export reducer
export default userSlice.reducer;
