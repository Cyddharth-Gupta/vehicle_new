import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { fetchWeightTracker } from "../redux_store/slice/weightTrackerSlice";
import { weightTrackerData } from "../redux_store/slice/weightTrackerSlice";
import { useSelector, useDispatch } from "react-redux";
import { userData, userLoginData } from "../redux_store/slice/userInfoSlice";
import axios from "axios";

const WeightTable = () => {
  const columns = [
    {
      field: "weighttype",
      headerName: "Weight Type",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "vehicleno",
      headerName: "Vehicle No.",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "slipno",
      headerName: "Slip No.",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "weightdate",
      headerName: "Weight Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "vehicletype",
      headerName: "Vehicle Type",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "supplier",
      headerName: "Supplier",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "charges",
      headerName: "Charges",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "netweight",
      headerName: "Net Weight",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "measuretype",
      headerName: "Measure Type",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "receipt",
      headerName: "Receipt",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <a
            href={cellValues.row.receipt}
            target="_blank"
            download="reciept.pdf"
          >
            <ReceiptLongOutlinedIcon style={{ color: "#6759FF" }} />
          </a>
        );
      },
    },
  ];

  const dispatch = useDispatch();

  const user = useSelector(userData);
  console.log(user);
  //localStorage.setItem("userIdData", JSON.stringify(user));
  const userLoggedInData = useSelector(userLoginData);
  console.log(userLoggedInData);

  const storedUserData = JSON.parse(localStorage.getItem("userIdData"));

  console.log(storedUserData);
  console.log(storedUserData?.data?.userData?.userType);
  const weightData = useSelector(weightTrackerData) || [];

  React.useEffect(() => {
    //if (storedUserData && storedUserData?.data?.userData?.userType) {
    storedUserData?.data?.userData?.zone?.zoneId &&
      dispatch(
        fetchWeightTracker({
          zoneId: storedUserData?.data?.userData?.zone?.zoneId,
        })
      );
    //console.log("local storage", storedUserData);
    // }
  }, [storedUserData?.data?.userData?.zone?.zoneId]);
  console.log(storedUserData?.data?.userData?.zone?.zoneId);

  const formatDateToDDMMYYYY = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const weightMappedData = weightData.map((item) => ({
    id: item.weighingDataId,
    weighttype: item.weightType,
    vehicleno: item.vehicleNumber,
    slipno: item.slipNumber,
    weightdate: formatDateToDDMMYYYY(new Date(item.createdAt)),
    vehicletype: item.vehicleType,
    supplier: item.supplier,
    charges: item.charges,
    netweight: item.netWeight,
    measuretype: item.measureType,
    receipt: item.receiptUrl,
  }));

  return (
    <div style={{ height: "100%" }} className="mx-20">
      <DataGrid
        rows={weightMappedData}
        rowHeight={80}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{
          "&, [class^=MuiDataGrid]": { border: "none" },

          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "1px solid #967BB6",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      />
    </div>
  );
};

export default WeightTable;
