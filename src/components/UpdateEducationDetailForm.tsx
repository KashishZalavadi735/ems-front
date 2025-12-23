import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { EducationData } from "../types/types";
import { getMyProfile, saveEducationInfo } from "../services/profileService";
import toast from "react-hot-toast";

function UpdateEducationDetailForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<EducationData>({
    uDegree: "",
    uCollege: "",
    uYear: "",
    uCGPA: 0,

    pDegree: "",
    pCollege: "",
    pYear: "",
    pCGPA: 0,

    phdResearch: "",
    phdCollege: "",
    phdYear: "",
    phdResult: "",
  });

  // Define error type
  type EducationErrors = {
    [K in keyof EducationData]?: string;
  };

  // Use this type for errors state
  const [errors, setErrors] = useState<EducationErrors>({});

  // Fetch Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setFormData({
          uDegree: data.educationInfo?.uDegree ?? "",
          uCollege: data.educationInfo?.uCollege ?? "",
          uYear: data.educationInfo?.uYear ?? "",
          uCGPA: data.educationInfo?.uCGPA ?? 0,

          pDegree: data.educationInfo?.pDegree ?? "",
          pCollege: data.educationInfo?.pCollege ?? "",
          pYear: data.educationInfo?.pYear ?? "",
          pCGPA: data.educationInfo?.pCGPA ?? 0,

          phdResearch: data.educationInfo?.phdResearch ?? "",
          phdCollege: data.educationInfo?.phdCollege ?? "",
          phdYear: data.educationInfo?.phdYear ?? "",
          phdResult: data.educationInfo?.phdResult ?? "",
        });
      } catch (error) {
        console.error("Failed to fetch education info: ", error);
      }
    };
    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("CGPA") ? Number(value) : value,
    }));
    validateField(name as keyof EducationData, value);
  };

  // Validate single field
  const validateField = (name: keyof EducationData, value: string | number) => {
    let error: string | undefined;

    // Only validate if value is not empty
    if (value === "" || value === 0) {
      error = undefined;
    } else {
      switch (name) {
        case "uDegree":
        case "pDegree":
        case "phdResearch":
        case "phdResult":
          if (value.toString().trim().length < 3)
            error = "Minimum 3 characters requires";
          break;

        case "uCollege":
        case "pCollege":
        case "phdCollege":
          if (value.toString().trim().length < 3)
            error = "Minimum 3 characters requires";
          break;

        case "uYear":
        case "pYear":
        case "phdYear":
          if (!/^\d{4}$/.test(value.toString().trim()))
            error = "Enter valid 4 digit year";
          break;

        case "uCGPA":
        case "pCGPA":
          if (Number(value) < 0 || Number(value) > 10)
            error = "CGPA must be between 0 and 10";
          break;

        default:
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors: EducationErrors = {};

    (Object.keys(formData) as (keyof EducationData)[]).forEach((field) => {
      const value = formData[field] ?? "";

      let error: string | undefined;

      // Only validate if the user has entered a value
      if (value !== "" && value !== 0) {
        switch (field) {
          case "uDegree":
          case "pDegree":
          case "phdResearch":
          case "phdResult":
            if ((value?.toString() ?? "").trim().length < 3)
              error = "Minimum 3 characters requires";
            break;

          case "uCollege":
          case "pCollege":
          case "phdCollege":
            if ((value?.toString() ?? "").trim().length < 3)
              error = "Minimum 3 characters requires";
            break;

          case "uYear":
          case "pYear":
          case "phdYear":
            if (!/^\d{4}$/.test((value?.toString() ?? "").trim()))
              error = "Enter valid 4 digit year";
            break;

          case "uCGPA":
          case "pCGPA":
            if (Number(value) < 0 || Number(value) > 10)
              error = "CGPA must be between 0 and 10";
            break;

          default:
            break;
        }
      }

      newErrors[field] = error;
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err !== undefined);
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    try {
      const data = await saveEducationInfo(formData);
      console.log("Updated Education Info: ", data);
      navigate("/Profile", { state: { tab: "education" } });
      toast.success("Education details updated successfully!");
    } catch (error) {
      console.error("Failed to save education info: ", error);
      toast.error("Failed to save education info.");
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    navigate("/Profile", { state: { tab: "education" } });
  };

  return (
    <div className="card p-4 shadow-sm border-0">
      <form onSubmit={handleSubmit}>
        {/* Education Information */}
        <div className="mb-4">
          <h5 className="mb-3">Education Information</h5>

          <h6>Under Graduation</h6>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="uDegree" className="form-label">
                Degree Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.uDegree ? "is-invalid" : ""}`}
                id="uDegree"
                name="uDegree"
                onChange={handleChange}
                value={formData.uDegree}
              />
              {errors.uDegree && (
                <div className="invalid-feedback">{errors.uDegree}</div>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="uCollege" className="form-label">
                University / College
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.uCollege ? "is-invalid" : ""
                }`}
                id="uCollege"
                name="uCollege"
                onChange={handleChange}
                value={formData.uCollege}
              />
              {errors.uCollege && (
                <div className="invalid-feedback">{errors.uCollege}</div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="uYear" className="form-label">
                Passing Year
              </label>
              <input
                type="text"
                className={`form-control ${errors.uYear ? "is-invalid" : ""}`}
                id="uYear"
                name="uYear"
                onChange={handleChange}
                value={formData.uYear}
              />
              {errors.uYear && (
                <div className="invalid-feedback">{errors.uYear}</div>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="uCGPA" className="form-label">
                CGPA
              </label>
              <input
                type="text"
                className={`form-control ${errors.uCGPA ? "is-invalid" : ""}`}
                id="uCGPA"
                name="uCGPA"
                onChange={handleChange}
                value={formData.uCGPA}
              />
              {errors.uCGPA && (
                <div className="invalid-feedback">{errors.uCGPA}</div>
              )}
            </div>
          </div>

          <h6>Post Graduation</h6>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="pDegree" className="form-label">
                Degree Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.pDegree ? "is-invalid" : ""}`}
                id="pDegree"
                name="pDegree"
                onChange={handleChange}
                value={formData.pDegree}
              />
              {errors.pDegree && (
                <div className="invalid-feedback">{errors.pDegree}</div>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="pCollege" className="form-label">
                University / College
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.pCollege ? "is-invalid" : ""
                }`}
                id="pCollege"
                name="pCollege"
                onChange={handleChange}
                value={formData.pCollege}
              />
              {errors.pCollege && (
                <div className="invalid-feedback">{errors.pCollege}</div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="pYear" className="form-label">
                Passing Year
              </label>
              <input
                type="text"
                className={`form-control ${errors.pYear ? "is-invalid" : ""}`}
                id="pYear"
                name="pYear"
                onChange={handleChange}
                value={formData.pYear}
              />
              {errors.pYear && (
                <div className="invalid-feedback">{errors.pYear}</div>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="pCGPA" className="form-label">
                CGPA
              </label>
              <input
                type="text"
                className={`form-control ${errors.pCGPA ? "is-invalid" : ""}`}
                id="pCGPA"
                name="pCGPA"
                onChange={handleChange}
                value={formData.pCGPA}
              />
              {errors.pCGPA && (
                <div className="invalid-feedback">{errors.pCGPA}</div>
              )}
            </div>
          </div>

          <h6>PhD</h6>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="phdResearch" className="form-label">
                Research Area / Thesis Topic
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.phdResearch ? "is-invalid" : ""
                }`}
                id="phdResearch"
                name="phdResearch"
                onChange={handleChange}
                value={formData.phdResearch}
              />
              {errors.phdResearch && (
                <div className="invalid-feedback">{errors.phdResearch}</div>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="phdCollege" className="form-label">
                University / College
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.phdCollege ? "is-invalid" : ""
                }`}
                id="phdCollege"
                name="phdCollege"
                onChange={handleChange}
                value={formData.phdCollege}
              />
              {errors.phdCollege && (
                <div className="invalid-feedback">{errors.phdCollege}</div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="phdYear" className="form-label">
                Passing Year
              </label>
              <input
                type="text"
                className={`form-control ${errors.phdYear ? "is-invalid" : ""}`}
                id="phdYear"
                name="phdYear"
                onChange={handleChange}
                value={formData.phdYear}
              />
              {errors.phdYear && (
                <div className="invalid-feedback">{errors.phdYear}</div>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="phdResult" className="form-label">
                Result
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.phdResult ? "is-invalid" : ""
                }`}
                id="phdResult"
                name="phdResult"
                onChange={handleChange}
                value={formData.phdResult}
              />
              {errors.phdResult && (
                <div className="invalid-feedback">{errors.phdResult}</div>
              )}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary border-1">
            Update Educational Details
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateEducationDetailForm;
