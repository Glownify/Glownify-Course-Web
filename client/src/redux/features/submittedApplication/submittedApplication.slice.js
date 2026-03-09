import { createSlice } from "@reduxjs/toolkit";
import { submitApplicationThunk, fetchTrainerApplicationsThunk, fetchStudentApplicationsThunk } from "./submittedApplication.thunk";

const submittedApplicationSlice = createSlice({
    name: "submittedApplication",
    initialState: {
        loading: false,
        error: null,
        success: false,
        application: []
    },
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.application = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitApplicationThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(submitApplicationThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.application = [...state.application, action.payload.application];
            })
            .addCase(submitApplicationThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to submit application";
            })
            .addCase(fetchTrainerApplicationsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrainerApplicationsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.application = action.payload;
            })
            .addCase(fetchTrainerApplicationsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch applications";
            })
            .addCase(fetchStudentApplicationsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudentApplicationsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.application = action.payload;
            })
            .addCase(fetchStudentApplicationsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch applications";
            });
    }
});

export default submittedApplicationSlice.reducer;