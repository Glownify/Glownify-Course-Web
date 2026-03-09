import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
        console.log("Registering user with data at Redux:", userData); // Debug log
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const updateUserProfileThunk = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, thunkAPI) => {
    try {
      console.log("Updating user profile with data at Redux:", profileData); // Debug log
      const response = await api.post("/auth/update-profile", profileData);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);
