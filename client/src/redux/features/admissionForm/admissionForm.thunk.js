  import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

export const fetchAdmissionFormByCourseIdThunk = createAsyncThunk(
    "admissionForm/fetchByCourseId",
    async (courseId, thunkAPI) => {
        try {
            const response = await api.get(`/admission-forms/${courseId}`);
            const data = response.data;
            return data.admissionForm;
        } catch (error) {
            return handleAxiosError(error, thunkAPI);
        }
    },
);