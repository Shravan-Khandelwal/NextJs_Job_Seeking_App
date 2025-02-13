"use client";
import React, { useContext, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible.jsx";
import { ChevronRight } from "lucide-react";
import {
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { AppContext } from "./../Store/AppContext";

function FilterByPriceComponent() {
  const {
    setFilteredSalaryValue,
    setIsLoading,
    setIsSearch,
    setIsFilteredByCategory,
    setSearchJobText,
    setIsFilterBySalary,
    IsFilterBySalary,
    FilteredSalaryValue,
  } = useContext(AppContext);

  const [isBtnActive, setisBtnActive] = useState({
    First: false,
    Second: false,
    Third: false,
    Fourth: false,
    Fifth: false,
    Six: false,
  });

  function handleFilterBtns(StartRange, EndRange) {
    switch (StartRange) {
      case 100:
        setisBtnActive({
          First: true,
          Second: false,
          Third: false,
          Fourth: false,
          Fifth: false,
          Six: false,
        });
        break;
      case 500:
        setisBtnActive({
          First: false,
          Second: true,
          Third: false,
          Fourth: false,
          Fifth: false,
          Six: false,
        });
        break;
      case 1000:
        setisBtnActive({
          First: false,
          Second: false,
          Third: true,
          Fourth: false,
          Fifth: false,
          Six: false,
        });
        break;
      case 2000:
        setisBtnActive({
          First: false,
          Second: false,
          Third: false,
          Fourth: true,
          Fifth: false,
          Six: false,
        });
        break;
      case 3000:
        setisBtnActive({
          First: false,
          Second: false,
          Third: false,
          Fourth: false,
          Fifth: true,
          Six: false,
        });
        break;
      case 5000:
        setisBtnActive({
          First: false,
          Second: false,
          Third: false,
          Fourth: false,
          Fifth: false,
          Six: true,
        });
        break;

      default:
        break;
    }
    setFilteredSalaryValue({
      StartRange,
      EndRange,
    });

    setIsLoading(true);
    setIsSearch(false);
    setSearchJobText("");
    setIsFilterBySalary(true);
    setIsFilteredByCategory(false);
  }

  function resetFilters() {
    setisBtnActive({
      First: false,
      Second: false,
      Third: false,
      Fourth: false,
      Fifth: false,
      Six: false,
    });
    setIsLoading(true);
    setIsSearch(false);
    setSearchJobText("");
    setIsFilteredByCategory(false);
    setIsFilterBySalary(false);
  }

  return (
    <Collapsible title="HIII" className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel
          asChild
          className="group/label text-4xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger className="text-gray-800 py-10 text-3xl font-extrabold">
            {/* <span className="text-blue-600"> Salary</span>
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" /> */}
            <div className="flex w-full  items-center justify-between">
              <p className="text-blue-600 font-light   text-3xl">Salary</p>
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              {IsFilterBySalary && (
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
          <SidebarGroupContent className="flex w-full justify-center items-center flex-col gap-4">
            <ul className="w-48 text-sm font-medium  text-gray-900 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b py-3  border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center w-full justify-center">
                  <Button
                    onClick={() => handleFilterBtns(100, 500)}
                    className={`w-full ${
                      isBtnActive.First ? "bg-blue-400" : ""
                    }`}
                  >
                    $100 - $ 500
                  </Button>
                </div>
              </li>

              <li className="w-full border-b py-3  border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center w-full justify-center">
                  <Button
                    onClick={() => handleFilterBtns(500, 1000)}
                    className={`w-full ${
                      isBtnActive.Second ? "bg-blue-400" : ""
                    }`}
                  >
                    $500 - $ 1000
                  </Button>
                </div>
              </li>
              <li className="w-full border-b py-3  border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center w-full justify-center">
                  <Button
                    onClick={() => handleFilterBtns(1000, 2000)}
                    className={`w-full ${
                      isBtnActive.Third ? "bg-blue-400" : ""
                    }`}
                  >
                    $1000 - $ 2000
                  </Button>
                </div>
              </li>
              <li className="w-full border-b py-3  border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center w-full justify-center">
                  <Button
                    onClick={() => handleFilterBtns(2000, 3000)}
                    className={`w-full ${
                      isBtnActive.Fourth ? "bg-blue-400" : ""
                    }`}
                  >
                    $2000 - $ 3000
                  </Button>
                </div>
              </li>
              <li className="w-full border-b py-3  border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center w-full justify-center">
                  <Button
                    onClick={() => handleFilterBtns(3000, 5000)}
                    className={`w-full ${
                      isBtnActive.Fifth ? "bg-blue-400" : ""
                    }`}
                  >
                    $3000 - $ 5000
                  </Button>
                </div>
              </li>
              <li className="w-full border-b py-3  border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center w-full justify-center">
                  <Button
                    onClick={() => handleFilterBtns(5000, 10000)}
                    className={`w-full ${isBtnActive.Six ? "bg-blue-400" : ""}`}
                  >
                    Above $5000
                  </Button>
                </div>
              </li>
            </ul>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

export default FilterByPriceComponent;
