import React from "react";
import NavigationDawer from "../Components/NavigationDrawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import glass from "../assets/vehicleinformationglass.svg";
import ReusableForm from "../Components/ReusableForm";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userEditData } from "../redux_store/slice/userTrackerSlice";
import axios from "axios";
import Headers from "../Components/Headers";

const EditableUserInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const EditData = useSelector(userEditData);
  console.log(EditData);

  const [username, setUsername] = React.useState(EditData?.name || "");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState(EditData?.fullName || "");
  const [employeeId, setEmployeeId] = React.useState(
    EditData?.employeeId || ""
  );
  const [userType, setUserType] = React.useState(EditData?.EditData || "");
  const [dob, setDob] = React.useState(EditData?.dob || "");

  let newEditData = {};
  if (EditData && typeof EditData.userType === "string") {
    newEditData = {
      ...EditData,
      userType:
        EditData.userType.substring(0, 1).toUpperCase() +
        EditData.userType.substring(1).toLowerCase(),
    };
    console.log(newEditData);
  } else {
    console.error("EditData or userType is not a valid string.");
  }

  const changeDobFormat = (dob) => {
    console.log(dob);
    let parts = "";
    if (newEditData?.dob !== undefined) {
      parts = dob.split("/");
    }
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    const newDob = `${year}-${month}-${day}`;
    console.log(newDob);
    return newDob;
  };

  const formatFromDate = (inputDate) => {
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

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    const newFormDataObject = {
      ...formDataObject,
      userType: formDataObject.userType.toLowerCase(),
      dateOfBirth: formatFromDate(formDataObject.dateOfBirth),
    };

    console.log(formDataObject);
    console.log(newFormDataObject);

    try {
      const res = await axios.patch(
        `http://[::1]:3000/users/${newEditData?.id}`,
        JSON.stringify(newFormDataObject),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.status);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const fields = newEditData && [
    {
      name: "username",
      label: "Username",
      type: "text",
      required: true,
      maxLength: 20,
      defaultvalue: newEditData?.name,
      value: username,
      onChange: (e) => setUsername(e.target.value),
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      maxLength: 50,
    },
    {
      name: "fullName",
      label: "Name",
      type: "text",
      required: true,
      maxLength: 20,
      defaultvalue: newEditData?.fullName,
      value: fullName,
      onChange: (e) => setFullName(e.target.value),
    },
    {
      name: "employeeId",
      label: "Employee Id",
      type: "text",
      required: true,
      maxLength: 200,
      defaultvalue: newEditData?.employeeId,
      value: employeeId,
      onChange: (e) => setEmployeeId(e.target.value),
    },
    {
      name: "dateOfBirth",
      label: "Date Of Bitrh",
      type: "date",
      required: true,
      maxLength: 200,
      defaultValue: changeDobFormat(newEditData?.dob),
    },
    {
      name: "userType",
      label: "User Type",
      type: "select",
      required: true,
      options: ["", "Admin", "Employee"],
      defaultValue: newEditData?.userType,
    },
  ];

  return (
    <div className="flex flex-row">
      <NavigationDawer />
      <div className="bg-[#F0F0F0] w-full h-full flex flex-col min-h-screen">
        <Headers
          header="User Information"
          showBackButton={true}
          Linkbackto="/UserTracker"
        />
        <main className="flex flex-row justify-center items-center mt-36">
          <img src={glass} alt={"magnifying glass"} className="h-auto w-auto" />
          <ReusableForm
            onSubmit={onSubmit}
            fields={fields}
            errors={errors}
            showCancel={true}
            submitButtonLabel={"Confirm"}
            cancelLink={"/UserTracker"}
          />
        </main>
      </div>
    </div>
  );
};

export default EditableUserInformation;
