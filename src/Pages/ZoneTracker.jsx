import React from "react";
import NavigationDrawer from "../Components/NavigationDrawer";
import ZoneTrackerTable from "../Components/ZoneTrackerTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddIcon from "@mui/icons-material/Add";
import Headers from "../Components/Headers";
import { Link } from "react-router-dom";

const ZoneTracker = () => {
  return (
    <div className="flex flex-row">
      <NavigationDrawer />
      <div className="bg-[#F0F0F0] w-full h-full flex flex-col min-h-screen">
        <Headers
          header="Zone Tracker"
          showAddButton={true}
          addWhat="Add Zone"
          addPage="/ZoneInformation"
        />

        <ZoneTrackerTable />
      </div>
    </div>
  );
};

export default ZoneTracker;
