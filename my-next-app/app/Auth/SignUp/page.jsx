import React from "react";
import { SignupFormDemo } from "./../../../components/SignupForm";

// Metadata for the page
export const metadata = {
  title: "SignUp Page 🔐",
  description: "Authentication For Your Safety",
};

function SignUp() {
  return (
    <div className="flex items-center justify-center min-w-full min-h-screen">
      <SignupFormDemo></SignupFormDemo>
    </div>
  );
}

export default SignUp;
