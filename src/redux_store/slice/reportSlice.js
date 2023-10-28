import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReport = createAsyncThunk("report/fetchReport", async () => {
  try {
    const res = await axios.get("http://[::1]:3000/insight-reports", {
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
});

const initialState = {
  loading: false,
  reportData: [],
  error: null,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReport.fulfilled, (state, action) => {
      state.loading = false;
      state.reportData = action.payload;
    });
    builder.addCase(fetchReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default reportSlice.reducer;
export const reportData = (state) => state.report.reportData;
