import { createSlice } from "@reduxjs/toolkit";
import * as coursesApi from "../api/courseApi";

const slice = createSlice({
  name: "courses",
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    courseAdded: (state, action) => {
      state.items.push(action.payload);
    },
    coursesReceived: (state, action) => {
      state.items = action.payload.data;
    },
    onError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default slice.reducer;
export const { courseAdded, onError, coursesReceived } = slice.actions;

export const getCourses = () => async (dispatch) => {
  try {
    const courses = await coursesApi.getCourses();
    dispatch(coursesReceived(courses));
  } catch (err) {
    dispatch(onError(err));
    throw err;
  }
};
