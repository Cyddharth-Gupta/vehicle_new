import React from "react";
import ReusableForm from "../Components/ReusableForm";
import { useForm } from "react-hook-form";
import Headers from "../Components/Headers";
import NavigationDrawer from "../Components/NavigationDrawer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeightInfo } from "../redux_store/slice/weightInfoSlice";
import { WeightInfoData } from "../redux_store/slice/weightInfoSlice";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const WeighingInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const storedUserData = JSON.parse(localStorage.getItem("userIdData"));

  const [grossWeight, setGrossWeight] = React.useState(null);

  React.useEffect(() => {
    // Connect to the Socket.io server
    const socket = io("http://localhost:3001"); // Replace with your server's host

    // Listen for the "weighing-bridge-data" event
    socket.on("weighing-bridge-data", (receivedData) => {
      setGrossWeight(receivedData.data);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // The e

  console.log(grossWeight);

  React.useEffect(() => {
    dispatch(
      fetchWeightInfo({
        userId: storedUserData?.data?.userData?.userId,
        employeeType: storedUserData?.data?.userData?.employeeType,
      })
    );
    console.log("called2");
  }, []);

  const weightInfo = useSelector(WeightInfoData);
  //console.log(weightInfo);

  //console.log(weightInfo?.zone?.zoneId);

  const [tareWeight, setTareWeight] = React.useState("");

  const onVehicleIdChange = async (event) => {
    const { value } = event.target;
    // Get the value entered in the vehicleId field

    console.log(value);
    // Call the API to fetch tareWeight based on the entered vehicleId
    try {
      const response = await axios.get(`http://[::1]:3000/vehicles/${value}`);

      if (response.status === 200) {
        // If the response is successful, set the tareWeight state
        const apiData = response.data;
        setTareWeight(apiData.tareWeight);
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };
  console.log(tareWeight);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const formDataObject = {};
    formData.forEach((value, key) => {
      if (
        key === "charges" ||
        key === "grossWeight" ||
        key === "tareWeight" ||
        key === "netWeight"
      ) {
        formDataObject[key] = parseFloat(value);
      } else {
        formDataObject[key] = value;
      }
    });

    const newFormDataObject = {
      ...formDataObject,
      userId: weightInfo[0]?.userId,
      zoneId: weightInfo[0]?.zone?.zoneId,
      zoneName: weightInfo[0]?.zone?.name,
      employeeName: weightInfo[0]?.fullName,
      city: weightInfo[0]?.zone.city,
      state: weightInfo[0]?.zone.state,
      address: weightInfo[0]?.zone.address,
    };

    console.log(newFormDataObject);
    try {
      const res = await axios.post(
        "http://[::1]:3000/weighing-data",
        JSON.stringify(newFormDataObject),
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
      name: "rfidNumber",
      label: "RFID Number",
      type: "number",
      required: true,
      maxLength: 20,
    },
    {
      name: "vehicleNumber",
      label: "Vehicle Number",
      type: "text",
      required: true,
      maxLength: 50,
    },
    {
      name: "slipNumber",
      label: "Slip Number",
      type: "text",
      required: true,
      maxLength: 20,
    },
    {
      name: "charges",
      label: "Charges",
      type: "number",
      required: true,
      maxLength: 50,
    },
    {
      name: "supplier",
      label: "Supplier",
      type: "text",
      required: true,
      maxLength: 20,
    },
    {
      name: "measureType",
      label: "Measure Type",
      type: "text",
      required: true,
      maxLength: 50,
    },
    {
      name: "weightType",
      label: "Weight Type",
      type: "text",
      required: true,
      maxLength: 20,
    },
    {
      name: "grossWeight",
      label: "Gross Weight",
      type: "number",
      required: true,
      maxLength: 20,
      readOnly: true,
    },
    {
      name: "tareWeight",
      label: "Tare Weight",
      type: "number",
      required: true,
      maxLength: 50,
      value: tareWeight,
      readOnly: true,
    },
    {
      name: "netWeight",
      label: "Net Weight",
      type: "number",
      required: true,
      maxLength: 20,
      readOnly: true,
    },
    {
      name: "vehicleType",
      label: "Vehicle Type",
      type: "select",
      required: true,
      options: ["", "ALL", "LMV", "HMV"],
    },
    {
      name: "material",
      label: "Material",
      type: "text",
      required: true,
      maxLength: 20,
    },
    {
      name: "vehicleId",
      label: "Vehicle ID",
      type: "text",
      required: true,
      maxLength: 50,
      onChange: onVehicleIdChange,
    },
  ];

  const customClass = "grid w-2/3 grid-cols-2 gap-4 mx-5 ";
  const customInputClass = "mx-14";
  const customLabelClass = "mx-14";
  const customSelectClass = "mx-14";
  const customButtonClass = "px-16 my-5";
  return (
      <div className="flex flex-row">
        <NavigationDrawer />
        <div className="bg-[#F0F0F0] w-full h-full min-h-screen flex flex-col">
          <Headers
            header="Weighing Information"
            showBackButton={true}
            Linkbackto="/WeighingTracker"
          />

          <main className="flex flex-row justify-normal ">
            <ReusableForm
              onSubmit={onSubmit}
              className="flex-row"
              fields={fields}
              errors={errors}
              submitButtonLabel={"Submit"}
              customClass={customClass}
              customInputClass={customInputClass}
              customLabelClass={customLabelClass}
              customButtonClass={customButtonClass}
              customSelectClass={customSelectClass}
              cancelLink={"/WeighingTracker"}
              showCancel={true}
            />
            <div className="bg-white shadow-lg rounded-md p-6 h-1/2 text-center items-center w-[32rem] mr-6 ml-4 mt-20">
              <button className=" text-white bg-[#6759FF] hover:bg-[#5549CC] py-2 px-24 w-full">
                Scan RFID Card
              </button>
              <div className=" my-3 rounded-md px-16 py-6 text-[#6759FF] border border-[#6759FF] hover:bg-gray-200">
                Scan RFID Card
                <p className="text-black">ID : #t86382bjhbjh</p>
              </div>
              <div className="bg-slate-200 flex flex-row items-center justify-center px-16 py-4">
                <p>Weight:</p>
                <p className="text-[#6759FF] ml-2">6770Kg</p>
              </div>
              <div className="w-full my-3">
                {/* <img src={RFIDtruck} className="my-3 w-full" /> */}
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/IVacpDtUyDk?si=qtIlcVkcsEfNLlWQ"
                  allowFullScreen
                  title="YouTube Video"
                ></iframe>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
};

export default WeighingInformation;
