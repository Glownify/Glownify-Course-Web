import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

export const submitApplicationThunk = createAsyncThunk(
    "submittedApplication/submitApplication",
    async ({ courseId, answers }, _thunkAPI) => {
        try {
            const response = await api.post("/submitted-applications", { courseId, answers });
            return response.data;
        } catch (error) {
            return handleAxiosError(error, _thunkAPI);
        }
    }
);

export const fetchTrainerApplicationsThunk = createAsyncThunk(
    "submittedApplication/fetchTrainerApplications",
    async (_, _thunkAPI) => {
        try {
            const response = await api.get("/submitted-applications/trainer");
            console.log("Fetched Trainer Applications:", response.data);
            return response.data;
        } catch (error) {
            return handleAxiosError(error, _thunkAPI);
        }
    }
);

export const fetchStudentApplicationsThunk = createAsyncThunk(
    "submittedApplication/fetchStudentApplications",
    async (_, _thunkAPI) => {
        try {
            const response = await api.get("/submitted-applications/student");
            console.log("Fetched Student Applications:", response.data);
            return response.data;
        } catch (error) {
            return handleAxiosError(error, _thunkAPI);
        }
    }
);