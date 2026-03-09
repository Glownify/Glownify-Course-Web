import { createSlice } from "@reduxjs/toolkit";
import { registerThunk, loginThunk, updateUserProfileThunk } from "./auth.thunk";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
    reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        })
        .addCase(registerThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(loginThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        })
        .addCase(loginThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateUserProfileThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        })
        .addCase(updateUserProfileThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;