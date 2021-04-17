import { createSlice } from "@reduxjs/toolkit";
import * as authorApi from "../api/authorApi";

const slice = createSlice({
  name: "authors",
  initialState: {
    items: [],
    authorError: null,
  },
  reducers: {
    authorsReceived: (state, action) => {
      state.items = action.payload.data;
    },
    onError: (state, action) => {
      state.authorError = action.payload;
    },
  },
});

export default slice.reducer;
export const { authorsReceived, onError } = slice.actions;

export const getAuthors = () => async (dispatch) => {
  try {
    const authors = await authorApi.getAuthors();
    dispatch(authorsReceived(authors));
  } catch (err) {
    dispatch(onError(err));
    throw err;
  }
};
