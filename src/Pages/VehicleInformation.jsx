import React from "react";
import truck from "../assets/vehicleinformationtruck.svg";
import ReusableForm from "../Components/ReusableForm";
import { useForm } from "react-hook-form";
import NavigationDrawer from "../Components/NavigationDrawer";
import axios from "axios";
import Headers from "../Components/Headers";
import { toast } from "react-hot-toast";

const VehicleInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const formDataObject = {};
    formData.forEach((value, key) => {
      // Parse the value as a number if it's the 'tareWeight' field
      formDataObject[key] = key === "tareWeight" ? parseFloat(value) : value;
    });
    try {
      const res = await axios.post(
        "http://[::1]:3000/vehicles",
        JSON.stringify(formDataObject),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Form submitted successfully");
      const form = event.target;
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
      name: "rfidNumber",
      label: "RFID",
      type: "number",
      required: true,
      maxLength: 20,
    },
    {
      name: "vehicleNumber",
      label: "Vehicle Number",
      type: "string",
      required: true,
      maxLength: 20,
    },
    {
      name: "vehicleType",
      label: "Vehicle Type",
      type: "select",
      required: true,
      options: ["ALL", "LMV", "HMV"],
    },
    {
      name: "tareWeight",
      label: "Tare Weight",
      type: "number",
      required: true,
      maxLength: 20,
    },
  ];

  const customInputClass = "mx-14 mb-10";
  const customSelectClass = "mx-14 mb-10";
  const customLabelClass = "mx-14 ";
  const customButtonClass = "px-28 my-5";
  const customClass = "";
  return (
    <div className="flex flex-row">
      <NavigationDrawer />
      <div className="bg-[#F0F0F0] w-full min-h-screen flex flex-col">
        <Headers
          header="Vehicle Information"
          showBackButton={true}
          Linkbackto="/VehicleTracker"
        />

        <main className="flex flex-row justify-normal ">
          <img src={truck} alt="truck" className="-ml-70 h-auto w-auto" />
          <ReusableForm
            onSubmit={onSubmit}
            className="flex-row"
            fields={fields}
            errors={errors}
            submitButtonLabel={"Submit"}
            customInputClass={customInputClass}
            customLabelClass={customLabelClass}
            customButtonClass={customButtonClass}
            customSelectClass={customSelectClass}
            customClass={customClass}
          />
        </main>
      </div>
    </div>
  );
};

export default VehicleInformation;
