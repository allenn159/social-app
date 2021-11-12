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

const commentSlices = createSlice({
  name: "comment",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(createCommentAction.pending, (action, state) => {
      state.loading = true;
    });
    builder.addCase(createCommentAction.fulfilled, (action, state) => {
      state.loading = false;
      state.comment = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCommentAction.rejected, (action, state) => {
      state.loading = false;
      state.comment = undefined;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default commentSlices.reducer;
