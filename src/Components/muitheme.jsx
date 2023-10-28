import { createTheme } from "@mui/material/styles";

const muitheme = createTheme({
  palette: {
    primary: {
      main: "#6759FF",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: 16.5,
  },

  components: {
    MuiDataGrid: {
      styleOverrides: {
        columnHeader: {
          "@media (min-width:640px)": {
            fontSize: 10.5,
          },
          "@media (min-width:768px)": {
            fontSize: 13.5,
          },
          "@media (min-width:1700px)": {
            fontSize: 16.5,
          },
          "@media (min-width:2500px)": {
            fontSize: 22.5,
          },
          "@media (min-width:3500px)": {
            fontSize: 26.5,
          },
          "@media (min-width:4500px)": {
            fontSize: 30.5,
          },
        },
        cell: {
          "@media (min-width:640px)": {
            fontSize: 9.5,
          },
          "@media (min-width:768px)": {
            fontSize: 12.5,
          },
          "@media (min-width:1700px)": {
            fontSize: 15.5,
          },
          "@media (min-width:2500px)": {
            fontSize: 21.5,
          },
          "@media (min-width:3500px)": {
            fontSize: 25.5,
          },
          "@media (min-width:4500px)": {
            fontSize: 28.5,
          },
        },
      },
    },
    MuiSnackbar: {
      variants: [
        {
          props: { variant: "hey" },
          style: {
             "& .SnackbarItem-variantSuccess": {
              background: "white !important",
              color: "purple"
            },
          },
        },
        {
          props: { variant: "error" },
          style: {
            "& .MuiSnackbarContent-root": {
              background: "red",
            },
          },
        },
      ],
    },
  },
});

export default muitheme;
