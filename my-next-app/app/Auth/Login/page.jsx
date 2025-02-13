import React from "react";
import LoginForm from "../../../components/LoginForm";

// Metadata for the page
export const metadata = {
  title: "Login Page 🔑",
  description: "Authentication For Your Safety",
};

function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginForm></LoginForm>
    </div>
  );
}

export default Login;
