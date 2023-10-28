import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ZoneInformation from "./Pages/ZoneInformation";
import { SnackbarProvider, SnackbarContent } from "notistack";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import WeighingInformation from "./Pages/WeighingInformation";
import UserTracker from "./Pages/UserTracker";
import VehicleInformation from "./Pages/VehicleInformation";
import Report from "./Pages/Report";
import LoginPage from "./Pages/LoginPage";
import ZoneTracker from "./Pages/ZoneTracker";
import UserInformation from "./Pages/UserInformation";
import WeighingTracker from "./Pages/WeighingTracker";
import VehicleTracker from "./Pages/VehicleTracker";
import { Provider } from "react-redux";
import { store } from "./redux_store/store";
import EditableUserInformation from "./Pages/EditableUserInformation";
import muitheme from "./Components/muitheme";
import { ThemeProvider } from "@emotion/react";
import GlobalToast from "./Components/GlobalToast";
import './index.css'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ZoneTracker",
    element: <ZoneTracker />,
  },
  {
    path: "/WeighingTracker",
    element: <WeighingTracker />,
  },
  {
    path: "/ZoneInformation",
    element: <ZoneInformation />,
  },
  {
    path: "/UserInformation",
    element: <UserInformation />,
  },
  {
    path: "/VehicleTracker",
    element: <VehicleTracker />,
  },
  {
    path: "/EditableUserInformation",
    element: <EditableUserInformation />,
  },
  {
    path: "/UserTracker",
    element: <UserTracker />,
  },
  {
    path: "/Report",
    element: <Report />,
  },
  {
    path: "/VehicleInformation",
    element: <VehicleInformation />,
  },
  {
    path: "/WeighingInformation",
    element: <WeighingInformation />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={muitheme}>
        <GlobalToast>
          <RouterProvider router={router} />
        </GlobalToast>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
