// "use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import  Link  from "next/link";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Get",
    },
    {
      text: "Awesome",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Jobs",
    },
    {
      text: "with",
    },
    {
      text: "JobDekho.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[20rem]  ">
      <p className="text-black dark:text-neutral-200 text-xs sm:text-4xl  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40  h-14 rounded-xl bg-black border dark:border-white border-transparent text-white text-xl">
          <Link href="/"> Join now</Link>
        </button>
        <button className="w-40  h-14 rounded-xl bg-blue-400 text-black border border-black  text-xl">
          <Link href="/Auth/SignUp"> Signup</Link>
        </button>
      </div>
    </div>
  );
}
