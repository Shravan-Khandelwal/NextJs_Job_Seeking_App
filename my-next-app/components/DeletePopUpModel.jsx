"use client";
import React, { useState,useContext } from "react";
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
import { AppContext } from './../Store/AppContext';

function DeletePopUpModel({ CrrJobId }) {


    const {setDeleteJobTracker,DeleteJobTracker} = useContext(AppContext);

  const Router = useRouter();

  async function handleDeleteBtn() {
    try {
      const response = await fetch(
        `https://nextjs-job-seeking-app-g4py.onrender.com/api/jobRoutes/expireJob/${CrrJobId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          secure: true,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setDeleteJobTracker(!DeleteJobTracker);
        console.log("DeleteJobTracker is " + DeleteJobTracker);
        
        toast.success("Job Deleted Successfully!");

        setTimeout(() => {
          Router.push("/");
        }, 1000);
      }
    } catch (error) {
        toast.error(error.message);
    
    }
  }

  return (
    <Dialog>
      <DialogTrigger>Delete Job</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Job! </DialogTitle>
          <DialogDescription>
            Are You Sure You Want To Delete This Job Posting
          </DialogDescription>
        </DialogHeader>
        <Button onClick={() => handleDeleteBtn()}> Delete</Button>
      </DialogContent>
    </Dialog>
  );
}

export default DeletePopUpModel;
