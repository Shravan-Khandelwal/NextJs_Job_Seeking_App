import React from "react";

export const metadata = {
  title: "Job Listing's Page 📚",
  description: "Job Listing's Page",
};

function layout({ children }) {
  return <div className="bg-white w-full min-h-[100vh]">{children}</div>;
}

export default layout;
