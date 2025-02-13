"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <div className="flex justify-center items-center">
        <h1 className="mb-4 text-3xl font-extrabold text-blue-500 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-black">User</span>{" "}
          Testimonials
        </h1>
      </div>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "This platform truly transformed my life. It was the best of times when I landed my dream job, an epoch of belief and hope for my future career.",
    name: "Charles Dickens",
    title: "Content Strategist",
  },
  {
    quote:
      "To apply, or not to apply—that was the question. This platform made the answer clear! It helped me navigate the sea of opportunities and find my ideal role.",
    name: "William Shakespeare",
    title: "Creative Writer",
  },
  {
    quote:
      "Finding a job always seemed like a dream within a dream, but this platform turned it into reality! I couldn't be happier with the results.",
    name: "Edgar Allan Poe",
    title: "Technical Writer",
  },
  {
    quote:
      "It is a truth universally acknowledged that this platform is the go-to place for finding your dream job. I found mine, and it’s everything I hoped for!",
    name: "Jane Austen",
    title: "Marketing Manager",
  },
  {
    quote:
      "Call me grateful! This platform gave me the tools and guidance to navigate the job market and land an incredible role in my dream industry.",
    name: "Herman Melville",
    title: "Maritime Logistics Manager",
  },
];
