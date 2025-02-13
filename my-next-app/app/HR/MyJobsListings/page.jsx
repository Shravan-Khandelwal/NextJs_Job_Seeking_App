"use client";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./../../../Store/AppContext";
import { AnimatedPinDemo } from "./../../../components/3D_CardComponent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoadingSkeletonCard from "./../../../components/LoadingSkeletonCard";

function MyJobsListings() {
  const { HR_JobsListings } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <div className="flex flex-col container  items-center">
      {isLoading == true ? (
        <div className="flex justify-center h-full flex-wrap item-center gap-5">
          <LoadingSkeletonCard></LoadingSkeletonCard>
          <LoadingSkeletonCard></LoadingSkeletonCard>
          <LoadingSkeletonCard></LoadingSkeletonCard>
          <LoadingSkeletonCard></LoadingSkeletonCard>
          <LoadingSkeletonCard></LoadingSkeletonCard>
          <LoadingSkeletonCard></LoadingSkeletonCard>
          <LoadingSkeletonCard></LoadingSkeletonCard>
          <LoadingSkeletonCard></LoadingSkeletonCard>
        </div>
      ) : HR_JobsListings.length != 0 ? (
        <>
          <p className="text-6xl py-7"> MyJobsListings</p>
          <p className="text-5xl"> Jobs Posted By You Are Here As Follows</p>
          <div className="div h-fit items-center justify-center flex flex-row flex-wrap ">
            {HR_JobsListings?.map((Job) => (
              <AnimatedPinDemo
                CompanyName={Job.Job_Company_Name}
                JobTitle={Job.JobTitle}
                JobCategory={Job.JobCategory}
                key={Job._id}
                JobId={Job._id}
              ></AnimatedPinDemo>
            ))}
          </div>
        </>
      ) : (
        <div>
          <div className="text-5xl  h-[100vh] flex-col container justify-center flex  p-5 items-center gap-5 text-blue-500">
            {" "}
            <p>
              {" "}
              You Have Not Created A Job Opeaning Position For Candidates !!{" "}
            </p>
            <Button className="w-[40vw] bg-black rounded-xl shadow-xl item-center justify-center text-3xl px-3 py-6">
              <Link href="/HR/PostJobs">
                <span className="text-blue-500 "> Post A Job</span>
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyJobsListings;
