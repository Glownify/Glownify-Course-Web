import { createSlice } from "@reduxjs/toolkit";
import {
  createCategoriesThunk,
  fetchCategoriesThunk,
  deleteCategoryThunk,
} from "./category.thunk";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Created category:", action.payload); // Debug log
        state.categories.push(action.payload.category);
      })
      .addCase(createCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create category";
      })
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      })
      .addCase(deleteCategoryThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload
        );
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
