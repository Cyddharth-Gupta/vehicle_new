import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faCheck,
  faTimes,
  faSpinner,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import DataHandler from '../Components/DataHandler';
import Papa from "papaparse";
import axios from "axios";

const FileUploadModal = ({ isOpen, onRequestClose, handleFileUpload }) => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // New state for upload progress

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const clearUploadState = () => {
    setSelectedFiles([]);
    setUploadProgress(0);
    setUploadSuccess(false);
    setUploadFailed(false);
  };

 

  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...files, // Append the newly selected files
    ]);

    setUploadSuccess(false);
    setUploadFailed(false);

    if (files[0].type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        const jsonData = parseCSVToJSON(csvData);
        console.log(jsonData); // Do something with the parsed JSON data
        //jsonData && jsonData.map((file) => handlePostRequest(file));
      };
      reader.readAsText(files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event propagation to prevent duplication

    const newFiles = Array.from(e.dataTransfer.items)
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile());

    // Filter and validate the dropped files
    const validFiles = newFiles.filter((file) => {
      return file.type === "application/json" || file.type === "text/csv";
    });

    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...validFiles,
    ]);

    if (uploadSuccess) {
      // Reset the upload state
      setUploadSuccess(false);
      setUploadFailed(false);
      setUploadProgress(0);
    }

    validFiles.forEach((file) => {
      if (file.type === "text/csv") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const csvData = e.target.result;
          const jsonData = parseCSVToJSON(csvData);
          console.log(jsonData); // Do something with the parsed JSON data
        };
        reader.readAsText(file);
      }
    });
  };

  const parseCSVToJSON = (csvData) => {
    const result = Papa.parse(csvData, { header: true });
    return result.data;
  };

  const uploadFiles = () => {
    setUploading(true);
    setUploadFailed(false);
    setUploadSuccess(false);
    setUploadProgress(0); // Reset the upload progress

    const uploadedFiles = [];
    const totalFiles = selectedFiles.length;
    let completedFiles = 0;

    if (totalFiles === 0) {
      setUploading(false);
      return;
    }

    

    const uploadNextFile = () => {
      if (completedFiles === totalFiles) {
        // All files have been uploaded
        setUploading(false);
        setUploadSuccess(true);
        handleFileUpload(uploadedFiles);
      } else {
        const file = selectedFiles[completedFiles];
        console.log(file);

        // Simulate file processing here
        setTimeout(() => {
          // Update the progress after simulating file processing
          completedFiles++;
          const progress = (completedFiles / totalFiles) * 100;
          setUploadProgress(progress);

          // Add the file to the uploaded files
          uploadedFiles.push(file);

          // Upload the next file
          uploadNextFile();
        }, 1000); // Simulate processing for 1 second
      }
    };

    // Start the upload process
    uploadNextFile();
    console.log("start post request");
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 overflow-y-auto z-50 bg-black bg-opacity-50`}
    >
      <div
        className="flex items-center justify-center min-h-screen"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="bg-white w-[60rem] h-[35rem] overflow-y-scroll rounded-md shadow-md p-4 relative flex flex-col">
          <button
            onClick={() => {
              onRequestClose();
              clearUploadState(); // Clear upload state when the modal is closed
            }}
            className="text-gray-500 hover:text-gray-700 absolute top-4 right-4"
          >
            <FontAwesomeIcon icon={faTimes} className="mr-2" />
          </button>
          <div className="mb-4 flex flex-col justify-center items-center text-center flex-grow">
            <h2 className="text-2xl font-semibold">Select a file to upload</h2>
            <h3 className="text-red-400 mt-3">In JSON or CSV only</h3>
          </div>
          <div className="p-4 mb-4">
            <input
              type="file"
              accept=".json,.csv"
              ref={fileInputRef}
              onChange={handleFileSelection}
              multiple={true}
              className="hidden"
            />
            <button
              onClick={openFileInput}
              className="w-full py-2 px-4 bg-[#6759FF] text-white rounded-md"
            >
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              Choose Files
            </button>
          </div>
          <div className="border-dashed border-2 border-gray-300 p-4 mb-4 flex-grow">
            <div className="text-center mt-9 text-gray-500">
              Drag and drop files here
            </div>
          </div>
          <ul className="space-y-2 flex-grow">
            {selectedFiles.map((file) => (
              <li key={file.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {uploadFailed ? (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="text-red-500"
                    />
                  ) : uploading ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      style={{ color: "#6759FF" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-green-500"
                    />
                  )}
                  <span>{file.name}</span>
                </div>
              </li>
            ))}
          </ul>
          {uploading && !uploadFailed && !uploadSuccess && (
            <div className="mt-4">
              <div className="mb-2 text-center">
                Uploading... {uploadProgress.toFixed(2)}%
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-md">
                <div
                  className="h-2 bg-[#6759FF]"
                  style={{
                    width: `${uploadProgress}%`,
                  }}
                ></div>
              </div>
            </div>
          )}
          {uploadFailed && !uploadSuccess && (
            <div className="mt-4">
              <div className="mb-2 text-center text-red-500">Upload Failed</div>
            </div>
          )}
          {uploadSuccess && (
            <div className="mt-4">
              <div className="mb-2 text-center text-green-500">
                Uploaded Successfully
              </div>
            </div>
          )}
          <div className="flex items-center justify-end mt-4">
            {selectedFiles.length > 0 && !uploadSuccess && !uploading ? (
              <button
                onClick={uploadFiles}
                className="px-10 py-2 bg-[#6759FF] text-white rounded-md hover-bg-blue-600"
              >
                Confirm
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <DataHandler selectedFiles={selectedFiles} /> 
    </div>
  );
};

export default FileUploadModal;
