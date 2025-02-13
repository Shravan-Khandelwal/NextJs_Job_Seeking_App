const { jobModel } = require("../Models/jobModel.js");

// ! Fetching All The Jobs
async function getAllJobs(req, res, next) {
  const jobList = await jobModel.find({ JobExpired: false });

  if (!jobList) {
    return next(new Error("No Jobs found"));
  }
  return res.status(200).json({
    success: true,
    message: "Job List are-->",
    jobList,
  });
}

//! Function For Posting A New Job
async function postJob(req, res, next) {
  // ! Check the Role of the user
  const { Role } = req.user;
  if (Role === "Job Seeker") {
    return next(new Error("Unathorized for this functionality"));
  }

  // ! Fetching All The details of the Job
  const { JobTitle, JobDescription, fixedSalary, JobCategory, JobLocation } =
    req.body;

  if (
    !JobTitle ||
    !JobDescription ||
    !JobLocation ||
    !JobCategory ||
    !fixedSalary
  ) {
    return next(new Error("Enter All The Details"));
  }

  if (fixedSalary < 100) {
    return next(new Error("Min Salary Must be Greater Than 100 !!"));
  }

  const postedBy = req.user._id;
  
  //   ! Creating a Job and adding it to the DB
  const Job = await jobModel.create({
    JobTitle,
    JobDescription,
    fixedSalary,
    JobCategory,
    JobLocation,
    postedBy,
    Job_Company_Name: req.user.CompanyName,
  });

  return res.status(200).json({
    success: true,
    message: "Job Posted successfully",
    Job,
  });
}

//! Function To Delete a Job
async function expireJob(req, res, next) {
  try {
    // ! Check the Role of the user
    const { Role } = req.user;
    if (Role === "Job Seeker") {
      return next(new Error("Unathorized for this functionality"));
    }

    const { Id } = req.params;
    // ! Find the Job from DB with the given ID
    const job = await jobModel.findById(Id);

    if (!job) {
      return next(new Error("Job not found"));
    }
    // ! Delete the Job from DB with the given ID
    await job.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    return next(new Error(error));
  }
}

// ! Function to get My Jobs From the DB
async function getMyJobs(req, res, next) {
  try {
    // ! Find the User ID from the req object
    const userId = req.user._id.toString();

    if (!userId) {
      return next(new Error("User Not Found"));
    }
    // ! Find the Jobs created By that user ID
    const MyJobsList = await jobModel.find({ postedBy: userId });

    if (!MyJobsList) {
      return next(new Error("No Jobs are created by this hiring manager"));
    }
    return res.status(200).json({
      success: true,
      message: "Jobs Fetched Successfully",
      MyJobsList,
    });
  } catch (error) {
    return next(new Error(error));
  }
}

// ! Function To Find A Job By Its ID
async function FindJobByID(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return next(new Error("No Job ID provided"));
  }

  const JobDetail = await jobModel.findById(id);

  if (!JobDetail) {
    return next(new Error("No Job Found with the given ID provided"));
  }

  return res.status(200).json({
    success: true,
    message: JobDetail,
  });
}

module.exports = { getAllJobs, postJob, expireJob, getMyJobs, FindJobByID };
