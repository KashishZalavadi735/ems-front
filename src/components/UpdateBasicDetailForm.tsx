import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile, saveBasicInfo } from "../services/profileService";
import toast from "react-hot-toast";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}

function UpdateBasicDetailForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  });

  // Error state
  const [errors, setErrors] = useState<Partial<ProfileData>>({});

  // Fetch existing basic data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          contactNumber: data.contactNumber,
        });
      } catch (error) {
        console.error("Failed to fetch profile: ", error);
      }
    };
    fetchProfile();
  }, []);

  // Validate a single field
  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (!value.trim()) error = "First name is required";
        else if (value.length < 3) error = "Minimum 3 characters required";
        break;
      case "lastName":
        if (!value.trim()) error = "Last name is required";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(value))
          error = "Enter a valid email address";
        break;
      case "contactNumber":
        if (!value.trim()) error = "Contact number is required";
        else if (!/^[0-9]{10}$/.test(value))
          error = "Contact number must be 10 digits";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle input change with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Validate entire form before submit
  const validateForm = () => {
    const newErrors: Partial<ProfileData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    else if (formData.firstName.length < 3)
      newErrors.firstName = "Minimum 3 characters required";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required";
    else if (!/^[0-9]{10}$/.test(formData.contactNumber))
      newErrors.contactNumber = "Contact number must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    try {
      const data = await saveBasicInfo(formData);
      console.log("Updated Basic Info: ", data);
      toast.success("Basic info updated successfully!");
      navigate("/Profile", { state: { tab: "basic" } });
    } catch (error) {
      console.error("Failed to update basic info: ", error);
      toast.error("Failed to update basic info.");
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    navigate("/Profile", { state: { tab: "basic" } });
  };

  return (
    <div className="card p-4 shadow-sm border-0">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="contactNumber" className="form-label">
              Contact No
            </label>
            <input
              type="tel"
              className={`form-control ${errors.contactNumber ? "is-invalid" : ""}`}
              name="contactNumber"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
            {errors.contactNumber && (
              <div className="invalid-feedback">{errors.contactNumber}</div>
            )}
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
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateBasicDetailForm;