import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeightTracker = createAsyncThunk(
  "weightTracker/fetchWeightTracker",
  async ({zoneId}) => {
    try {
      //console.log(employeeType);
      const res = await axios.get("http://[::1]:3000/weighing-data", {
        params: {
          filter: JSON.stringify({
            offset: 0,
            limit: 100,
            skip: 0,
            order: "desc",
            where: {
              zoneId: zoneId,
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
  weightTrackerloading: false,
  weightTrackerData: [],
  error: null,
};

export const weightTrackerSlice = createSlice({
  name: "weightTracker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeightTracker.pending, (state) => {
      state.weightTrackerloading = true;
    });
    builder.addCase(fetchWeightTracker.fulfilled, (state, action) => {
      state.weightTrackerloading = false;
      state.weightTrackerData = action.payload;
    });
    builder.addCase(fetchWeightTracker.rejected, (state, action) => {
      state.weightTrackerloading = false;
      state.error = action.error.message;
    });
  },
});

export default weightTrackerSlice.reducer;
export const weightTrackerData = (state) =>
  state.weightTracker.weightTrackerData;
export const weightTrackerLoading = (state) => state.weightTracker.loading;
