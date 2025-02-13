import React from "react";
import { Meteors } from "./ui/meteors";
import { Button } from "@/components/ui/button";
import FormHoverComponent from "./FormHoverComponent";
import DeletePopUpModel from "./DeletePopUpModel";

export function MeteorsDemo({ JobInformation, UserDetails, CrrUserRole }) {
  return (
    <div className="w-full h-full">
      <div className="w-[60vw] h-[100vh] relative">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 blur-3xl" />

        <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-10 h-full overflow-hidden flex flex-col justify-center items-start">
          {/* Job Information Section */}
          <h1 className="font-bold text-7xl text-white mb-4 z-50 break-words max-w-[100%] truncate">
            {JobInformation.JobTitle}
          </h1>

          <Button className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300">
            {JobInformation.JobCategory}
          </Button>

          {/* Job Location and Salary Information */}
          <div className="text-neutral-200 text-4xl mt-4 relative z-20 w-full max-w-full overflow-auto">
            <ul className="list-none flex justify-around h-[30vh] items-start flex-col mt-2 break-words">
              <li className="truncate">Job Location - {JobInformation.JobLocation}</li>
              <li className="truncate">Salary - ${JobInformation.fixedSalary}</li>
            </ul>
          </div>

          {/* Job Description Section */}
          <div className="text-neutral-300 break-words max-w-[40vw] flex flex-col mt-4 relative z-20 text-3xl overflow-auto">
            <p>Job Description</p>
            <p className="truncate">{JobInformation.JobDescription}</p>
          </div>

          {/* Company Name Section */}
          <div className="text-neutral-300 break-words max-w-[40vw] flex flex-col mt-16 relative z-20 text-3xl overflow-auto">
            <p>Company Name</p>
            <p className="truncate">{JobInformation.Job_Company_Name?.toUpperCase()}</p>
          </div>

          {/* Meteor Effect */}
          <Meteors number={100} />

          {/* Conditional Buttons Based on User Role */}
          {CrrUserRole === "job seeker" && (
            <Button
              className="absolute top-[88vh] text-lg left-[45vw]"
              size="lg"
              variant="destructive"
            >
              <FormHoverComponent CrrJobId={JobInformation._id} />
            </Button>
          )}

          {JobInformation.postedBy === UserDetails.id &&
            CrrUserRole !== "job seeker" && (
              <Button
                className="absolute top-[88vh] text-lg left-[45vw]"
                size="lg"
                variant="destructive"
              >
                <DeletePopUpModel CrrJobId={JobInformation._id} />
              </Button>
            )}
        </div>
      </div>
    </div>
  );
}
