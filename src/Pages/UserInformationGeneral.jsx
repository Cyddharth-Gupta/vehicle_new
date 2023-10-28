import React from "react";
import ReusableForm from "../Components/ReusableForm";
import glass from "../assets/vehicleinformationglass.svg";
import { useForm } from "react-hook-form";
import { userGeneralInfo } from "../redux_store/slice/userTrackerSlice";
import { useDispatch } from "react-redux";

const UserInformationGeneral = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();

  const formatDate = (inputDate) => {
    const parts = inputDate.split("-"); // Split the date into parts
    const month = parts[1];
    const day = parts[2];
    const year = parts[0];

    // Create a new Date object with time set to 00:00:00.000
    const dateObject = new Date(Date.UTC(year, month - 1, day));
    const isoString = dateObject.toISOString();
    return isoString;
  };

  const onSubmit = async (event) => {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log("hey")

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    const newFormDataObject = {
      ...formDataObject,
      dateOfBirth: formatDate(formDataObject.dateOfBirth),
    }
    dispatch(userGeneralInfo(newFormDataObject));
    console.log(newFormDataObject);
    const form = event.target;
    form.reset();
    props.changeTabprop(1);
  };

  const fields = [
    {
      name: "fullName",
      label: "Name",
      type: "text",
      required: true,
      maxLength: 20,
    },
    {
      name: "employeeId",
      label: "Employee Id",
      type: "text",
      required: true,
      maxLength: 200,
    },
    {
      name: "dateOfBirth",
      label: "Date Of Bitrh",
      type: "date",
      required: true,
      maxLength: 200,
    },
    {
      name: "userType",
      label: "User Type",
      type: "select",
      required: true,
      options: ["", "Admin", "Employee"],
    },
  ];

  return (
    <main className="flex flex-row justify-center items-center ">
      <img src={glass} alt={"magnifying glass"} className="h-auto w-auto"/>
      <ReusableForm
        onSubmit={onSubmit}
        fields={fields}
        errors={errors}
        showCancel={true}
        submitButtonLabel={"Proceed"}
        cancelLink={'/UserTracker'}
        //onChange = {props.changeTabprop}
      />
    </main>
  );
};

export default UserInformationGeneral;
