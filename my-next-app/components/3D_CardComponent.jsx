"use client";
import React, { useState, useEffect } from "react";
import { PinContainer } from "./ui/3d-pin";

export function AnimatedPinDemo({ JobTitle, JobCategory, JobId, CompanyName }) {
  const [BackGroundImage, setBackGroundImage] = useState("");

  // Function to determine background image based on job category
  const getBackgroundImage = (category) => {
    switch (category) {
      case "Sales":
        return "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      case "Marketing":
        return "https://images.unsplash.com/photo-1533749871411-5e21e14bcc7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFya2V0aW5nJTIwam9ifGVufDB8fDB8fHww";
      case "Video Editing":
        return "https://images.unsplash.com/photo-1636971819476-aa41dc3db0d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlkZW8lMjBlZGl0aW5nfGVufDB8fDB8fHww";
      case "Finance":
        return "https://images.unsplash.com/photo-1621280336935-ed7cae618aac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmluYW5jZSUyMGpvYnN8ZW58MHx8MHx8fDA%3D";
      case "Ai":
        return "https://images.unsplash.com/photo-1717501218636-a390f9ac5957?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpfGVufDB8fDB8fHww";
      case "Developer":
        return "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      default:
        return "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80";
    }
  };

  // Set background image whenever the JobCategory changes
  useEffect(() => {
    setBackGroundImage(getBackgroundImage(JobCategory));
  }, [JobCategory]);

  return (
    <div className="h-[20rem] w-[30vw] my-10 flex items-center justify-center">
      <PinContainer
        title={CompanyName?.toUpperCase()}
        href={`/JobDetails/${JobId}`}
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-2xl text-slate-100">
            {JobTitle}
          </h3>
          <div
            style={{
              backgroundImage: `url(${BackGroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="flex flex-1 w-full rounded-lg mt-4 bg-white"
          />
        </div>
      </PinContainer>
    </div>
  );
}
