"use client";
import React, { useContext } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AppContext } from "./../Store/AppContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function PopUpForm({ ApplicationId, Application }) {
  const { setNewJobApplication, NewJobApplication } = useContext(AppContext);

  const router = useRouter();

  async function handleRejectBtn() {
    try {
      console.log(ApplicationId);

      const response = await fetch(
        `https://nextjs-job-seeking-app.onrender.com/api/applicationRoutes/jobSeekerDeleteApplication/${ApplicationId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setNewJobApplication(!NewJobApplication);

        router.push("/");
        toast.success("Application Rejected!!");
      }
    } catch (error) {
      toast.success(error.message);
    }
  }

  async function handleAcceptBtn() {
    try {
      const response = await fetch(
        `https://nextjs-job-seeking-app.onrender.com/api/applicationRoutes/AcceptJobApplication/${ApplicationId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const result = response.json();

      if (response.ok) {
        router.push("/");
        toast.success("Application Accepted!!");
      }
    } catch (error) {
      toast.success(error.message);
    }
  }

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Job Application Form
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            User Details Are As Follows
          </DialogDescription>
          <div className="grid gap-6 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 text-right"
              >
                Name:
              </Label>
              <p className="text-gray-900 col-span-3">{Application.Name}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label
                htmlFor="address"
                className="text-sm font-medium text-gray-700 text-right"
              >
                Address:
              </Label>
              <p className="text-gray-900 col-span-3">{Application.Address}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 text-right"
              >
                Email:
              </Label>
              <p className="text-gray-900 col-span-3">{Application.Email}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 text-right"
              >
                Phone:
              </Label>
              <p className="text-gray-900 col-span-3">{Application.Phone}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label
                htmlFor="coverLetter"
                className="text-sm font-medium text-gray-700 text-right"
              >
                Cover Letter:
              </Label>
              <p className="text-gray-900 col-span-3">
                {Application.coverLetter}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label
                htmlFor="resume"
                className="text-sm font-medium text-gray-700 text-right"
              >
                Resume:
              </Label>
              <div className="col-span-3">
                <img
                  className="w-24 h-24 rounded-full border border-gray-300"
                  src={Application.Resume.url}
                  alt="Applicant's Resume"
                />
              </div>
              <Button onClick={() => handleAcceptBtn()}> Accept </Button>
              <Button onClick={() => handleRejectBtn()}> Reject </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </div>
  );
}

export default PopUpForm;
