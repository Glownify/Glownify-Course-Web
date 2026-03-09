import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

export const createCourseThunk = createAsyncThunk(
  "course/create",
  async (courseData, thunkAPI) => {
    try {
      const response = await api.post("/courses", courseData);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
    },
);

export const fetchTrainerCoursesThunk = createAsyncThunk(
  "course/fetchTrainerCourses",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/courses/trainer");
      const data = response.data;
      return data.courses;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const fetchCoursesThunk = createAsyncThunk(
    "course/fetchAll",
    async (_, thunkAPI) => {
      try {
        const response = await api.get("/courses");
        return response.data;
        } catch (error) {
        return handleAxiosError(error, thunkAPI);
      }
    },
);

export const fetchCourseByIdThunk = createAsyncThunk(
  "course/fetchById",
  async (courseId, thunkAPI) => {
    try {
      const response = await api.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);