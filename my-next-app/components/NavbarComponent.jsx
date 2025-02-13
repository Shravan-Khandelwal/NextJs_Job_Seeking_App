"use client";
import React, { useState, useContext } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../lib/utils";
import { AppContext } from "./../Store/AppContext";
import Link from "next/link";

export default function NavbarDemo() {
  return (
    <div className="w-full bg-black shadow-lg flex items-center justify-center">
      <Navbar className="top-7" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);

  const { UserDetails } = useContext(AppContext);

  return (
    <div
      className={cn(
        "fixed  top-10 shadow-lg rounded-full inset-x-0 max-w-3xl mx-auto z-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <div className="flex justify-between items-center w-full">
          {/* Left Section */}
          <div className="flex justify-center w-full ">
            {UserDetails == null || UserDetails == undefined ? (
              <div className="flex justify-center items-center w-full mx-auto text-center">
                <HoveredLink href="/Auth/SignUp">
                  <p className="text-3xl">
                    {" "}
                    Create An Account To Explore The App
                  </p>
                </HoveredLink>
              </div>
            ) : (
              UserDetails &&
              (UserDetails.Role == "hiring manager" ? (
                <div className="flex w-full justify-evenly">
                  <HoveredLink href="/"> Home</HoveredLink>

                  <HoveredLink href="/HR/PostJobs"> Post A Job</HoveredLink>

                  <HoveredLink href="/HR/ApplicationsRecived">
                    {" "}
                    Applications Recived
                  </HoveredLink>

                  <MenuItem setActive={setActive} active={active} item="Jobs">
                    <div className="flex justify-start item-start  flex-col">
                      <HoveredLink href="/HR/MyJobsListings">
                        My Job's Listings
                      </HoveredLink>
                      <HoveredLink href="/JobListing">All Jobs</HoveredLink>
                    </div>
                  </MenuItem>
                </div>
              ) : (
                <div className="flex w-full justify-evenly">
                  <HoveredLink href="/"> Home</HoveredLink>
                  <HoveredLink href="/JobListing"> Jobs</HoveredLink>
                  <HoveredLink href="/JobSeeker/MyApplications">
                    {" "}
                    My Applications
                  </HoveredLink>
                </div>
              ))
            )}
          </div>
          {/* Right Section (optional) */}
          {UserDetails && (
            <div className="w-[10vw]">
              <MenuItem setActive={setActive} active={active} item="User Info">
                <div className=" text-sm grid grid-cols-2 gap-10 p-1" />
                <ProductItem UserDetails={UserDetails} />
              </MenuItem>
            </div>
          )}
        </div>
      </Menu>
    </div>
  );
}
