import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchZoneTracker = createAsyncThunk(
  "zoneTracker/fetchZoneTracker",
  async () => {
    try {
      const res = await axios.get("http://[::1]:3000/zones", {
        params: {
          filter: JSON.stringify({
            offset: 0,
            limit: 100,
            skip: 0,
            order: "desc",
            include: [
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
    zoneTrackerData: [],
    zoneFormGeneralData: [],
    error: null,
};

export const zoneTrackerSlice = createSlice({
  name: "zoneTracker",
  initialState,
  reducers: {
    zoneFormGeneralDataInfo: (state, action) => {
      state.zoneFormGeneralData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchZoneTracker.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchZoneTracker.fulfilled, (state, action) => {
      state.loading = false;
      state.zoneTrackerData = action.payload;
    });
    builder.addCase(fetchZoneTracker.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default zoneTrackerSlice.reducer;
export const zoneTrackerData = (state) => state.zoneTracker.zoneTrackerData;
export const zoneFormGeneralData = (state) => state.zoneTracker.zoneFormGeneralData;
export const { zoneFormGeneralDataInfo } = zoneTrackerSlice.actions;