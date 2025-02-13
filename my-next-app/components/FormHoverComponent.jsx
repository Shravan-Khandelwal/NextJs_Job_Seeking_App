"use client";
import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AppContext } from "./../Store/AppContext";

function FormHoverComponent({ CrrJobId }) {


  const { SubmitJobApplication,JobApplications } = useContext(AppContext);
  

  const jobId = CrrJobId;
  const router = useRouter();

  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [Phone, setPhone] = useState();
  const [Address, setAddress] = useState();
  const [coverLetter, setCoverLetter] = useState();
  const [Resume, setResume] = useState(null);

  function handleFormSubmit() {
    try {
      SubmitJobApplication(
        Name,
        Email,
        Resume,
        Phone,
        Address,
        coverLetter,
        jobId
      );
      
      
    } catch (error) {
      
    }
  }



  return (
    <Dialog>
      <DialogTrigger>Apply Now</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Job Application Form</DialogTitle>
          <DialogDescription>Fill All The Details Below</DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 justify-start items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                placeholder="Brock"
                id="name"
                required={true}
                className="col-span-3"
                onChange={(e) => setName(e.target.value)}
                value={Name}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Address" className="text-right">
                Address
              </Label>
              <Input
                id="Address"
                required={true}
                placeholder="Near Old Palace,London"
                className="col-span-3"
                onChange={(e) => setAddress(e.target.value)}
                value={Address}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Email" className="text-right">
                Email
              </Label>
              <Input
                id="Email"
                required={true}
                className="col-span-3"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Phone" className="text-right">
                Phone
              </Label>
              <Input
                id="Phone"
                required={true}
                className="col-span-3"
                type="number"
                placeholder="123456789"
                onChange={(e) => setPhone(e.target.value)}
                value={Phone}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coverLetter" className="text-right">
                CoverLetter
              </Label>
              <Input
                id="coverLetter"
                required={true}
                className="col-span-3"
                placeholder="I Want To Apply For This Role..."
                onChange={(e) => setCoverLetter(e.target.value)}
                value={coverLetter}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Resume" className="text-right">
                Resume
              </Label>
              <Input
                id="Resume"
                className="col-span-3"
                type="File"
                onChange={(e) => setResume(e.target.files[0])}
                // value={Resume}
              />
            </div>
          </div>
          <Button onClick={() => handleFormSubmit()}>Apply Now</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default FormHoverComponent;
