"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AppContext } from "./../Store/AppContext";

function AuthComponent() {
  const { UserDetails, setIsLoggedIn } = useContext(AppContext);

  async function handleLogOutBtn() {
    try {
      const response = await fetch(
        "http://localhost:4001/api/userRoutes/logOutUser",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        setIsLoggedIn(false);
      } else {
        console.log("ERROR OCCOURED");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {UserDetails === null ? (
        <div className="btn fixed flex gap-4 right-10 top-4">
          <button className="p-[1px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-6 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              <Link href="/Auth/Login">Login</Link>
            </div>
          </button>
          <button className="p-[1px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-6 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              <Link href="/Auth/SignUp">SignUp</Link>
            </div>
          </button>
        </div>
      ) : (
        <div className="btn fixed flex gap-4 right-10 top-2">
          <button
            onClick={() => handleLogOutBtn()}
            className="p-[1px] relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-6 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              <Link href="/Auth/SignUp">LogOut</Link>
            </div>
          </button>
        </div>
      )}
    </>
  );
}

export default AuthComponent;
