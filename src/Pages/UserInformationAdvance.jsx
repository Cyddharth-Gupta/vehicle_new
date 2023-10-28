import React from "react";
import ReusableForm from "../Components/ReusableForm";
import glass from "../assets/vehicleinformationglass.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { userGeneralInfoData } from "../redux_store/slice/userTrackerSlice";
import { toast } from "react-hot-toast";

const UserInformationAdvance = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const userGeneralInfo = useSelector(userGeneralInfoData);
  console.log(userGeneralInfo);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    const mergedData = {
      ...userGeneralInfo,
      ...formDataObject,
    };
    console.log(mergedData);

    try {
      const res = await axios.post(
        "http://[::1]:3000/users",
        JSON.stringify(mergedData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const form = event.target;
      toast.success("Form submitted successfully");
      form.reset();
      console.log(res.data);
      return res.data;
    } catch (error) {
      toast.error("Form submission failed");
      console.log(error);
    }
  };

  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      required: true,
      maxLength: 20,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      maxLength: 50,
    },
  ];

  return (
      <main className="flex flex-row justify-center items-center">
        <img src={glass} alt={"magnifying glass"} className="w-auto h-auto" />
        <ReusableForm
          onSubmit={onSubmit}
          fields={fields}
          errors={errors}
          showCancel={true}
          submitButtonLabel={"Submit"}
          cancelLink={'/UserTracker'}
          onChange={props.changeTabprop}
        />
      </main>
  );
};

export default UserInformationAdvance;
