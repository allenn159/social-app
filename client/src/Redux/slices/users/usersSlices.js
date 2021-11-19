import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

// Register action

export const registerUserAction = createAsyncThunk(
  "users/register",
  // reject with value allows for us to send customized error back to the user.
  // getState gives us snapshot of what its on entire state. examples would be to use when user is logging in.
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
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

// Login action

export const loginUserAction = createAsyncThunk(
  "user/login",
  async (userLogin, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        userLogin,
        config
      );

      //save user into local storage to save token
      localStorage.setItem("userLogin", JSON.stringify(data));
      return data;
    } catch (error) {
      // If there is no error on original response.
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Retrieve Profile
//Create category

export const fetchProfileAction = createAsyncThunk(
  "user/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    // Retrieve user token
    const user = getState()?.users;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    // Http call
    // Need login token to submit request. You can get this from getState
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/users/profile/${id}`,
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

// Upload profile photo
export const updateProfilePictureAction = createAsyncThunk(
  "user/profile-picture",
  async (image, { rejectWithValue, getState, dispatch }) => {
    // Retrieve user token
    const user = getState()?.users;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    // Http call
    // Need login token to submit request. You can get this from getState
    try {
      const formData = new FormData();
      formData.append("image", image?.image);
      console.log(formData);
      const { data } = await axios.put(
        `${baseUrl}/api/users/profile-picture-upload`,
        formData,
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

// Logout action
export const logoutUserAction = createAsyncThunk(
  "user/logout",
  async (userLogout, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userLogin");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Get user from local storage and place into initialState of the slice.
const userLoginFromStorage = localStorage.getItem("userLogin")
  ? JSON.parse(localStorage.getItem("userLogin"))
  : null;

//slices
const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  // This is the object notation. Other notation is map. Object notation is what is recommended.
  // Pending, fulfilled, and rejected are the options
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
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
    });

    //Login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.appErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      // Error with the application
      state.appErr = action?.payload?.message;
    });
    // Profile
    builder.addCase(fetchProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
    });
    builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.appErr = undefined;
    });
    builder.addCase(fetchProfileAction.rejected, (state, action) => {
      state.loading = false;
      // Error with the application
      state.appErr = action?.payload?.message;
    });
    // Upload Profile Picture
    builder.addCase(updateProfilePictureAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
    });
    builder.addCase(updateProfilePictureAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.appErr = undefined;
    });
    builder.addCase(updateProfilePictureAction.rejected, (state, action) => {
      state.loading = false;
      // Error with the application
      state.appErr = action?.payload?.message;
    });
    //Logout
    builder.addCase(logoutUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
    });
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loading = false;
      state.appErr = undefined;
    });
    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
    });
  },
});

export default usersSlices.reducer;
