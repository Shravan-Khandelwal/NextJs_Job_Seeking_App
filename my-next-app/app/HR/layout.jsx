import React from "react";
import { Dangrek } from "next/font/google";

// Import the Dangrek font
const dangrek = Dangrek({
  subsets: ["latin"],
  weight: "400", // You can adjust the weight if needed
});

function HRlayout({ children }) {
  return <div className={`${dangrek.className}  font-dangrek` }>{children}</div>;
}

export default HRlayout;
