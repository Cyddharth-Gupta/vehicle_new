import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const logInUser = createAsyncThunk(
  "userInfo/logInUser",
  async (formData) => {
    try {
      //axios.defaults.headers.post["Content-Type"] = "application/json";
      console.log(formData);
      const form = {
        username: "aman123",
        password: "12345",
      }
      console.log(JSON.stringify(form));
      console.log(JSON.stringify(formData));
      const response = await axios.post(
        "http://[::1]:3000/users/login",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      toast.success("Login Successful");
      response.data && localStorage.setItem("userIdData", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      toast.error("Login Failed");
      console.log(error);
    }
  }
);

const initialState = {
  userInfoLoading: false,
  userData: [],
  userLoginData: [],
  loginStatus: false,
  error: null,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getUserLoginData: (state, action) => {
      state.userLoginData = action.payload;
    },
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(logInUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default userInfoSlice.reducer;
export const userInfoLoading = (state) => state.userInfo.userInfoLoading;
export const userData = (state) => state.userInfo.userData;
export const userLoginData = (state) => state.userInfo.userLoginData;
export const loginStatus = (state) => state.userInfo.loginStatus;
export const { getUserLoginData, setLoginStatus } = userInfoSlice.actions;
