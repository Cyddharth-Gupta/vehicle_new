import React, { useState } from "react";
import NavigationDrawer from "../Components/NavigationDrawer";
import VehicleTable from "../Components/VehicleTable";
import Headers from "../Components/Headers";

const VehicleTracker = () => {
  return (
    <div className="flex flex-row">
      <NavigationDrawer />
      <div className="bg-[#F0F0F0] w-full h-full flex flex-col min-h-screen">
        <Headers
          header="Vehicle Tracker"
          showAddButton={true}
          addWhat="Add New"
          addPage="/VehicleInformation"
          showBackButton={true}
          Linkbackto="/ZoneTracker"
          showImportButton={true}
        />

        <VehicleTable />
      </div>
    </div>
  );
};

export default VehicleTracker;
