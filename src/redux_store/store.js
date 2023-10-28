import {configureStore} from "@reduxjs/toolkit"
import {userInfoSlice} from "./slice/userInfoSlice.js"
import {zoneTrackerSlice} from "./slice/zoneTrackerSlice.js"
import {weightTrackerSlice} from "./slice/weightTrackerSlice.js"
import {userTrackerSlice} from "./slice/userTrackerSlice.js"
import {vehicleTrackerSlice} from "./slice/vehicleTrackerSlice.js"
import {reportSlice} from "./slice/reportSlice.js"
import {weightInfoSlice} from "./slice/weightInfoSlice.js"
import {recieptUrlSlice} from "./slice/recieptUrlSlice.js"

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
    zoneTracker: zoneTrackerSlice.reducer,
    weightTracker: weightTrackerSlice.reducer,
    userTracker: userTrackerSlice.reducer,
    vehicleTracker: vehicleTrackerSlice.reducer,
    report: reportSlice.reducer,
    weightInfo: weightInfoSlice.reducer,
    recieptUrl: recieptUrlSlice.reducer,
  },
});