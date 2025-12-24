import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMyProfile } from "../services/profileService";
import type { ProfileData } from "../types/types";
import "../css/EmployeeData.css";

function EmployeeData() {
  const location = useLocation();
  const initialTab = location.state?.tab ?? "basic";
  const [activeTab, SetActiveTab] = useState(initialTab);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const navigate = useNavigate();

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        console.log("Profile fetched: ", data);
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  // Navigate to Dashboard
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  // Navigate to Update Detail
  const handleDetails = () => {
    navigate("/Profile/EditDetails");
  };

  // Navigate to Update Personal Detail
  const handleEditPersonalDetails = () => {
    navigate("/Profile/EditPersonalDetails");
  };

  // Navigate to Update Educational Detail
  const handleEditEducationDetail = () => {
    navigate("/Profile/EditEducationDetails");
  };

  return (
    <div className="card shadow-sm border-0 h-100 mt-4">
      {/* Header */}
      <div className="p-4 text-white" style={{ backgroundColor: "#4C3FE1" }}>
        <div className="d-flex justify-content-between align-items-center profile-header">
          <div className="d-flex align-items-center">
            <div
              className="bg-white text-primary fw-bold rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{ width: "60px", height: "60px" }}
            >
              {`${profile.firstName?.[0] ?? "-"}${profile.lastName?.[0] ?? "-"}`}
            </div>
            <div>
              <h4>
                {profile.firstName} {profile.lastName}
              </h4>
              <small>
                {profile.position} • {profile.department} Department
              </small>
            </div>
          </div>

          <div className="text-end">
            <span className="rounded-pill bg-success px-3">
              {profile.status}
            </span>
            <div className="mt-1 small">
              Employee ID: {profile.employeeCode}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs px-3 mt-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "basic" ? "active" : ""}`}
            onClick={() => SetActiveTab("basic")}
          >
            Basic Information
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "personal" ? "active" : ""}`}
            onClick={() => SetActiveTab("personal")}
          >
            Personal Information
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "education" ? "active" : ""}`}
            onClick={() => SetActiveTab("education")}
          >
            Education Details
          </button>
        </li>
      </ul>

      {/* Content */}
      <div className="card-body">
        {/* For Basic Information */}
        {activeTab === "basic" && (
          <div className="row">
            <div className="col-12 col-md-6">
              <h5 className="mb-3">Personal Details</h5>
              <p className="fw-semibold mb-1">Full Name</p>
              <p>
                {profile.firstName} {profile.lastName}
              </p>
              <p className="fw-semibold mb-1">Email Address</p>
              <p>{profile.email}</p>
              <p className="fw-semibold mb-1">Phone Number</p>
              <p>{profile.contactNumber}</p>
            </div>

            <div className="col-12 col-md-6">
              <h5 className="mb-3">Employement Details</h5>
              <p className="fw-semibold mb-1">Department</p>
              <p>{profile.department}</p>
              <p className="fw-semibold mb-1">Position</p>
              <p>{profile.position}</p>
              <p className="fw-semibold mb-1">Join Date</p>
              <p>{new Date(profile.joiningDate).toLocaleDateString()}</p>
            </div>

            <div className="card-footer bg-white d-flex justify-content-end">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </button>
              <button className="btn btn-primary" onClick={handleDetails}>
                Edit Details
              </button>
            </div>
          </div>
        )}

        {/* For Personal Information */}
        {activeTab === "personal" && (
          <div className="row">
            <h5 className="mb-3">Personal Information</h5>
            <div className="col-12 col-md-6">
              <p className="fw-semibold mb-1">Father Name</p>
              <p>{profile.personalInfo?.fatherName ?? "-"}</p>
              <p className="fw-semibold mb-1">Contact No.</p>
              <p>{profile.personalInfo?.fatherContact ?? "-"}</p>
              <p className="fw-semibold mb-1">Mother Name</p>
              <p>{profile.personalInfo?.motherName ?? "-"}</p>
              <p className="fw-semibold mb-1">Contact No.</p>
              <p>{profile.personalInfo?.motherContact ?? "-"}</p>
            </div>

            <div className="col-12 col-md-6">
              <p className="fw-semibold mb-1">Address</p>
              <p>{profile.personalInfo?.address ?? "-"}</p>
              <p className="fw-semibold mb-1">Date of Birth</p>
              <p>{new Date(profile.personalInfo?.dateOfBirth ?? "-").toLocaleDateString()}</p>
            </div>

            <div className="card-footer bg-white d-flex justify-content-end">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </button>
              <button
                className="btn btn-primary"
                onClick={handleEditPersonalDetails}
              >
                Edit Personal Details
              </button>
            </div>
          </div>
        )}

        {/* For Educational Information */}
        {activeTab === "education" && (
          <div className="row">
            <h5 className="mb-3">Education Details</h5>
            <div className="col-12 col-md-4">
              <h6 className="text-decoration-underline">Under Graduation</h6>
              <p className="fw-semibold mb-1">Degree Name</p>
              <p>{profile.educationInfo?.uDegree ?? "-"}</p>
              <p className="fw-semibold mb-1">University / College</p>
              <p>{profile.educationInfo?.uCollege ?? "-"}</p>
              <p className="fw-semibold mb-1">Passing Year</p>
              <p>{profile.educationInfo?.uYear ?? "-"}</p>
              <p className="fw-semibold mb-1">CGPA</p>
              <p>{profile.educationInfo?.uCGPA ?? "-"}</p>
            </div>

            <div className="col-12 col-md-4">
              <h6 className="text-decoration-underline">Post Graduation</h6>
              <p className="fw-semibold mb-1">Degree Name</p>
              <p>{profile.educationInfo?.pDegree ?? "-"}</p>
              <p className="fw-semibold mb-1">University / College</p>
              <p>{profile.educationInfo?.pCollege ?? "-"}</p>
              <p className="fw-semibold mb-1">Passing Year</p>
              <p>{profile.educationInfo?.pYear ?? "-"}</p>
              <p className="fw-semibold mb-1">CGPA</p>
              <p>{profile.educationInfo?.pCGPA ?? "-"}</p>
            </div>

            <div className="col-12 col-md-4">
              <h6 className="text-decoration-underline">PhD</h6>
              <p className="fw-semibold mb-1">Research Area / Thesis Topic</p>
              <p>{profile.educationInfo?.phdResearch ?? "-"}</p>
              <p className="fw-semibold mb-1">University / College</p>
              <p>{profile.educationInfo?.phdCollege ?? "-"}</p>
              <p className="fw-semibold mb-1">Passing Year</p>
              <p>{profile.educationInfo?.phdYear ?? "-"}</p>
              <p className="fw-semibold mb-1">Result</p>
              <p>{profile.educationInfo?.phdResult ?? "-"}</p>
            </div>

            <div className="card-footer bg-white d-flex justify-content-end">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </button>
              <button
                className="btn btn-primary"
                onClick={handleEditEducationDetail}
              >
                Edit Educational Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeData;
