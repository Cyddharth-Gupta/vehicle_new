import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { VehicleTrackerData } from "../redux_store/slice/vehicleTrackerSlice";
import { fetchVehicleTracker } from "../redux_store/slice/vehicleTrackerSlice";
import { useDispatch, useSelector } from "react-redux";

const VehicleTable = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchVehicleTracker());
  },[]);

  const vehicleTracker = useSelector(VehicleTrackerData) || [];

  const mappedData = vehicleTracker.map((item) => ({
    id: item.vehicleId,
    vehicleId: item.vehicleId,
    rfidNumber: item.rfidNumber,
    vehicleNumber: item.vehicleNumber,
    vehicleType: item.vehicleType,
    tareWeight: item.tareWeight,
  }));


  const columns = [
    // {
    //   field: "vehicleId",
    //   headerName: "Vehicle ID",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "left",
    //   type:"number",
    //   maxLength:"20",
    // },
    {
      field: "rfidNumber",
      headerName: "RFID Number",
      flex: 1,
      headerAlign: "center",
      align: "center",
      type:"number",
      maxLength:"20",
    },
    {
      field: "vehicleNumber",
      headerName: "Vehicle Number",
      flex: 1,
      headerAlign: "center",
      align: "center",
      type:"text",
      maxLength:"20",
    },
    {
      field: "vehicleType",
      headerName: "Vehicle Type",
      flex: 1,
      headerAlign: "center",
      align: "center",
      type:"text",
      maxLength:"20",
    },
    {
      field: "tareWeight",
      headerName: "Tare Weight",
      flex: 1,
      headerAlign: "center",
      align: "center",
      type:"number",
      maxLength:"20",
    },
 ];

  const rows = [
    {
      id:1,
      weighttype: "#3d7",
      vehicleno: 54,
      slipno: 71,
      weightdate: "6/13/2023",
      vehicletype: "CNY",
      supplier: "Finance",
      charges: 55,
      netweight: 91,
      measuretype: 2006,
      receipt: "Andalax",
    },
    {
        id:2,
        weighttype: "#3d7",
        vehicleno: 54,
        slipno: 71,
        weightdate: "6/13/2023",
        vehicletype: "CNY",
        supplier: "Finance",
        charges: 55,
        netweight: 91,
        measuretype: 2006,
        receipt: "Andalax",
      },
  ];

  return (
    <div style={{ height: "100%" }} className="mx-20 inter-font">
      <DataGrid
        rows={mappedData}
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

export default VehicleTable;
