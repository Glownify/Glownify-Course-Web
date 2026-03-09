import { createSlice } from "@reduxjs/toolkit";
import { fetchAdmissionFormByCourseIdThunk } from "./admissionForm.thunk";

const initialState = {
    admissionForm: null,
    loading: false,
    error: null,
};

const admissionFormSlice = createSlice({
    name: "admissionForm",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAdmissionFormByCourseIdThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAdmissionFormByCourseIdThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.admissionForm = action.payload;
        })
        .addCase(fetchAdmissionFormByCourseIdThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default admissionFormSlice.reducer;