import React from "react";
import ReusableForm from "../Components/ReusableForm";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import axios from "axios";
import { fetchRecieptUrl } from "../redux_store/slice/recieptUrlSlice";
import { logInUser } from "../redux_store/slice/userInfoSlice";
import { userLoginData } from "../redux_store/slice/userInfoSlice";
import { userData } from "../redux_store/slice/userInfoSlice";
import { recieptUrlData } from "../redux_store/slice/recieptUrlSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const RequestReportModal = ({ isOpen, onRequestClose, onRequestSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const customInputClass = "w-full min-w-full my-4";
  const customSelectClass = "w-full min-w-full my-4";
  const customClass = "m-4";
  const customButtonClass = "flex ml-64 rounded-md";

  const [formDataObject, setFormDataObject] = React.useState({});

  const storedUserData = JSON.parse(localStorage.getItem("userIdData"));
  console.log(storedUserData);

  const dispatch = useDispatch();
  // const userLoggedInData = useSelector(userLoginData);
  // console.log(userLoggedInData);
  // const userIdData = useSelector(userData);
  // console.log(userIdData);

  // React.useEffect(() => {
  //   dispatch(logInUser(userLoggedInData));
  // }, []);

  const recieptUrl = useSelector(recieptUrlData);
  console.log(recieptUrl);
  const jsonString = JSON.stringify(recieptUrl);
  const base64String = btoa(jsonString);
  const prefixedBase64Data = "data:image/pdf;base64," + base64String;
  //console.log(base64String);

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

  const formatToDate = (inputDate) => {
    const parts = inputDate.split("-"); // Split the date into parts
    const month = parts[1];
    const day = parts[2];
    const year = parts[0];

    // Create a new Date object with time set to 23:59:59.999
    const dateObject = new Date(Date.UTC(year, month - 1, day));
    dateObject.setUTCHours(23, 59, 59, 999);
    const isoString = dateObject.toISOString();
    return isoString;
  };

  const ImageUpload = async (prefixedBase64Data, newFormDataObject) => {
    try {
      const res = await axios.post(
        "http://[::1]:3000/file/upload",
        JSON.stringify({
          fileName: newFormDataObject.reportName,
          fileType: "image",
          fileExtention: "png",
          fileData: prefixedBase64Data,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const postReport = async (newFormDataObject, data) => {
    const finalFormDataObject = {
      ...newFormDataObject,
      reportUrl: data?.fileUrl,
      userId: storedUserData?.data.userId,
    };
    console.log(finalFormDataObject);
    try {
      const res = await axios.post(
        "http://[::1]:3000/insight-reports",
        JSON.stringify(finalFormDataObject),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);
    const newFormDataObject = {
      ...formDataObject,
      fromDate: formatFromDate(formDataObject.fromDate),
      toDate: formatToDate(formDataObject.toDate),
    };

    //console.log(newFormDataObject);
    try {
      await dispatch(fetchRecieptUrl(newFormDataObject));
      const data = await ImageUpload(prefixedBase64Data, newFormDataObject);
      const res = await postReport(newFormDataObject, data);
      console.log(newFormDataObject);
      const form = event.target;
      toast.success("Form submitted successfully");
      form.reset();
      console.log(res.data);
    } catch (error) {
      toast.error("Form submission failed");
      console.log(error);
    }
  };

  const fields = [
    {
      name: "fromDate",
      label: "From Date",
      type: "date",
      required: true,
    },
    {
      name: "toDate",
      label: "To Date",
      type: "date",
      required: true,
    },
    {
      name: "reportName",
      label: "Report Name",
      type: "string",
      required: true,
    },
    {
      name: "vehicletype",
      label: "Vehicle Type",
      type: "select",
      required: true,
      options: ["", "ALL", "LMV", "HMV"],
    },
  ];

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
      <div className="relative w-lg mx-auto my-6">
        <div className="modal bg-white shadow-md rounded-lg w-[30rem]">
          <div className="modal-content p-4">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={onRequestClose}
            >
              <CloseIcon />
            </button>
            <h1 className="text-h1 p-3 mb-4">Request Report</h1>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-row items-center justify-center">
                <div>
                  <h2 className="mb-2">From</h2>
                  <DatePicker
                  value={formDataObject.fromDate}
                  onChange={(date) => setFormDataObject({ ...formDataObject, fromDate: date })}
                  />
                </div>
                <HorizontalRuleIcon className="mx-4 mt-5" /> 
                <div>
                  <h2 className="mb-2">To</h2>
                  <DatePicker
                  value={formDataObject.toDate}
                  onChange={(date) => setFormDataObject({ ...formDataObject, toDate: date })}
                />
                </div>
              </div>
            </LocalizationProvider> */}
            <ReusableForm
              fields={fields}
              errors={errors}
              onSubmit={onSubmit}
              customInputClass={customInputClass}
              submitButtonLabel={"Confirm"}
              customClass={customClass}
              customSelectClass={customSelectClass}
              customButtonClass={customButtonClass}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default RequestReportModal;
