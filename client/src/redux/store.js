import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";
import categoryReducer from "./features/category/category.slice";
import courseReducer from "./features/course/course.slice";
import paymentReducer from "./features/payment/payment.slice";
import admissionFormReducer from "./features/admissionForm/admissionForm.slice";
import submittedApplicationReducer from "./features/submittedApplication/submittedApplication.slice";
import dashboardReducer from "./features/dashboard/dashboard.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    courses: courseReducer,
    payments: paymentReducer,
    admissionForm: admissionFormReducer,
    submittedApplication: submittedApplicationReducer,
    dashboard: dashboardReducer,
  },
});

