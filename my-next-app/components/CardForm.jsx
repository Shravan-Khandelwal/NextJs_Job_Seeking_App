"use client";
import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card.jsx";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AppContext } from "./../Store/AppContext";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.jsx";

export default function CardWithForm() {
  const { setNewJobPostedTracker, UserDetails } = useContext(AppContext);

 

  const [Job_Company_Name, setJob_Company_Name] = useState("");
  const [JobTitle, setJobTitle] = useState("");
  const [JobDescription, setJobDescription] = useState("");
  const [JobLocation, setJobLocation] = useState("");
  const [fixedSalary, setfixedSalary] = useState("");
  const [JobCategory, setJobCategory] = useState("");

  useEffect(() => {
    setJob_Company_Name(UserDetails?.CompanyName?.toUpperCase());
  }, [UserDetails]);

  async function handlePostJob() {
    try {
      if (
        JobTitle &&
        JobDescription &&
        JobLocation &&
        fixedSalary &&
        JobCategory &&
        Job_Company_Name
      ) {
        const NewJobDetails = {
          JobTitle,
          JobDescription,
          JobLocation,
          fixedSalary: parseInt(fixedSalary),
          JobCategory,
          Job_Company_Name,
        };

        console.log(NewJobDetails);

        const response = await fetch(
          "https://nextjs-job-seeking-app-g4py.onrender.com/api/jobRoutes/postJob",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(NewJobDetails),
            credentials: "include",
          }
        );

        const result = await response.json();

        if (response.ok) {
          toast.success(result.message);
          setNewJobPostedTracker(true);

          setJobTitle("");
          setJobDescription("");
          setJobLocation("");
          setfixedSalary("");
          setJobCategory("");
          setJob_Company_Name("");
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
      setNewJobPostedTracker(false);
    }
  }

  return (
    <>
      <Card className="w-[80vw]  bg-white h-[95vh]">
        <CardHeader>
          <CardTitle className=" text-center text-4xl">
            Post A New Job
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid  w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="text-xl font-semibold" htmlFor="JobTitle">
                  Job Title
                </Label>
                <Input
                  value={JobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  id="JobTitle"
                  placeholder="Sales,Developer,Editor..."
                  maxLength={25}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label
                  className="text-xl font-semibold"
                  htmlFor="JobDescription"
                >
                  Job Description
                </Label>
                <Input
                  value={JobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  id="JobDescription"
                  placeholder="This Role Is About..."
                  maxLength={250}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-xl font-semibold" htmlFor="JobLocation">
                  Job Location
                </Label>
                <Input
                  value={JobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  id="JobLocation"
                  placeholder="India,Dubai,USA..."
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-xl font-semibold" htmlFor="fixedSalary">
                  fixedSalary $
                </Label>
                <Input
                  value={fixedSalary}
                  onChange={(e) => setfixedSalary(e.target.value)}
                  type="number"
                  id="fixedSalary"
                  placeholder="$1000"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-xl font-semibold" htmlFor="CompanyName">
                  Company Name
                </Label>
                <Input
                  value={Job_Company_Name}
                  type="text"
                  id="CompanyName"
                  placeholder=""
                  disabled
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-xl font-semibold" htmlFor="JobCategory">
                  JobCategory
                </Label>
                <Select onValueChange={(value) => setJobCategory(value)}>
                  <SelectTrigger id="JobCategory">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Video Editing">Video Editing</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Ai">Ai</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => handlePostJob()}>Post</Button>
          <Link href="/HR/MyJobsListings">
            {" "}
            <Button >Show My Jobs Listing</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
