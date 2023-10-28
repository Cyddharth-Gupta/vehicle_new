import React, { useEffect } from "react";
import axios from "axios";

const DataHandler = ({ selectedFiles }) => {
  const passedStatus = [];

  const handlePostRequest = async (file) => {
    try {
      console.log("called");
      const res = await axios.post(
        "http://[::1]:3000/weighing-data",
        JSON.stringify(file),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.status);
      if (res.status === 200) {
        passedStatus.push("success");
      } else {
        passedStatus.push("failed");
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDataAndSubmit = () => {
    if (selectedFiles.length === 0) {
      return;
    }

    const uploadedFiles = [];
    const totalFiles = selectedFiles.length;

    selectedFiles.forEach((file) => {
      if (file.type === "application/json") {
        const reader = new FileReader();

        reader.onload = async (event) => {
          try {
            const jsonData = JSON.parse(event.target.result);

            // Process jsonData as needed
            console.log(jsonData);

            // Add the file to the uploaded files
            uploadedFiles.push({ file, data: jsonData });

            if (uploadedFiles.length === totalFiles) {
              // All JSON files have been processed
              // Call your API to submit the data
              console.log(uploadedFiles);
              await uploadedFiles[0]?.data.map((file) =>
                handlePostRequest(file)
              );
              console.log(passedStatus);
            }
          } catch (error) {
            console.error("Error parsing JSON file:", error);
          }
        };

        reader.readAsText(file);
      }
    });
  };

  // Function to parse a JSON file and return data as a Promise
  const parseJSONFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };

      reader.readAsText(file);
    });
  };

  // Use useEffect to trigger data handling when selectedFiles change
  useEffect(() => {
    if (selectedFiles.length > 0) {
      handleDataAndSubmit();
    }
  }, [selectedFiles]);

  return null;
};

export default DataHandler;
