import React from "react";
import Headers from "../Components/Headers";
import NavigationDrawer from "../Components/NavigationDrawer";
import UserTrackerTable from "../Components/UserTrackerTable";

const UserTracker = () => {
  return (
    <div className="flex flex-row">
      <NavigationDrawer />
      <div className="bg-[#F0F0F0] w-full h-full flex flex-col min-h-screen">
        <Headers
          header="User Tracker"
          showAddButton={true}
          addWhat="Add User"
          addPage="/UserInformation"
          showBackButton={true}
          Linkbackto="/WeighingTracker"
        />

        <UserTrackerTable />
      </div>
    </div>
  );
};

export default UserTracker;
