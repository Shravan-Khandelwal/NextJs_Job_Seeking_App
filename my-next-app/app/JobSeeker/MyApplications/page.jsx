"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppContext } from "./../../../Store/AppContext";

const MyApplications = () => {
  const { JobsAppliedTo } = useContext(AppContext);
  const [jobDetails, setJobDetails] = useState({}); // State to hold job details


  // Function to fetch job details for a specific JobId
  const fetchJobDetails = async (jobId) => {
    try {
      const response = await fetch(
        `https://nextjs-job-seeking-app-g4py.onrender.com/api/jobRoutes/FindJobByID/${jobId}`,
        {
          method: "GET",
          credentials: "include",
        }
      ); // Replace with your actual API endpoint
      console.log(response);

      if (response.ok) {
        const data = await response.json(); // Parse JSON response
        return data;
      } else {
        console.error(`Failed to fetch job details for JobId: ${jobId}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching job details for JobId: ${jobId}`, error);
      return null;
    }
  };

  // Fetch all job details on mount
  useEffect(() => {
    const fetchAllJobDetails = async () => {
      const details = {};
      for (const application of JobsAppliedTo) {
        const jobDetail = await fetchJobDetails(application.JobId); // Fetch details for each JobId
        if (jobDetail) {
          details[application.JobId] = jobDetail; // Store fetched details in the object
        }
      }
      setJobDetails(details); // Update state with fetched details
    };

    if (JobsAppliedTo?.length > 0) {
      fetchAllJobDetails(); // Trigger fetching if there are applications
    }
  }, [JobsAppliedTo]);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
    {/* Page Heading */}
    <motion.h1
      className="text-4xl font-bold text-center mb-10 text-blue-600"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {JobsAppliedTo?.length > 0
        ? "My Applications"
        : "Oops! 🕵️‍♂️ No Applications Found"}
    </motion.h1>
  
    {/* Container for Cards */}
    <div className="grid gap-6 hover:cursor-pointer md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
      {JobsAppliedTo?.length > 0
        ? JobsAppliedTo.map((application, index) => (
            <motion.div
              key={application._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Header Section */}
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {application.Name.toUpperCase()}
                </h2>
                <p className="text-lg font-normal text-gray-600">
                  {jobDetails[application?.JobId]?.message?.JobTitle ||
                    "Loading Role..."}
                </p>
              </div>
  
              {/* Job Details Section */}
              <div className="space-y-2">
                {/* Location */}
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600">Location:</span>
                  <span className="font-semibold text-gray-800">
                    {jobDetails[application?.JobId]?.message?.JobLocation ||
                      "Loading Location..."}
                  </span>
                </div>
  
                {/* Salary */}
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600">Salary:</span>
                  <span className="font-semibold text-gray-800">
                   $ {jobDetails[application?.JobId]?.message?.fixedSalary ||
                      "Loading Salary..."}
                  </span>
                </div>
  
                {/* Status */}
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600">Status:</span>
                  <span
                    className={`font-semibold text-lg ${
                      application.ApplicationResult === "Selected"
                        ? "text-green-600"
                        : application.ApplicationResult === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {application.ApplicationResult}
                  </span>
                </div>
              </div>
  
    
            </motion.div>
          ))
        : null}
    </div>
  </div>
  
  );
};

export default MyApplications;
