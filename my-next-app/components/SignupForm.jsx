"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function SignupFormDemo() {
  const [Name, setName] = useState("");
  const [Role, setRole] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [SignUpSuccess, setSignUpSuccess] = useState(null);
  const [showCompany, setshowCompany] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Name && Role && Password && Email && Phone) {
      const SignUpDetails = {
        Email,
        Password,
        Role,
        Name,
        Phone,
      };

      if (Role === "hiring manager") {
        SignUpDetails.CompanyName = CompanyName;
        console.log(SignUpDetails);
      }

      const response = await fetch(
        "https://nextjs-job-seeking-app.onrender.com/api/userRoutes/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(SignUpDetails),
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSignUpSuccess(true);
        toast.success(result.message);
        setTimeout(() => {
          router.push("/Auth/Login");
        }, 2000);
      } else {
        toast.error(result.message);
        setSignUpSuccess(false);
      }
    }
  };

  function handleRoleValues(e) {
    const { value } = e?.target;
    if (value == "hiring manager") {
      setshowCompany(true);
    } else {
      setshowCompany(false);
    }
    console.log(value);

    setRole(Role === value ? "" : value);
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white w-full lg:h-screen ">
      <div className="grid md:grid-cols-2 items-center gap-y-8 bg-white max-w-7xl w-full shadow-lg  rounded-2xl overflow-hidden">
        <form
          onSubmit={handleSubmit}
          type="submit"
          className="sm:p-8 p-4 w-full"
        >
          <div className="mb-12">
            <h3 className="text-blue-500 text-3xl font-extrabold max-md:text-center">
              Register
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-800 text-lg mb-2 block">Name</label>
              <input
                onChange={(e) => {
                  setName(e.target.value), setSignUpSuccess(null);
                }}
                name="name"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-lg px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label className="text-gray-800 text-lg mb-2 block">Email</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value), setSignUpSuccess(null);
                }}
                required
                name="lname"
                type="email"
                className="bg-gray-100 w-full text-gray-800 text-lg px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter Your Email"
              />
            </div>
            <div>
              <label className="text-gray-800 text-lg mb-2 block">
                Password
              </label>
              <input
                name="email"
                required
                onChange={(e) => {
                  setPassword(e.target.value), setSignUpSuccess(null);
                }}
                type="password"
                className="bg-gray-100 w-full text-gray-800 text-lg px-4 py-3 rounded-md outline-blue-500"
                placeholder="****************"
              />
            </div>
            <div>
              <label className="text-gray-800 text-lg mb-2 block">
                Mobile No.
              </label>
              <input
                required
                onChange={(e) => {
                  setPhone(e.target.value), setSignUpSuccess(null);
                }}
                name="number"
                type="number"
                className="bg-gray-100 w-full text-gray-800 text-lg px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <div className="flex justify-center items-center ">
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
            </div>

            {showCompany ? (
              <div>
                <label className="text-gray-800 text-lg mb-2 block">
                  Company Name
                </label>
                <input
                  name="CompanyName"
                  type="text"
                  className="bg-gray-100 w-full text-gray-800 text-lg px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Hiring For Which Company?"
                  onChange={(e) => setCompanyName(e.target.value)}
                  value={CompanyName}
                />
              </div>
            ) : null}
          </div>

          <div className="flex items-center mt-6">
            <label htmlFor="remember-me" className="ml-3 block text-lg">
              Already have An Account ?{" "}
              <Link
                href="/Auth/Login"
                className="text-blue-500 font-semibold hover:underline ml-1"
              >
                Login
              </Link>
            </label>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="py-3 px-6 text-lg tracking-wide font-semibold rounded-md text-white bg-blue-600 hover:bg-black focus:outline-none transition-all"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="max-md:order-1  flex flex-col justify-center sm:p-8 p-4 bg-blue-600 w-full h-full">
          <div className="max-w-md space-y-12 mx-auto">
            <div>
              <h4 className="text-white text-xl font-semibold">
                Create Your Account
              </h4>
              <p className="text-lg text-white mt-2">
                Welcome to our registration page! Get started by creating your
                account.
              </p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold">
                Simple & Secure Registration
              </h4>
              <p className="text-lg text-white mt-2">
                Our registration process is designed to be straightforward and
                secure. We prioritize your privacy and data security.
              </p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold">
                Terms and Conditions Agreement
              </h4>
              <p className="text-lg text-white mt-2">
                Require users to accept the terms and conditions of your service
                during registration.
              </p>
            </div>
          </div>
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
