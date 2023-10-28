import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Avatar from "@mui/material/Avatar";
import { zoneTrackerData } from "../redux_store/slice/zoneTrackerSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchZoneTracker } from "../redux_store/slice/zoneTrackerSlice";

const columns = [
  {
    field: "managedby",
    headerName: "Managed By",
    renderCell: (params) => {
      console.log(params);
      return (
        <>
          <Avatar src={params.row.avatar} />
          <div className="ml-2"> {params.row.name} </div>
        </>
      );
    },
    flex: 1,
    headerAlign: "center",
    align: "left",
  },
  {
    field: "zone",
    headerName: "Zone",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "city",
    headerName: "City",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "state",
    headerName: "State",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return (
        <div
          className={
            params.value === "Inactive"
              ? "bg-red-200 text-red-800 rounded-3xl py-3 px-6"
              : "bg-green-200 text-green-800 rounded-3xl py-3 px-6"
          }
        >
          {params.value}
        </div>
      );
    },
  },
  // {
  //   field: "actions",
  //   headerName: "Actions",
  //   flex: 1,
  //   headerAlign: "center",
  //   align: "center",
  //   renderCell: (cellValues) => {
  //     return (
  //       <button>
  //         <BorderColorOutlinedIcon style={{ color: "#6759FF" }} />
  //       </button>
  //     );
  //   },
  // },
];

export default function ZoneTrackerTable() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchZoneTracker());
  }, []);

  const zoneTracker = useSelector(zoneTrackerData) || [];
  

  const mappedData = zoneTracker.map((item) => ({
    id: item.userId,
    avatar: "",
    name: item.user.fullName,
    zone: item.name,
    address: item.address,
    city: item.city,
    state: item.state,
    status: item.status,
    actions: "some actions",
  }));

  return (
    <div style={{ height: "100%" }} className="mx-20">
      <DataGrid
        rows={mappedData}
        rowHeight={80}
        fontSize= "105px"
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
}
