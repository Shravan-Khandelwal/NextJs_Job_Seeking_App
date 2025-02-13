"use client";
import React, { useContext, useEffect } from "react";
import { AppContext } from "./../../../Store/AppContext";
import JobApplication from "./../../../components/JobApplication";

function ApplicationsRecived() {
  const {
    JobApplications,
    NewJobApplication,
    setListOfJobApplications,
    ListOfJobApplications,
  } = useContext(AppContext);

  console.log("APPS ARE ");

  console.log(ListOfJobApplications);

  useEffect(() => {
    async function FetchJobApplications() {
      console.log("CALLED FUNC");
      console.log(NewJobApplication);

      try {
        const response = await fetch(
          "https://nextjs-job-seeking-app-g4py.onrender.com/api/applicationRoutes/JobManagerGetAllJobApplications",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();

        if (response.ok) {
          setListOfJobApplications(result.allApplication);
    
        } else if (result.message == "No Application Found for this Manager") {
          setListOfJobApplications([]);
        }
      } catch (e) {
        toast.error(e.message);
      }
    }
    FetchJobApplications();
  }, [NewJobApplication, JobApplications]);

  return (
    <section className="bg-white dark:bg-gray-900">
      {ListOfJobApplications?.length > 0 ? (
        <JobApplication
          ListOfJobApplications={ListOfJobApplications}
        ></JobApplication>
      ) : (
        <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
            No Applications Found
          </p>
        </section>
      )}
    </section>
  );
}

export default ApplicationsRecived;
