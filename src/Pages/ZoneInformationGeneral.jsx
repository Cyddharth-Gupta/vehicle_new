import React from "react";
import ReusableForm from "../Components/ReusableForm";
import informationTruck from "../assets/zone_information_truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { fetchUserTracker } from "../redux_store/slice/userTrackerSlice";
import { zoneFormGeneralDataInfo } from "../redux_store/slice/zoneTrackerSlice";
import { useDispatch, useSelector } from "react-redux";
import { userTrackerData } from "../redux_store/slice/userTrackerSlice";

const ZoneInformationGeneral = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUserTracker());
  }, []);

  const users = useSelector(userTrackerData) || [];
  console.log(users);
  const storedUserData = JSON.parse(localStorage.getItem("userIdData"));
  console.log(storedUserData);

  const optionsList = users.map((item) => [
    `${item.fullName} - ${item.employeeId}`,
    item.userId,
  ]);

  const fetchUserId = (fullname) => {
    const userId = optionsList.find((item) => item[0] === fullname)[1];
    return userId;
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
      userId: fetchUserId(formDataObject.managedBy),
    };

    delete newFormDataObject.managedBy;

    dispatch(zoneFormGeneralDataInfo(newFormDataObject));
    console.log(newFormDataObject);
    const form = event.target;
    form.reset();
    props.changeTabprop(1);
  };

  const fields = [
    {
      name: "name",
      label: "Zone Name",
      type: "text",
      required: true,
      maxLength: 20,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      required: true,
      maxLength: 50,
    },
    {
      name: "city",
      label: "City",
      type: "text",
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    {
      name: "state",
      label: "State",
      type: "text",
      required: true,
      maxLength: 20,
    },
    {
      name: "managedBy",
      label: "Managed By",
      type: "select",
      required: true,
      options: optionsList.map((item) => item[0]),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: ["", "Active", "Inactive"],
    },
  ];

  const customInputClass = "w-96";
  const customButtonClass = "m-3";
  return (
    <main className="flex flex-row justify-normal">
      <img src={informationTruck} alt={"truck"} className="h-auto w-auto" />
      <ReusableForm
        onSubmit={onSubmit}
        fields={fields}
        errors={errors}
        showCancel={true}
        submitButtonLabel={"Proceed"}
        customInputClass={customInputClass}
        customButtonClass={customButtonClass}
        optionsList={optionsList}
        cancelLink={"/ZoneTracker"}
        //onChange = {props.changeTabprop}
      />
    </main>
  );
};

export default ZoneInformationGeneral;
