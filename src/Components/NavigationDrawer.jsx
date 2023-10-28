import avatar from "../assets/avatar.jpg";
import React from "react";
import Button from "./Button";
import {
  faLocationDot,
  faTruck,
  faCircleExclamation,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { userData } from "../redux_store/slice/userInfoSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setLoginStatus } from "../redux_store/slice/userInfoSlice";

const NavigationDrawer = () => {
  const user = useSelector(userData);
  console.log(user);
  const dispatch = useDispatch();
  //localStorage.setItem("userIdData", JSON.stringify(user));
  const storedUserData = JSON.parse(localStorage.getItem("userIdData"));

  const handleLogOut = async () => {
    try {
      dispatch(setLoginStatus(false));
      console.log(JSON.stringify({ userId: storedUserData?.data?.userData?.userId}));
      const res = await axios.post(
        "http://[::1]:3000/users/logout",
        JSON.stringify({ userId: storedUserData?.data?.userData?.userId }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.clear();
      window.close();

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[21%] 3xl:w-[15%] min-h-full flex flex-col flex-shrink -mt-6 p-6 z-10 bg-white ">
      <div className="flex  flex-col lg:flex-row h-1/5 items-center">
        <img
          src={avatar}
          alt="avatar"
          className="w-20 h-20 rounded-full m-3 ml-1"
        />
        <span>
          <h4>{storedUserData?.data?.userData?.fullName}</h4>
          <p className="text-xs lg:text-md xl:text-xl 2xl:text-[1.7rem] 3xl:text-[2rem]">useremail@gmail.com</p>
        </span>
      </div>

      <div className="w-full flex flex-col items-start xl:text-2xl 2xl:text-[1.7rem] 3xl:text-[2rem]">
        <Button to="/ZoneTracker" icon={faLocationDot}>
          Zone Tracker
        </Button>

        <Button to="/VehicleTracker" icon={faTruck}>
          Vehicle Tracker
        </Button>
        <Button to="/WeighingTracker" icon={faTruck}>
          Weighing Tracker
        </Button>
        <Button to="/UserTracker" icon={faUser}>
          User Tracker
        </Button>

        <Button to="/Report" icon={faCircleExclamation}>
          Report
        </Button>

        <Button
          icon={faArrowRightFromBracket}
          className="text-red-600"
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default NavigationDrawer;
