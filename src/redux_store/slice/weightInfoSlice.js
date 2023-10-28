import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeightInfo = createAsyncThunk("weightInfo/fetchWeightInfo", async ({userId, employeType}) => {
    try {
       const res = await axios.get("http://[::1]:3000/users", {
         params: {
           filter: JSON.stringify({
             offset: 0,
             limit: 10,
             skip: 0,
             order: "createdAt desc",
             where: {
               userType: employeType,
               userId: userId,
             },
             include: [
               {
                 relation: "zone",
                 scope: {
                   offset: 0,
                   skip: 0,
                   order: "desc",
                   fields: {},
                   include: [],
                 },
               },
             ],
           }),
         },
       }); 
       return res.data;
    } catch (error) {
        console.log(error);
    }
});

const initialState ={
    loading: false,
    weightInfoData: [],
    error: null,
};


export const weightInfoSlice = createSlice({
    name: "weightInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeightInfo.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchWeightInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.weightInfoData = action.payload;
        });
        builder.addCase(fetchWeightInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default weightInfoSlice.reducer;
export const WeightInfoData = (state) => state.weightInfo.weightInfoData;