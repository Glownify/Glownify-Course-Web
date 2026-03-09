import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardDataThunk } from "./dashboard.thunk";

const initialState={
    dashboardData:[],
    loadng:false,
    error:null
}

const dashboardSlice=createSlice({
    name:"dashboard",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchDashboardDataThunk.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchDashboardDataThunk.fulfilled,(state,action)=>{
            state.loading=false;
            state.dashboardData=action.payload;
        })
        .addCase(fetchDashboardDataThunk.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || "Failed to fetch dashboard data"; 
    });
}
})
export default dashboardSlice.reducer;