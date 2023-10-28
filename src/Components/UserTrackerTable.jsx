import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Avatar from "@mui/material/Avatar";
import { userGetEditData } from "../redux_store/slice/userTrackerSlice";
import { fetchUserTracker } from "../redux_store/slice/userTrackerSlice";
import { userTrackerData } from "../redux_store/slice/userTrackerSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function UserTrackerTable() {
  const dispatch = useDispatch();

  const columns = [
    {
      field: "employeeId",
      headerName: "Employee ID",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fullName",
      headerName: "Employee Name",
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
      field: "dob",
      headerName: "Date Of Birth",
      flex: 1,
      type: Date,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "zone",
      headerName: "Zone",
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
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        const handleEditClick = () => {
          dispatch(userGetEditData(cellValues?.row));
          console.log(cellValues);
        };
        return (
          <button onClick={handleEditClick}>
            <Link to="/EditableUserInformation">
              <BorderColorOutlinedIcon style={{ color: "#6759FF" }} />
            </Link>
          </button>
        );
      },
    },
  ];

  React.useEffect(() => {
    dispatch(fetchUserTracker());
  }, []);

  const userTracker = useSelector(userTrackerData) || [];
  console.log(userTracker);

  const formatDateToDDMMYYYY = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const mappedData = userTracker.map((item) => ({
    id: item.userId,
    avatar: "",
    fullName: item.fullName,
    userType: item.userType,
    name: item.username,
    zone: "West",
    employeeId: item.employeeId,
    dob: formatDateToDDMMYYYY(new Date(item.dateOfBirth)),
    status: item.status,
    actions: "some actions",
  }));

  return (
    <div style={{ height: "100%" }} className="mx-20">
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
}
