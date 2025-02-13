"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "./../../../Store/AppContext";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MeteorsDemo } from "../../../components/MeteorsDemoCard";


function JobDetailsId() {
  const { UserDetails, isLoading, setIsLoading } = useContext(AppContext);
  const [JobInformation, setJobInformation] = useState(null);

  const { JobId } = useParams();

  useEffect(() => {
    setIsLoading(true);

    async function FetchJobDetailsById(JobId) {
      try {
        if (!JobId) return;

        const response = await fetch(
          `https://nextjs-job-seeking-app.onrender.com/api/jobRoutes/FindJobByID/${JobId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();
        if (response.ok) {
          setJobInformation(result.message);
        } else {
          // Handle cases where the response is not OK (e.g., 404, 500)
          setJobInformation(null);
        }
      } catch (error) {
        console.log(error.message);
        setJobInformation(null);
      } finally {
        setIsLoading(false); // Ensure loading state is reset
      }
    }

    FetchJobDetailsById(JobId);
  }, [setIsLoading, JobId]); // Dependency array includes JobId

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen">
        {/* Left Side Loading Block */}
        <div className="flex-1 bg-gray-200 flex items-center justify-center">
          <div className="animate-pulse bg-gray-300 w-3/4 h-3/4 rounded-lg"></div>
        </div>

        {/* Right Side Section */}
        <div className="flex-1 bg-white flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">Loading...</h1>
          <p className="text-gray-500">
            Please wait while we load the content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {JobInformation ? (
        <div className="flex  items-center">
          <img
            className=" w-[40vw] h-[100vh] dark:hidden"
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />

          <MeteorsDemo
            UserDetails={UserDetails}
            CrrUserRole={UserDetails.Role}
            JobInformation={JobInformation}
          ></MeteorsDemo>
        </div>
      ) : (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative rounded-lg shadow bg-gray-700">
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-xl font-normal text-white">
                  The Job that You Are Looking For Is Not Found Or Deleted !! 😊
                </h3>
                <Link className="text-white" href="/">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default JobDetailsId;
