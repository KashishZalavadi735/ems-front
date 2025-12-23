import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PersonalData } from "../types/types";
import { getMyProfile, savePersonalInfo } from "../services/profileService";
import toast from "react-hot-toast";

function UpdatePersonalDetailForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PersonalData>({
    fatherName: "",
    fatherContact: "",
    motherName: "",
    motherContact: "",
    address: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState<Partial<PersonalData>>({});

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setFormData({
          fatherName: data.personalInfo?.fatherName ?? "",
          fatherContact: data.personalInfo?.fatherContact ?? "",
          motherName: data.personalInfo?.motherName ?? "",
          motherContact: data.personalInfo?.motherContact ?? "",
          address: data.personalInfo?.address ?? "",
          dateOfBirth: data.personalInfo?.dateOfBirth
            ? data.personalInfo.dateOfBirth.split("T")[0]
            : "",
        });
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof PersonalData, value);
  };

  // Validate single field
  const validateField = (name: keyof PersonalData, value: string) => {
    let error: string | undefined;

    switch (name) {
      case "fatherName":
      case "motherName":
        if (!value.trim()) error = "This field is required";
        else if (value.trim().length < 3) error = "Minimum 3 characters required";
        break;

      case "fatherContact":
      case "motherContact":
        if (!value.trim()) error = "This field is required";
        else if (!/^\d{10}$/.test(value.trim())) error = "Enter a valid 10-digit number";
        break;

      case "address":
        if (!value.trim()) error = "Address is required";
        else if (value.trim().length < 10) error = "Minimum 10 characters required";
        break;

      case "dateOfBirth":
        if (!value) error = "Date of Birth is required";
        else if (new Date(value) > new Date()) error = "Date of Birth cannot be in the future";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors: Partial<PersonalData> = {};
    (Object.keys(formData) as (keyof PersonalData)[]).forEach((field) => {
      validateField(field, formData[field] ?? "");
      newErrors[field] = errors[field];
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err !== undefined);
  };

  // Handle Cancel
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/Profile", { state: { tab: "personal" } });
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    try {
      await savePersonalInfo(formData);
      toast.success("Personal info updated successfully");
      navigate("/Profile", { state: { tab: "personal" } });
    } catch (error) {
      console.error("Failed to save personal info", error);
      toast.error("Failed to save personal info.");
    }
  };

  return (
    <div className="card p-4 shadow-sm border-0">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h5 className="mb-3">Personal Information</h5>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="fatherName" className="form-label">Father Name</label>
              <input
                type="text"
                className={`form-control ${errors.fatherName ? "is-invalid" : ""}`}
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
              {errors.fatherName && <div className="invalid-feedback">{errors.fatherName}</div>}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="fatherContact" className="form-label">Father's Contact No.</label>
              <input
                type="tel"
                className={`form-control ${errors.fatherContact ? "is-invalid" : ""}`}
                id="fatherContact"
                name="fatherContact"
                value={formData.fatherContact}
                onChange={handleChange}
              />
              {errors.fatherContact && <div className="invalid-feedback">{errors.fatherContact}</div>}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="motherName" className="form-label">Mother Name</label>
              <input
                type="text"
                className={`form-control ${errors.motherName ? "is-invalid" : ""}`}
                id="motherName"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
              />
              {errors.motherName && <div className="invalid-feedback">{errors.motherName}</div>}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="motherContact" className="form-label">Mother's Contact No.</label>
              <input
                type="tel"
                className={`form-control ${errors.motherContact ? "is-invalid" : ""}`}
                id="motherContact"
                name="motherContact"
                value={formData.motherContact}
                onChange={handleChange}
              />
              {errors.motherContact && <div className="invalid-feedback">{errors.motherContact}</div>}
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              rows={3}
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          <div className="row mb-3">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              className={`form-control ${errors.dateOfBirth ? "is-invalid" : ""}`}
              name="dateOfBirth"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary border-1">
            Update Personal Details
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePersonalDetailForm;