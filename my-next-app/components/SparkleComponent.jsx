import React from "react";
import { Cover } from "./ui/cover";

export function CoverDemo() {
  return (
    <div>
      <h1 className="text-4xl md:text-4xl lg:text-7xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-16 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Get Amazing Jobs <br /> at <Cover>Lightning speed</Cover>
      </h1>
    </div>
  );
}
