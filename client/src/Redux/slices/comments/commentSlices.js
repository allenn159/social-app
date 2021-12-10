import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";

// Create comment action

export const createCommentAction = createAsyncThunk(
  "comment/create",
  async (comment, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.post(
        `${baseUrl}/api/comments`,
        {
          postId: comment?.postId,
          description: comment?.description,
        },
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

// Fetch comments
export const fetchCommentsAction = createAsyncThunk(
  "comment/fetch",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `${baseUrl}/api/comments/${postId}`,
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

// Delete comment action

export const deleteCommentAction = createAsyncThunk(
  "comment/delete",
  async (commentId, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.delete(
        `${baseUrl}/api/comments/${commentId}`,
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

const initialState = {
  returned: [],
};

const commentSlices = createSlice({
  name: "comments",
  initialState: {},
  extraReducers: (builder) => {
    //Create comment
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.comments = undefined;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    // Fetch comments
    builder.addCase(fetchCommentsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCommentsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.fetchedComments = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCommentsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Delete comment
    builder.addCase(deleteCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentedDeleted = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export const { reset } = commentSlices.actions;

export default commentSlices.reducer;
