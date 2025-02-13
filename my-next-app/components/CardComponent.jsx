"use client";
import { cn } from "../lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import HoverCardComponent from "./HoverCardComponent";
import Link from "next/link";

export function CardDemo({ job }) {
  const [JobPostedBy, setJobPostedBy] = useState("");
  const [BackGroundImage, setBackGroundImage] = useState("");

  //! FOR FETCHING THE HR INFO AND FOR SETTING THE BACKGROUND IMAGE
  useEffect(() => {
    try {
      const PostedById = job.postedBy;

      async function FindHR(PostedById) {
        const response = await fetch(
          `https://nextjs-job-seeking-app.onrender.com/api/userRoutes/FindHRById/${PostedById}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();

        if (response.ok) {
          setJobPostedBy(result.HR_Details[0]);
        }
      }

      FindHR(PostedById);
    } catch (error) {
      console.log(error.message);
    }

    function SetImage() {
      switch (job.JobCategory) {
        case "Sales":
          setBackGroundImage(
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          );
          break;
        case "Marketing":
          setBackGroundImage(
            "https://images.unsplash.com/photo-1533749871411-5e21e14bcc7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFya2V0aW5nJTIwam9ifGVufDB8fDB8fHww"
          );
          break;
        case "Video Editing":
          setBackGroundImage(
            "https://images.unsplash.com/photo-1636971819476-aa41dc3db0d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlkZW8lMjBlZGl0aW5nfGVufDB8fDB8fHww"
          );
          break;
        case "Finance":
          setBackGroundImage(
            "https://images.unsplash.com/photo-1621280336935-ed7cae618aac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmluYW5jZSUyMGpvYnN8ZW58MHx8MHx8fDA%3D"
          );
          break;
        case "Ai":
          setBackGroundImage(
            "https://images.unsplash.com/photo-1717501218636-a390f9ac5957?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpfGVufDB8fDB8fHww"
          );
          break;
        case "Developer":
          setBackGroundImage(
            "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          );
          break;

        default:
          setBackGroundImage(
            "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80"
          );
          break;
      }
    }

    SetImage();
  }, [job]);

  return (
    <Link
      href={`/JobDetails/${job._id}`}
      className="max-w-xs w-full group/card"
    >
      <div
        className={
          "cursor-pointer text-3xl overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4 group"
        }
        style={{
          backgroundImage: `url(${BackGroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay: Initially visible, hidden on hover */}
        <div className="absolute w-full h-full top-0 left-0 bg-blue-600 opacity-10 transition duration-300 group-hover:opacity-0"></div>

        {/* Content Section */}
        <div className="flex flex-row items-center space-x-4 z-10">
          <div className="flex flex-col">
            <HoverCardComponent JobPostedBy={JobPostedBy}></HoverCardComponent>
            {/* <p className="text-sm text-gray-400">{job.JobCategory}</p> */}
          </div>
        </div>

        {/* Text Content */}
        <div className="text content hover:text-black">
          <h1 className="font-bold text-xl md:text-3xl text-white relative z-120">
            {job.JobTitle}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-120 my-1">
            {job.JobCategory}
          </p>
        </div>
      </div>
    </Link>
  );
}
