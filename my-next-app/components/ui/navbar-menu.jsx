"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div
      onMouseEnter={() => setActive(item)}
      className="relative flex justify-center w-[7vw]"
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:text-blue-600 hover:opacity-[0.9] dark:text-white dark:hover:text-blue-500"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children }) => {
  return (
    <nav
      // resets the state
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border bg-white  text-xl border-transparent dark:bg-black dark:border-white/[0.2]  shadow-input flex justify-center space-x-4 px-8 py-6 "
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({ UserDetails }) => {
  console.log("VALUS IS ");
  console.log(UserDetails);
  
  
  return (
    <div className="flex hover:cursor-pointer">
      <div className="px-3">
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {UserDetails.Name.toUpperCase()}
        </h4>
        <p className="text-neutral-700 py-1 text-sm max-w-[10rem] dark:text-neutral-300">
          {UserDetails.Role.toUpperCase()}
        </p>
        <p className="text-neutral-700 py-1 text-sm max-w-[10rem] dark:text-neutral-300">
          {UserDetails.Email}
        </p>
        <p className="text-neutral-700 py-1 text-sm max-w-[10rem] dark:text-neutral-300">
          {UserDetails?.CompanyName?.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export const HoveredLink = ({ children, ...rest }) => {
  return (
    <Link
      {...rest}
      className="text-black dark:text-neutral-200 hover:text-blue-600 "
    >
      {children}
    </Link>
  );
};
