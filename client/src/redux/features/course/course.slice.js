import { createSlice } from "@reduxjs/toolkit";
import { createCourseThunk, fetchTrainerCoursesThunk, fetchCoursesThunk, fetchCourseByIdThunk } from "./course.thunk";

const initialState = {
  courses: [],
  courseDetails: null,
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createCourseThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createCourseThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.courses.push(action.payload);
        })
        .addCase(createCourseThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchTrainerCoursesThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTrainerCoursesThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.courses = action.payload;
        })
        .addCase(fetchTrainerCoursesThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchCoursesThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCoursesThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.courses = action.payload;
        })
        .addCase(fetchCoursesThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchCourseByIdThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCourseByIdThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.courseDetails = action.payload;
        })
        .addCase(fetchCourseByIdThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default courseSlice.reducer;