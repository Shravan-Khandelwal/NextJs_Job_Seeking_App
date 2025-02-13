"use client";
import React, { useState, useContext } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppContext } from "./../Store/AppContext";
import toast from "react-hot-toast";

function LoginForm() {
  const [Email, setEmail] = useState("");
  const [Role, setRole] = useState("");
  const [Password, setPassword] = useState("");
  const [LoginSuccess, setLoginSuccess] = useState(null);
  const router = useRouter();

  const { setIsLoggedIn } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Email && Password && Role) {
      const LoginDetails = {
        Email,
        Password,
        Role,
      };

      console.log(Email, Password, Role);

      const response = await fetch(
        "https://nextjs-job-seeking-app.onrender.com/api/userRoutes/logInUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(LoginDetails),
          credentials: "include",
          secure: true,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setLoginSuccess(true);
        toast.success(result.message);
        setIsLoggedIn(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setLoginSuccess(false);
        toast.error(result.message);
        setIsLoggedIn(false);
      }
    } else {
      setLoginSuccess(false);
    }
  };

  function handleRoleValues(e) {
    const { value } = e.target;
    console.log("VAL IS " + value);
    setRole(Role === value ? "" : value);
  }

  return (
    <div className="w-full bg-gradient-to-r from-blue-300 to-blue-800 text-gray-800">
      <div className="min-h-screen flex fle-col items-center justify-center lg:p-6 p-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div>
            <h2 className="text-6xl font-extrabold lg:leading-[50px] text-white">
              Seamless Login for Exclusive Access
            </h2>
            <p className="text-lg mt-6 text-white">
              Immerse yourself in a hassle-free login journey with our
              intuitively designed login form. Effortlessly access your account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto w-full"
          >
            <h3 className="text-4xl font-extrabold mb-12">Log in</h3>

            <div>
              <input
                onChange={(e) => {
                  setEmail(e.target.value), setLoginSuccess(null);
                }}
                value={Email}
                name="email"
                type="email"
                required
                className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                onChange={(e) => {
                  setPassword(e.target.value), setLoginSuccess(null);
                }}
                value={Password}
                name="password"
                type="password"
                required
                className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800"
                placeholder="Password"
              />
            </div>

            <div className="flex justify-start w-full items-start ">
              <div className="w-64">
                <label className="text-gray-800 text-lg mb-2 block">
                  Select Role
                </label>
                <div className="relative">
                  <select
                    required
                    onChange={handleRoleValues}
                    id="role"
                    name="role"
                    className="block bg-gray-100 w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      -- Select a Role --
                    </option>
                    <option value="Job Seeker">Job Seeker</option>
                    <option value="hiring manager">Hiring Manager</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
              >
                Login
              </button>
            </div>
            <div className="flex items-center mt-6">
              <label htmlFor="remember-me" className="ml-3 block text-lg">
                Don't have An Account ?{" "}
                <Link
                  href="/Auth/SignUp"
                  className="text-blue-500 font-semibold hover:underline ml-1"
                >
                  SignUp
                </Link>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default LoginForm;
