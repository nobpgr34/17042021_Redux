import { createSlice } from "@reduxjs/toolkit";
import * as coursesApi from "../api/courseApi";
import { beginApiCall, apiCallSuccess } from "./apiStatus";

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
    courseUpdated: (state, action) => {
      const index = state.items.findIndex((c) => c.id === action.payload.id);
      state.items[index] = action.payload;
    },
    coursesReceived: (state, action) => {
      state.items = action.payload.data;
    },
    courseDeleted: (state, action) => {
      const index = state.items.findIndex((c) => c.id === action.payload);
      state.items.splice(index, 1);
    },
    onError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default slice.reducer;
export const {
  courseAdded,
  onError,
  coursesReceived,
  courseUpdated,
  courseDeleted,
} = slice.actions;

export const getCourses = () => async (dispatch) => {
  dispatch(beginApiCall());
  try {
    const courses = await coursesApi.getCourses();
    dispatch(coursesReceived(courses));
  } catch (err) {
    dispatch(onError(err));
    throw err;
  } finally {
    dispatch(apiCallSuccess());
  }
};

export const saveCourse = (course) => async (dispatch) => {
  dispatch(beginApiCall());
  try {
    const savedCourse = await coursesApi.saveCourse(course);
    course.id
      ? dispatch(courseUpdated(savedCourse.data))
      : dispatch(courseAdded(savedCourse.data));
  } catch (err) {
    dispatch(onError(err));
    throw err;
  } finally {
    dispatch(apiCallSuccess());
  }
};

export const deleteCourse = (course) => async (dispatch) => {
  dispatch(courseDeleted(course.id));
  return coursesApi.deleteCourse(course.id);
};
