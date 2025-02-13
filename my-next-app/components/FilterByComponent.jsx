"use client";
import React, { useContext, useState } from "react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { AppContext } from "./../Store/AppContext";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible.jsx";

function FilterByComponent() {
  const {
    setJobCategory,
    setIsFilteredByCategory,
    IsFilteredByCategory,
    setIsSearch,
    setSearchJobText,
    setIsLoading,
    setIsFilterBySalary,
  } = useContext(AppContext);

  const [isBtnActive, setisBtnActive] = useState({
    Ai: false,
    Sales: false,
    Marketing: false,
    Finance: false,
    Developer: false,
  });

  function handleCategoryInputs(CategoryValue) {
    switch (CategoryValue) {
      case "Ai":
        setisBtnActive({
          Ai: true,
          Sales: false,
          Marketing: false,
          Finance: false,
          Developer: false,
        });
        break;
      case "Sales":
        setisBtnActive({
          Ai: false,
          Sales: true,
          Marketing: false,
          Finance: false,
          Developer: false,
        });
        break;
      case "Marketing":
        setisBtnActive({
          Ai: false,
          Sales: false,
          Marketing: true,
          Finance: false,
          Developer: false,
        });
        break;
      case "Finance":
        setisBtnActive({
          Ai: false,
          Sales: false,
          Marketing: false,
          Finance: true,
          Developer: false,
        });
        break;
      case "Developer":
        setisBtnActive({
          Ai: false,
          Sales: false,
          Marketing: false,
          Finance: false,
          Developer: true,
        });
        break;

      default:
        break;
    }
    setIsLoading(true);
    setIsSearch(false);
    setSearchJobText("");
    setIsFilteredByCategory(true);
    setJobCategory(CategoryValue);
    setIsFilterBySalary(false);
  }

  function resetFilters() {
    setisBtnActive({
      Ai: false,
      Sales: false,
      Marketing: false,
      Finance: false,
      Developer: false,
    });
    setIsLoading(true);
    setJobCategory(""); // Reset category
    setIsFilteredByCategory(false);
    setIsFilterBySalary(false);
  }

  return (
    <Collapsible title="HIII" className="group/collapsible">
      <SidebarContent>
        <SidebarGroup className="py-10  z-40 overflow-x-hidden">
          <SidebarGroupLabel
            asChild
            className="group/label text-4xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <CollapsibleTrigger className="text-gray-800  mr-11 w-full py-5 text-3xl font-extrabold">
              <div className="flex w-full  items-center justify-between">
                <p className="text-blue-600 font-light   text-3xl">Filter By Roles</p>
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                {IsFilteredByCategory && (
                  <button
                    onClick={resetFilters}
                    className="text-gray-500  hover:text-red-500 text-xs font-bold focus:outline-none"
                  >
                    ❌
                  </button>
                )}
              </div>
            </CollapsibleTrigger>
       
          </SidebarGroupLabel>
          <CollapsibleContent>
            <ul className="w-48 ml-6 text-sm font-medium  text-gray-900 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b py-3  border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center w-full justify-center ">
                  <Button
                    className={`w-full ${isBtnActive.Ai ? "bg-blue-400" : ""}`}
                    onClick={() => handleCategoryInputs("Ai")}
                  >
                    Ai
                  </Button>
                </div>
              </li>
              <li className="w-full border-b py-3 border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center w-full justify-center">
                  <Button
                    className={`w-full ${
                      isBtnActive.Sales ? "bg-blue-400" : ""
                    }`}
                    onClick={() => handleCategoryInputs("Sales")}
                  >
                    Sales
                  </Button>
                </div>
              </li>
              <li className="w-full border-b py-3 border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center w-full justify-center">
                  <Button
                    className={`w-full ${
                      isBtnActive.Marketing ? "bg-blue-400" : ""
                    }`}
                    onClick={() => handleCategoryInputs("Marketing")}
                  >
                    Marketing
                  </Button>
                </div>
              </li>
              <li className="w-full border-b py-3 border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center w-full justify-center">
                  <Button
                    className={`w-full ${
                      isBtnActive.Finance ? "bg-blue-400" : ""
                    }`}
                    onClick={() => handleCategoryInputs("Finance")}
                  >
                    Finance
                  </Button>
                </div>
              </li>
              <li className="w-full border-b py-3 border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center w-full justify-center">
                  <Button
                    className={`w-full ${
                      isBtnActive.Developer ? "bg-blue-400" : ""
                    }`}
                    onClick={() => handleCategoryInputs("Developer")}
                  >
                    Developer
                  </Button>
                </div>
              </li>
            </ul>
          </CollapsibleContent>
        </SidebarGroup>
      </SidebarContent>
    </Collapsible>
  );
}

export default FilterByComponent;
