import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecieptUrl = createAsyncThunk(
  "recieptUrl/fetchRecieptUrl",
  async ({ fromDate, toDate, VehicleType }) => {
    try {
      const res = await axios.get("http://[::1]:3000/weighing-data?", {
        params: {
          filter: JSON.stringify({
            offset: 0,
            limit: 100,
            skip: 0,
            order: "createdAt desc",
            where: {
              and: [
                { createdAt: { gte: fromDate } },
                { createdAt: { lte: toDate } },
                { vehicleType: VehicleType },
              ],
            },
            include: [
              {
                relation: "vehicle",
                scope: {
                  offset: 0,
                  skip: 0,
                  order: "desc",
                  fields: {},
                  include: [],
                },
              },
              {
                relation: "user",
                scope: {
                  offset: 0,
                  skip: 0,
                  order: "desc",
                  fields: {},
                  include: [],
                },
              },
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
  }
);

const initialState = {
    loading: false,
    recieptUrlData: [],
    error: null,
};

export const recieptUrlSlice = createSlice({
    name: "recieptUrl",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRecieptUrl.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchRecieptUrl.fulfilled, (state, action) => {
            state.loading = false;
            state.recieptUrlData = action.payload;
        });
        builder.addCase(fetchRecieptUrl.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default recieptUrlSlice.reducer;
export const recieptUrlData = (state) => state.recieptUrl.recieptUrlData;
