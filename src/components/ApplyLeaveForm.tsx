import React, { useState, useEffect } from "react";
import { applyLeave, getLeaveTypes } from "../services/leaveService";
import type { LeaveType, LeaveData } from "../types/types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ApplyLeaveForm() {
  const navigate = useNavigate();
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);

  const [formData, setFormData] = useState<LeaveData>({
    leaveTypeId: 0,
    fromDate: "",
    toDate: "",
    description: "",
  });

  const [errors, setErrors] = useState<Partial<LeaveData>>({});

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name } = e.target;
    let value: string | number = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  // Validate a single field
  const validateField = (name: string, value: string | number) => {
    let error = "";

    switch (name) {
      case "fromDate":
        if (!value) error = "From date is required";
        break;
      case "toDate":
        if (!value) error = "To date is required";
        else if (formData.fromDate && value < formData.fromDate)
          error = "To date cannot be before From date";
        break;
      case "description":
        if (!value.toString().trim()) error = "Description is required";
        else if (value.toString().length < 5)
          error = "Minimum 5 characters required";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors: Partial<LeaveData> = {};

    if (!formData.fromDate) newErrors.fromDate = "From date is required";

    if (!formData.toDate) newErrors.toDate = "To date is required";
    else if (formData.fromDate && formData.toDate < formData.fromDate)
      newErrors.toDate = "To date cannot be before From date";

    if (!formData.description.trim())
      newErrors.description = "Description is required";
    else if (formData.description.length < 5)
      newErrors.description = "Minimum 5 characters required";

    setErrors(newErrors);
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
      const response = await applyLeave(formData);
      console.log("Applied Leave: ", response);

      setFormData({
        leaveTypeId: 0,
        fromDate: "",
        toDate: "",
        description: "",
      });

      toast.success("Leave Applied!");
      navigate("/Leave");
    } catch (error) {
      console.error("Error applying leave: ", error);
      toast.error("Error applying leave.");
    }
  };

  // Fetch leave types
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const data = await getLeaveTypes();
        setLeaveTypes(data || []);
      } catch (error) {
        console.error("Error fetching leave types: ", error);
      }
    };
    fetchLeaveTypes();
  }, []);

  const handleCancel = () => navigate("/Leave");

  return (
    <div className="card p-4 shadow-sm border-0">
      <form onSubmit={handleSubmit}>
        {/* Leave Type */}
        <div>
          <label htmlFor="leaveTypeId" className="form-label">
            Leave Type
          </label>
          <select
            className="form-control"
            name="leaveTypeId"
            id="leaveTypeId"
            value={formData.leaveTypeId}
            onChange={handleChange}
          >
            <option value={0}>Select leave type...</option>
            {leaveTypes.map((leave) => (
              <option key={leave.id} value={leave.id}>
                {leave.leaveType}
              </option>
            ))}
          </select>
        </div>

        {/* From & To Dates */}
        <div className="mt-3 row">
          <div className="col-12 col-md-6">
            <label htmlFor="fromDate" className="form-label">
              From Date
            </label>
            <input
              type="date"
              className={`form-control ${errors.fromDate ? "is-invalid" : ""}`}
              name="fromDate"
              id="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
            />
            {errors.fromDate && (
              <div className="invalid-feedback">{errors.fromDate}</div>
            )}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="toDate" className="form-label">
              To Date
            </label>
            <input
              type="date"
              className={`form-control ${errors.toDate ? "is-invalid" : ""}`}
              name="toDate"
              id="toDate"
              value={formData.toDate}
              onChange={handleChange}
            />
            {errors.toDate && (
              <div className="invalid-feedback">{errors.toDate}</div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-3">
          <label htmlFor="description">Description</label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            name="description"
            id="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-3 text-end">
          <button
            type="button"
            className="btn btn-outline-secondary me-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplyLeaveForm;