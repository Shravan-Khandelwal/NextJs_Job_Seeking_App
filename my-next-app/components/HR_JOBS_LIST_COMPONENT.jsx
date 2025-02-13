"use client";
import React, { useContext } from "react";
import { AnimatedPinDemo } from "./3D_CardComponent";
import { AppContext } from "./../Store/AppContext";

function HR_JOBS_LIST_COMPONENT() {
  const { HR_JobsListings } = useContext(AppContext);

  console.log("JOB LISTING ARE ");
  
  console.log(HR_JobsListings.length);

  return (
    <div className="flex h-fit flex-col containerjustify-center items-center text-center">
      <p className="text-6xl py-7"> MyJobsListings</p>
      {HR_JobsListings.length != 0 ? (
        <>
          <p className="text-5xl"> Jobs Posted By You Are Here As Follows</p>
          <div className="div h-fit items-center justify-center flex flex-row flex-wrap ">
            {HR_JobsListings?.map((Job) => (
              <AnimatedPinDemo
                JobTitle={Job.JobTitle}
                JobCategory={Job.JobCategory}
                key={Job._id}
                JobId={Job._id}
              ></AnimatedPinDemo>
            ))}
          </div>
        </>
      ) : (
        <p className="text-5xl">
          {" "}
          You Have Not Created A Job Opeaning Position For Candidates !!
        </p>
      )}
    </div>
  );
}

export default HR_JOBS_LIST_COMPONENT;
