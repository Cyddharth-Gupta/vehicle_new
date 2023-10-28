import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Avatar from "@mui/material/Avatar";
import { fetchReport } from "../redux_store/slice/reportSlice";
import { reportData } from "../redux_store/slice/reportSlice";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    field: "employeeid",
    headerName: "Employee ID",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "username",
    headerName: "Username",
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
    field: "new",
    headerName: "New",
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
      return (
        <a href={cellValues.row.reciept} target="_blank" download="reciept.pdf">
          <FileDownloadOutlinedIcon style={{ color: "#6759FF" }} />
        </a>
      );
    },
  },
];

export default function DataTable() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchReport());
  }, []);

  const reports = useSelector(reportData) || [];

  const formatDateToDDMMYYYY = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const mappedData = reports.map((item) => ({
    id: item.userId,
    avatar: "",
    name: item?.user.username,
    zone: "west",
    employeeid: item?.user.employeeId,
    dob: formatDateToDDMMYYYY(new Date(item?.user.dateOfBirth)),
    new: "new",
    status: item?.user.status,
    actions: item?.user.actions,
    reciept: item?.reportUrl,
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
