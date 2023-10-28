import React, { useState } from "react";
import NavigationDrawer from "../Components/NavigationDrawer";
import WeightTable from "../Components/WeightTable";
import Headers from "../Components/Headers";

const WeighingTracker = () => {
  return (
    <div className="flex flex-row">
      <NavigationDrawer />
      <div className="bg-[#F0F0F0] w-full h-full flex flex-col min-h-screen">
        <Headers
          header="Weighing Tracker"
          showAddButton={true}
          addWhat="Add New"
          addPage="/WeighingInformation"
          showBackButton={true}
          Linkbackto="/VehicleTracker"
          showImportButton={true}
        />

        <WeightTable />
      </div>
    </div>
  );
};

export default WeighingTracker;
