import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { EmployeeData } from "../types/types";
import { getEnums } from "../services/enumService";
import { createEmployee } from "../services/userService";
import toast from "react-hot-toast";

function AddEmployeeForm() {
  const navigate = useNavigate();

  // Handle Cancel button 
  const handleCancel = () => {
    navigate("/Employees")
  };

  const [formData, setFormData] = useState<EmployeeData>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    joiningDate: "",
    department: "",
    position: "",
    status: "",
  });

  // Error state
  const[error, setError] = useState<Partial<EmployeeData>>({});

  // Dropdowns
  const [departments, setDepartments] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);

  // Load enums
  useEffect(() => {
    const fetchEnums = async () => {
      try {
        const { departments, positions, statuses } = await getEnums();
        setDepartments(departments);
        setPositions(positions);
        setStatuses(statuses);

        // Set default selected values
        setFormData((prev) => ({
          ...prev,
          department: departments[0] || "",
          position: positions[0] || "",
          status: statuses[0] || ""
        }));
      } catch (error) {
        console.error("Error loading enums", error);
      }
    };

    fetchEnums();
  },[]);

  // Validate a single field
  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (!value.trim()) error = "First name is required";
        else if(value.length < 3) error = "Minimum 3 characters"
        break;
      
      case "lastName":
        if (!value.trim()) error = "Last name is required";
        break;

      case "email":
        if (!value.trim()) error = "Email is required";
        else if(!/^\S+@\S+\.\S+$/.test(value)) error = "Enter a valid email address";
        break;
      
      case "contactNumber":
        if (value && !/^[0-9]{10}$/.test(value)) error = "Contact number must be 10 digits";
        break;
      
      case "joiningDate":
        if (!value) error = "Joining date is required";
        break;
    }

    setError((prev) => ({...prev, [name]: error}));
  };

  // Handle Input Change with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
    validateField(name, value);
  };

  // Validate entire form before submit
  const validateForm = () => {
    const newErrors: Partial<EmployeeData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.contactNumber && !/^[0-9]{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10 digits";
    }

    if (!formData.contactNumber) {
      newErrors.joiningDate = "Joining date is required";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }
    try {
      const response = await createEmployee(formData);
      console.log("Employee Created: ",response);
      navigate("/Employees");
      toast.success('Employee created successfully! OTP sent to their email.');
    } catch (error) {
      console.error("Error creating employee: ",error);
      toast.error("Error creating employee.");
    }
  };

  return (
    <div className="card p-4 shadow-sm border-0">
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="mb-4">
          <h5 className="mb-3">Basic Information</h5>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className={`form-control ${error.firstName ? "is-invalid" : ""}`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {error.firstName && <div className="invalid-feedback">{error.firstName}</div>}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className={`form-control ${error.lastName ? "is-invalid" : ""}`}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {error.lastName && <div className="invalid-feedback">{error.lastName}</div>}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${error.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {error.email && <div className="invalid-feedback">{error.email}</div>}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="contactNumber" className="form-label">
                Contact No
              </label>
              <input
                type="tel"
                className={`form-control ${error.contactNumber ? "is-invalid" : ""}`}
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
              {error.contactNumber && <div className="invalid-feedback">{error.contactNumber}</div>}
            </div>
          </div>
        </div>

        {/* Employment Details */}
        <div className="mb-4">
          <h5 className="mb-3">Employment Details</h5>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="department" className="form-label">
                Department
              </label>
              <select className="form-select" id="department" name="department" value={formData.department} onChange={handleChange}>
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="Position" className="form-label">
                Position
              </label>
              <select className="form-select" id="position" name="position" value={formData.position} onChange={handleChange}>
                {positions.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row mb-3">

            <div className="col-12 col-md-6">
              <label htmlFor="joiningDate" className="form-label">
                Joining Date
              </label>
              <input
                type="date"
                className={`form-control ${error.joiningDate ? "is-invalid" : ""}`}
                id="joiningDate"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
              />
              {error.joiningDate && <div className="invalid-feedback">{error.joiningDate}</div>}
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <h5 className="mb-3">Status</h5>

          <div className="d-flex">
            {statuses.map((status) => (
              <div className="form-check me-4" key={status}>
                <input className="form-check-input" type="radio" name="status" value={status} checked={formData.status === status} onChange={handleChange}  />
                <label className="form-check-label">
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary border-1">Add Employee</button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployeeForm;