import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import FileUploadModal from "../Pages/FileUploadModal";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const Headers = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const backButtonClasses =
    "lg:text-[2rem] md:text-[1.75rem] xl:text-[2.25rem] 2xl:text-[2.5rem] 3xl-text-[3rem] p-7 font-medium mb-5 ml-3";

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    // Add your file upload logic here
    // You can access the selected file from event.target.files
  };
  return (
    <div className="flex flex-row justify-between bg-[#F0F0F0] w-full">
      <div className="flex flex-row">
        {props.showBackButton && (
          <button>
            <Link to={props.Linkbackto}>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className={backButtonClasses}
              />
            </Link>
          </button>
        )}
        <h1 className="lg:text-[2rem] md:text-[1.75rem] xl:text-[2.25rem] 2xl:text-[2.5rem] 3xl:text-[3rem] p-7 mb-5">
          {props.header}
        </h1>
      </div>
      <div className="flex flex-row">
        {props.showAddButton && (
          <Link to={props.addPage}>
            <button className="items-end m-8 mr-6 flex flex-row rounded-lg px-10 py-4 text-white bg-[#6759FF] hover:bg-[#5549CC]">
              <AddIcon className="mr-2" />
              {props.addWhat}
            </button>
          </Link>
        )}
        {props.showImportButton && (
          <button
            className="items-end m-8 flex flex-row rounded-lg px-10 py-4 text-white bg-[#6759FF] hover.bg-[#5549CC]"
            onClick={openModal}
          >
            <FileDownloadOutlinedIcon />
            <p className="mx-2"> Import </p>
          </button>
        )}
      </div>
      <FileUploadModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        handleFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default Headers;
