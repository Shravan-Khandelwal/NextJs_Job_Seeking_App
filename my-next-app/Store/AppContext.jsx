"use client";

import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const router = useRouter();
  const [UserDetails, setUserDetails] = useState();
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [HR_JobsListings, setHR_JobsListings] = useState([]);
  const [NewJobPostedTracker, setNewJobPostedTracker] = useState();
  const [DeleteJobTracker, setDeleteJobTracker] = useState(true);
  const [AllJobs, setAllJobs] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // FOR SEARCHING THE JOBS
  const [SearchJobText, setSearchJobText] = useState();
  const [SearchJobValues, setSearchJobValues] = useState([]);
  const [IsSearch, setIsSearch] = useState(false);

  // FOR FILTERING THEM CATEGORY WISE
  const [JobCategory, setJobCategory] = useState("");
  const [FilteredJobCategory, setFilteredJobCategory] = useState();
  const [IsFilteredByCategory, setIsFilteredByCategory] = useState(false);

  //! FOR FILTERING SALARY WISE
  const [FilteredSalaryValue, setFilteredSalaryValue] = useState({
    StartRange: null,
    EndRange: null,
  });

  const [FilteredBySalaryJobs, setFilteredBySalaryJobs] = useState();
  const [IsFilterBySalary, setIsFilterBySalary] = useState(false);

  //! FOR STORING THE JOB APPLICATIONS DETAILS
  const [NewJobApplication, setNewJobApplication] = useState(false);
  const [ListOfJobApplications, setListOfJobApplications] = useState([]);

  //! FOR STORING ALL THE LIST OF JOBS A USER HAS APPLIED
  const [JobsAppliedTo, setJobsAppliedTo] = useState();

  //! FOR CHECKING IF THE USER IS LOGGED IN OR NOT
  useEffect(() => {
    const getCookie = (name) => {
      const cookieArr = document.cookie.split(";");
      console.log("COOKIE ARRAY");
      console.log(cookieArr);
      
      for (let cookie of cookieArr) {
        const [key, value] = cookie.trim().split("=");
        if (key === name) {
          return value;
        }
      }
      return null;
    };

    const jwtToken = getCookie("token");
     console.log("JWT Token");
      console.log(jwtToken);

    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);

      setUserDetails(decoded.userData); // Assuming the token contains a `user` field
    } else {
      setUserDetails(null);
      console.log("No token found");
    }
  }, [IsLoggedIn]);

  // ! Fetching The HR Jobs Listing
  useEffect(() => {
    async function Fetch_HR_Jobs_Listing() {
      try {
        const response = await fetch(
          "https://nextjs-job-seeking-app.onrender.com/api/jobRoutes/getMyJobs",
          { method: "GET", credentials: "include" }
        );

        const result = await response.json();

        if (response.ok) {
          // console.log("HR JOBS ARE  IS ");
          setHR_JobsListings(result.MyJobsList);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    Fetch_HR_Jobs_Listing();
  }, [NewJobPostedTracker, UserDetails, DeleteJobTracker]);

  //! FUNCTION TO FETCH ALL THE EXISTING JOBS
  useEffect(() => {
    async function fetchAllJobs() {
      try {
        const response = await fetch(
          "https://nextjs-job-seeking-app.onrender.com/api/jobRoutes/getAllJobs",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();
        // console.log("RESULT IS ");
        if (response.ok) {
          // console.log("RESULT IS ");

          // console.log(result);
          setAllJobs(result.jobList);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAllJobs();
  }, [NewJobPostedTracker, IsLoggedIn, DeleteJobTracker]);

  //! Function For Searching A Job By Its Name
  function SearchJobs(SearchJobText) {
    if (SearchJobText) {
      const SearchedJob = AllJobs?.filter(
        (job) => job.JobTitle.toLowerCase() == SearchJobText.toLowerCase()
      );
      if (SearchedJob.length != 0) {
        setSearchJobValues(SearchedJob || []);
      }
    }
  }

  //! FUNCTION FOR FILTERING THE JOBS BY CATEGORY
  useEffect(() => {
    function FilterJobsByCategory() {
      // console.log("VAL IS " + JobCategory);
      if (JobCategory) {
        const FilteredJobsByCategory = AllJobs?.filter(
          (Job) => Job.JobCategory.toLowerCase() === JobCategory.toLowerCase()
        );

        // console.log("FILTERED");
        // console.log(FilteredJobsByCategory);

        setFilteredJobCategory(FilteredJobsByCategory);
      }
    }
    FilterJobsByCategory();
  }, [JobCategory]);

  //! FUNCTION FOR FILTERING THE JOBS BY SALARY RANGE
  useEffect(() => {
    function FilterBySalary() {

      // fixedSalary
      const FilteredValues = AllJobs?.filter(
        (Job) =>
          Job.fixedSalary >= FilteredSalaryValue.StartRange &&
          Job.fixedSalary <= FilteredSalaryValue.EndRange
      );

      setFilteredBySalaryJobs(FilteredValues);
    }
    FilterBySalary();
  }, [FilteredSalaryValue]);

  //! FUNCTION FOR FETCHING THE LIST OF ALL THE COMPANIES THE USER HAS APPLIED TO
  useEffect(() => {
    async function FetchCompaniesList() {
      try {
        const response = await fetch(
          "https://nextjs-job-seeking-app.onrender.com/api/userRoutes/FetchCompaniesList",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();

        // if (result.JobList.length > 0) {
        //   result.JobList.map((Job) => {
        //     const JobDetails = await fetch(
        //       "https://nextjs-job-seeking-app.onrender.com/api/jobRoutes/FindJobByID/:id"
        //     );
        //   });
        // }

        if (response.ok) {
          setJobsAppliedTo(result.JobList);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    FetchCompaniesList();
  }, []);

  //! FUNCTION FOR POSTING AN APPLICATION
  async function SubmitJobApplication(
    Name,
    Email,
    Resume,
    Phone,
    Address,
    coverLetter,
    jobId
  ) {
    try {
      // Prepare FormData to handle file uploads
      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("Email", Email);
      formData.append("Phone", Phone);
      formData.append("Address", Address);
      formData.append("coverLetter", coverLetter);
      formData.append("Resume", Resume); // Add the file
      formData.append("jobId", jobId);

      const response = await fetch(
        "https://nextjs-job-seeking-app.onrender.com/api/applicationRoutes/postApplication",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        setNewJobApplication(!NewJobApplication);
        router.push("/");
        toast.success("Successfully Applied!!");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppContext.Provider
      value={{
        JobsAppliedTo,
        setUserDetails,
        UserDetails,
        setIsLoggedIn,
        setNewJobPostedTracker,
        HR_JobsListings,
        AllJobs,
        setDeleteJobTracker,
        DeleteJobTracker,
        setSearchJobText,
        SearchJobValues,
        setSearchJobValues,
        SearchJobText,
        SearchJobs,
        setJobCategory,
        FilteredJobCategory,
        setIsFilteredByCategory,
        IsFilteredByCategory,
        setIsSearch,
        IsSearch,
        setIsLoading,
        isLoading,
        setFilteredSalaryValue,
        FilteredSalaryValue,
        FilteredBySalaryJobs,
        setIsFilterBySalary,
        IsFilterBySalary,
        SubmitJobApplication,
        setNewJobApplication,
        NewJobApplication,
        setListOfJobApplications,
        ListOfJobApplications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
