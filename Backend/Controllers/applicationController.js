const { applicationModel } = require("../Models/applicationModel.js");
const { jobModel } = require("../Models/jobModel.js");
const { userModel } = require("../Models/userMode.js");
const cloduinary = require("cloudinary");

// ! Function For Posting An Job Application
async function postApplication(req, res, next) {
  try {
    //! Check the Role of the user
    const { Role } = req.user;
    if (Role === "hiring manager") {
      return next(new Error("Unathorized for this functionality"));
    }

    // ! Uploading The Resume Document
    if (!req.files) {
      return next(new Error("Resume File is required"));
    }

    const { Resume } = req.files;

    const allowedFormat = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormat.includes(Resume.mimetype)) {
      return next(
        new Error("Resume File is required in correct format in PNG,JPEG,WEBP")
      );
    }

    const cloduinaryResponse = await cloduinary.uploader.upload(
      Resume.tempFilePath
    );

    if (!cloduinaryResponse) {
      return next(new Error("cloduinaryResponse error"));
    }
    //!

    const { Name, Address, Email, Phone, coverLetter, jobId } = req.body;

    if (!jobId) {
      return next(new Error("Job Not Found"));
    }

    const applicantInfo = {
      user: req.user._id,
      Role: "Job Seeker",
    };

    const AppliedJobDetails = await jobModel.findById(jobId);

    const ManagerInfo = {
      user: AppliedJobDetails.postedBy,
      Role: "hiring manager",
    };

    if (
      !Name ||
      !Address ||
      !Phone ||
      !coverLetter ||
      !Email ||
      !applicantInfo ||
      !ManagerInfo ||
      !Resume ||
      !jobId
    ) {
      return next(new Error("Enter All The Fields"));
    }

    const Application = await applicationModel.create({
      Name,
      Address,
      Email,
      Phone,
      coverLetter,
      applicantInfo,
      ManagerInfo,
      Resume: {
        public_id: cloduinaryResponse.public_id,
        url: cloduinaryResponse.secure_url,
      },
      JobId: jobId,
    });

    const CrrUser = await userModel.findById(req.user._id);
    const applicationResult = "Result Pending!";

    const { Job_Company_Name } = AppliedJobDetails;

    const CompanyAppliedToObject = {
      JobId: jobId,
      Name: Job_Company_Name,
      ApplicationResult: applicationResult,
    };

    //! Check for duplicates
    const alreadyApplied = CrrUser.CompanyAppliedTo.some(
      (job) => job.JobId === CompanyAppliedToObject.JobId
    );

    if (alreadyApplied) {
      return next(new Error("Cannot Apply To Same Job Again!!"));
    }

    try {
      // !Push new job application
      CrrUser.CompanyAppliedTo.push(CompanyAppliedToObject);

      // Save the updated user
      const updatedUser = await CrrUser.save();

      return res.status(200).json({
        Msg: "Job Applied successfully!",
        Application,
      });
    } catch (error) {
      console.error("Error saving job application:", error.message);
      return res.status(500).json({
        Msg: "An error occurred while adding the job application.",
        error: error.message,
      });
    }
  } catch (error) {
    return next(new Error(error.message));
  }
}

// ! Function to get the applications posted by a particular user
async function getMyApplication(req, res, next) {
  //! Check the Role of the user
  const { Role } = req.user;
  if (Role === "hiring manager") {
    return next(new Error("Unathorized for this functionality"));
  }
  //!

  //   ! Gettnig the Id of the user
  const { _id } = req.user;

  if (!_id) {
    return next(new Error("User not found"));
  }
  //   ! Fetching All the Jobs that the user has Applied for
  const myApplications = await applicationModel.find({
    "applicantInfo.user": _id,
  });

  if (myApplications.length <= 0) {
    return next(new Error("You Have Not Applied To Any of the Jobs"));
  }

  return res.status(200).json({
    success: true,
    message: "The Applications that u have applied are",
    myApplications,
  });
}

// ! Function To get All The Job Applications For A Particular hiring manager
async function JobManagerGetAllJobApplications(req, res, next) {
  try {
    //! Check the Role of the user
    const { Role } = req.user;
    if (Role === "Job Seeker") {
      return next(new Error("Unathorized for this functionality"));
    }
    //!

    const { _id } = req.user;
    console.log(_id);
    if (!_id) {
      return next(new Error("No User Found"));
    }

    const allApplication = await applicationModel.find({
      "ManagerInfo.user": _id,
    });

    if (allApplication.length <= 0) {
      return next(new Error("No Application Found for this Manager"));
    }

    return res.status(200).json({
      success: true,
      message: "The Applications that u have recived are",
      allApplication,
    });
  } catch (error) {
    return next(new Error(error.message));
  }
}

// ! Function To Reject A Job Application
async function jobSeekerDeleteApplication(req, res, next) {
  //! Check the Role of the user
  const { Role } = req.user;
  if (Role === "Job Seeker") {
    return next(new Error("Unathorized for this functionality"));
  }

  const { id } = req.params;

  if (!id) {
    return next(new Error("Id Is Required"));
  }

  const jobApplication = await applicationModel.findById(id);

  if (!jobApplication) {
    return next(new Error("Job Application Not Found"));
  }

  const AppliedByUserDetails = await userModel.findById(
    jobApplication.applicantInfo.user.toString()
  );

  const FinalResult = "Rejected";

  const AppliedToCompany = AppliedByUserDetails.CompanyAppliedTo.find(
    (Job) => Job.JobId == jobApplication.JobId
  );

  if (AppliedToCompany) {
    AppliedToCompany.ApplicationResult = FinalResult;
    await AppliedByUserDetails.save();
  }

  await jobApplication.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Job Application deleted successfully",
  });
}

// ! Function To Accept The Job Application
async function AcceptJobApplication(req, res, next) {
  try {
    //! Check the Role of the user
    const { Role } = req.user;
    if (Role === "Job Seeker") {
      return next(new Error("Unathorized for this functionality"));
    }

    const { id } = req.params;
    if (!id) {
      return next(new Error("Id Is Required"));
    }

    const JobApplication = await applicationModel.findById(id);

    if (!JobApplication) {
      return next(new Error("Job Application Not Found"));
    }

    const AppliedUserDetails = await userModel.findById(
      JobApplication.applicantInfo.user.toString()
    );

    if (AppliedUserDetails) {
      const AppliedToCompany = AppliedUserDetails.CompanyAppliedTo.find(
        (Job) => Job.JobId == JobApplication.JobId
      );

      if (AppliedToCompany) {
        AppliedToCompany.ApplicationResult = "Selected";
        await AppliedUserDetails.save();
        console.log(AppliedUserDetails);
        await JobApplication.deleteOne();
      }

      return res.status(200).json({
        Msg: "You Are Selected!!",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  postApplication,
  getMyApplication,
  JobManagerGetAllJobApplications,
  jobSeekerDeleteApplication,
  AcceptJobApplication,
};
