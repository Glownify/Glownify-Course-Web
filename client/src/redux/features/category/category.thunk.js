import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

export const createCategoriesThunk = createAsyncThunk(
  "category/create",
  async (categoryData, thunkAPI) => {
    try {
      const response = await api.post("/categories", categoryData);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const fetchCategoriesThunk = createAsyncThunk(
  "category/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/categories");
      const data = response.data;
      return data.categories;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  },
);

export const deleteCategoryThunk = createAsyncThunk(
  "category/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/categories/${id}`);
      return id;  // ✅ return only id
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
