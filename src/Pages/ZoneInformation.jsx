import React from "react";
import NavigationDrawer from "../Components/NavigationDrawer";
import TabsZoneInformation from "../Components/TabsZoneInformation";
import Headers from "../Components/Headers";

const ZoneInformation = () => {
  return (
    <div className="flex flex-row">
      <NavigationDrawer />
      <div className="bg-[#F0F0F0] w-full min-h-screen flex flex-col">
        <Headers
          header="Zone Information"
          showBackButton={true}
          Linkbackto="/ZoneTracker"
        />

        <main className="flex flex-row justify-normal">
          <TabsZoneInformation />
        </main>
      </div>
    </div>
  );
};

export default ZoneInformation;
