import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Register action

export const registerUserAction = createAsyncThunk(
  "users/register",
  // reject with value allows for us to send customized error back to the user.
  // getState gives us snapshot of what its on entire state. examples would be to use when user is logging in.
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      // http call
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register/",
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slices

const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: "login",
  },
  // This is the object notation. Other notation is map. Object notation is what is recommended.
  // Pending, fulfilled, and rejected are the options
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      // Error with the application
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default usersSlices.reducer;
