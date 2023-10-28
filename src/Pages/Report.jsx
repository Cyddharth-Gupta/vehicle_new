import React, { useState } from "react";
import NavigationDrawer from "../Components/NavigationDrawer";
import ReportTable from "../Components/ReportTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import RequestReportModal from "./RequestReportModal"; 
import { Link } from "react-router-dom";

const Report = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRequestSubmit = () => {
    // Handle the report request submission logic here
    // You can send the request to the server or perform other actions
    // Close the modal after submitting
    closeModal();
  };

  return (
    <div className="flex flex-row">
      <NavigationDrawer />
      <div className="bg-[#F0F0F0] w-full h-full flex flex-col min-h-screen">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <button onClick={openModal}>
              <Link to ="/UserTracker">
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="lg:text-[2rem] md:text-[1.75rem] xl:text-[2.25rem] 2xl:text-[2.5rem] 3xl:text-[3rem] p-7p-7 font-medium mb-5 ml-3"
              />
              </Link>
            </button>
            <h1 className="lg:text-[2rem] md:text-[1.75rem] xl:text-[2.25rem] 2xl:text-[2.5rem] 3xl:text-[3rem] p-7">Report</h1>
          </div>
          <button
            className="items-end m-8 rounded-lg px-10 py-4 text-white bg-[#6759FF] hover:bg-[#5549CC]"
            onClick={openModal}
          >
            Request Report
          </button>
        </div>
        <ReportTable />
      </div>

      <RequestReportModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onRequestSubmit={handleRequestSubmit}
      />
    </div>
  );
};

export default Report;
