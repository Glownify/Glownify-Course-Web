import { createSlice } from "@reduxjs/toolkit";
import { createPaymentThunk, fetchPaymentsThunk } from "./payment.thunk";

const initialState = {
  payments: [],
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createPaymentThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createPaymentThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.payments.push(action.payload);
        })
        .addCase(createPaymentThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchPaymentsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPaymentsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.payments = action.payload;
        })
        .addCase(fetchPaymentsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default paymentSlice.reducer;