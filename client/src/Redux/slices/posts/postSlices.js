import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

// Action to redirect
const resetPostAction = createAction("post/reset");

// Create Post Action

export const createPostAction = createAsyncThunk(
  "post/create",
  async (post, { rejectWithValue, getState, dispatch }) => {
    // Retrieve user token
    const user = getState()?.users;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(`${baseUrl}/api/posts`, post, config);
      // Creates an action in the state
      dispatch(resetPostAction());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch All Posts Under Category Action

export const fetchPostsAction = createAsyncThunk(
  "post/fetch",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/posts/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Toggle likes on post
export const toggleLikesAction = createAsyncThunk(
  "post/likes",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // Retrieve user token
    const user = getState()?.users;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/posts/likes`,
        postId,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Slice

const postSlice = createSlice({
  name: "post",
  initialState: {},
  extraReducers: (builder) => {
    // Create post
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    // Dispatch action to redirect
    builder.addCase(resetPostAction, (state, action) => {
      state.isSubmitted = true;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.postCreated = action?.payload;
      state.isSubmitted = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.loading = false;
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // Fetch All Posts
    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.postList = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // Toggle likes on post
    builder.addCase(toggleLikesAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(toggleLikesAction.fulfilled, (state, action) => {
      state.likes = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(toggleLikesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default postSlice.reducer;
