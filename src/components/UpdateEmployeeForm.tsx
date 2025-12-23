import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { EmployeeData } from "../types/types";
import { getEnums } from "../services/enumService";
import { getEmployeeById, updateEmployee } from "../services/userService";
import toast from "react-hot-toast";

function UpdateEmployeeForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  const [departments, setDepartments] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);

  // Error state
  const [errors, setErrors] = useState<Partial<EmployeeData>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { departments, positions, statuses } = await getEnums();
        setDepartments(departments);
        setPositions(positions);
        setStatuses(statuses);

        // Fetch employee
        const employee = await getEmployeeById(id!);

        // Convert joiningDate to yyyy-MM-dd for input
        const formattedDate = employee.joiningDate
          ? new Date(employee.joiningDate).toISOString().substring(0, 10)
          : "";

        setFormData({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          contactNumber: employee.contactNumber,
          joiningDate: formattedDate,
          department: employee.department,
          position: employee.position,
          status: employee.status,
        });
      } catch (error) {
        console.error("Error loading employee/enums : ", error);
      }
    };
    fetchData();
  }, [id]);

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    validateField(name as keyof EmployeeData, value);
  };

  // Single field validation
  const validateField = (name: keyof EmployeeData, value: string) => {
    let error: string | undefined;

    switch (name) {
      case "firstName":
      case "lastName":
      case "department":
      case "position":
      case "status":
        if (!value.trim()) error = "This field is required";
        break;

      case "email":
        if (!value.trim()) error = "Email is required";
        else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.trim())
        )
          error = "Invalid email format";
        break;

      case "contactNumber":
        if (value && !/^\d{10,15}$/.test(value.trim()))
          error = "Invalid contact number";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors: Partial<EmployeeData> = {};
    (Object.keys(formData) as (keyof EmployeeData)[]).forEach((field) => {
      const value = formData[field] ?? "";
      validateField(field, value.toString());
      newErrors[field] = errors[field];
    });

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err !== undefined);
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    try {
      const dataToSubmit = {
        ...formData,
        joiningDate: formData.joiningDate
          ? new Date(formData.joiningDate)
          : null,
      };

      const response = await updateEmployee(id!, dataToSubmit);
      console.log("Employee Updated: ", response);
      toast.success("Employee updated successfully!");
      navigate("/Employees");
    } catch (error) {
      console.error("Error updating employee: ", error);
      toast.error("Error updating employee.");
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    navigate("/Employees");
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
                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
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
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="contactNumber" className="form-label">
                Contact No
              </label>
              <input
                type="tel"
                className={`form-control ${errors.contactNumber ? "is-invalid" : ""}`}
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
              {errors.contactNumber && (
                <div className="invalid-feedback">{errors.contactNumber}</div>
              )}
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
              <select
                className={`form-select ${errors.department ? "is-invalid" : ""}`}
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.department && (
                <div className="invalid-feedback">{errors.department}</div>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="position" className="form-label">
                Position
              </label>
              <select
                className={`form-select ${errors.position ? "is-invalid" : ""}`}
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              >
                <option value="">Select Position</option>
                {positions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              {errors.position && (
                <div className="invalid-feedback">{errors.position}</div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="joiningDate" className="form-label">
                Joining Date
              </label>
              <input
                type="date"
                className="form-control"
                id="joiningDate"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <h5 className="mb-3">Status</h5>

          <div className="d-flex">
            {statuses.map((status) => (
              <div className="form-check me-4" key={status}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  value={status}
                  checked={formData.status === status}
                  onChange={handleChange}
                />
                <label className="form-check-label">{status}</label>
              </div>
            ))}
            {errors.status && (
              <div className="text-danger ms-2">{errors.status}</div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary border-1">
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateEmployeeForm;