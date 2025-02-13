"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { CardDemo } from "./../../components/CardComponent";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "./../../Store/AppContext";

export default function Page() {
  const {
    AllJobs,
    SearchJobValues,
    setSearchJobValues,
    setSearchJobText,
    SearchJobText,
    SearchJobs,
    FilteredJobCategory,
    IsFilteredByCategory,
    setIsFilteredByCategory,
    setIsSearch,
    IsSearch,
    setJobCategory,
    setIsLoading,
    isLoading,
    IsFilterBySalary,
    FilteredBySalaryJobs,
    setIsFilterBySalary,
  } = useContext(AppContext);

  function handleSearchBtn() {
    setIsLoading(true);
    setJobCategory();
    setIsFilteredByCategory(false);
    SearchJobs(SearchJobText);
    setIsSearch(!IsSearch);
    setIsFilterBySalary(false);
  }

  function handleCancleSearchBtn() {
    setIsLoading(true);
    setIsFilteredByCategory(false);
    setSearchJobText("");
    setSearchJobValues([]);
    setIsSearch(!IsSearch);
    setIsFilterBySalary(false);
  }

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* //! SEARCH BTN AND INPUT */}
        <header className="flex sticky z-20 top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          {IsSearch == true ? (
            <div className="flex w-full justify-between">
              {" "}
              {SearchJobText} Jobs Are➡️
              <button onClick={() => handleCancleSearchBtn()}> Cancel</button>
            </div>
          ) : (
            <>
              {" "}
              <Input />
              <button onClick={() => handleSearchBtn()}> Search</button>
            </>
          )}
        </header>

        {/* //! FOR ALL JOBS */}
        {!IsSearch && !IsFilterBySalary && !IsFilteredByCategory && (
          <div className="flex flex-1 flex-row flex-wrap justify-center gap-4 p-4">
            {isLoading ? (
              Array.from({ length: 24 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-video h-12 w-full rounded-lg bg-muted/50"
                />
              ))
            ) : AllJobs?.length > 0 ? (
              <div className="flex mx-10 justify-evenly flex-wrap item-start gap-5  w-full ">
                {AllJobs?.map((job) => (
                  <CardDemo job={job} key={job._id} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-xl">
                No jobs found. Please try again 😊
              </p>
            )}
          </div>
        )}

        {/* //! SEARCHED JOBS */}
        <div className="flex flex-1 flex-row flex-wrap justify-center gap-4 p-4">
          {isLoading == true
            ? Array.from({ length: 24 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-video h-12 w-full rounded-lg bg-muted/50"
                />
              ))
            : IsSearch &&
              (SearchJobValues?.length > 0 ? (
                SearchJobValues.map((SearchedJob) => (
                  <CardDemo job={SearchedJob} key={SearchedJob._id} />
                ))
              ) : (
                <p className="text-center text-gray-500 text-xl">
                  No jobs found For That Title Pls Try Again 😊
                </p>
              ))}
        </div>

        {/* //! FILTERED BY CATEGORY */}
        <div className="flex flex-1 flex-row flex-wrap justify-center gap-4 p-4">
          {isLoading == true
            ? Array.from({ length: 24 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-video h-12 w-full rounded-lg bg-muted/50"
                />
              ))
            : IsFilteredByCategory &&
              (FilteredJobCategory?.length > 0 ? (
                FilteredJobCategory.map((CategoryWiseJobs) => (
                  <CardDemo job={CategoryWiseJobs} key={CategoryWiseJobs._id} />
                ))
              ) : (
                <p className="text-center text-gray-500 text-xl">
                  No jobs found For That Category Pls Try Again 😊
                </p>
              ))}
        </div>

        {/* //! FILTER BY SALARY */}
        <div className="flex flex-1 flex-row flex-wrap justify-center gap-4 p-4">
          {isLoading == true
            ? Array.from({ length: 24 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-video h-12 w-full rounded-lg bg-muted/50"
                />
              ))
            : IsFilterBySalary &&
              (FilteredBySalaryJobs?.length > 0 ? (
                FilteredBySalaryJobs.map((SalaryWiseJobs) => (
                  <CardDemo job={SalaryWiseJobs} key={SalaryWiseJobs._id} />
                ))
              ) : (
                <p className="text-center text-gray-500 text-xl">
                  No jobs found For That Category Pls Try Again 😊
                </p>
              ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
