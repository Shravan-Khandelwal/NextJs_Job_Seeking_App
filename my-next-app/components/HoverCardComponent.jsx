import React from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function HoverCardComponent({ JobPostedBy }) {
  return (
    <>
      <HoverCard>
        <div className="div text-blue-500">
          <HoverCardTrigger className="text-blue-500">
            {JobPostedBy.Name?.toUpperCase()}
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-col text-lg justify-between w-fit">
            {" "}
            <p>{JobPostedBy.CompanyName?.toUpperCase()} - HR</p>
            {JobPostedBy.Email}{" "}
          </HoverCardContent>
        </div>
      </HoverCard>
    </>
  );
}

export default HoverCardComponent;
