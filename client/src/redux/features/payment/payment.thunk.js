import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

export const createPaymentThunk = createAsyncThunk(
    "payment/create",
    async (paymentData, thunkAPI) => {
        try {
            const response = await api.post("/payments", paymentData);
            return response.data;
        }
        catch (error) {
            return handleAxiosError(error, thunkAPI);
        }
    },
);

export const fetchPaymentsThunk = createAsyncThunk(
    "payment/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/payments");
            return response.data;
        }
        catch (error) {
            return handleAxiosError(error, thunkAPI);
        }
    },
);