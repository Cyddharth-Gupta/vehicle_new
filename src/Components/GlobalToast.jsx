import React from "react";
import { Toaster } from "react-hot-toast";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from '@mui/icons-material/Cancel';

const GlobalToast = ({ children }) => {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          success: {
            icon: <CheckCircleIcon sx={{ color: "#A57EF7" }} />,
            style: {
              color: "#10B981",
            },
          },
          error: {
            icon: <CancelIcon sx={{ color: "#A57EF7" }} />,
            style: {
              color: "#EF4444",
            },
          },
        }}
      />
      {children}
    </div>
  );
};

export default GlobalToast;
