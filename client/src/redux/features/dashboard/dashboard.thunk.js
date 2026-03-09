import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";
import { handleAxiosError } from "../../../utils/handleErrors";

export const fetchDashboardDataThunk = createAsyncThunk(
    "dashboard/fecthData",
    async (_,thunkAPI)=>{
        try{
            const response=await api.get("/dashboard")
            return response.data.dashboardData;

        }
        catch(error){
            return handleAxiosError(error,thunkAPI)
        }

    }
)





