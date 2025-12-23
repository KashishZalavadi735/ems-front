import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LeaveTypeData } from "../types/types";
import { createLeaveType } from "../services/leaveTypeService";
import toast from "react-hot-toast";

function AddLeaveTypesForm() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<LeaveTypeData>({
    leaveType: "",
    description: "",
  });

  // Error state
  const [errors, setErrors] = useState<Partial<LeaveTypeData>>({});

  // Handle Cancel
  const handleCancel = () => {
    navigate("/LeavesTypes");
  };

  // Validate single field
  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "leaveType":
        if (!value.trim()) error = "Leave type is required";
        else if (value.length < 3) error = "Minimum 3 characters required";
        break;

      case "description":
        if (!value.trim()) error = "Description is required";
        else if (value.length < 5) error = "Minimum 5 characters required";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle input change with live validation
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Validate entire form before submit
  const validateForm = () => {
    const newErrors: Partial<LeaveTypeData> = {};

    if (!formData.leaveType.trim()) newErrors.leaveType = "Leave type is required";
    else if (formData.leaveType.length < 3) newErrors.leaveType = "Minimum 3 characters required";

    if (!formData.description.trim()) newErrors.description = "Description is required";
    else if (formData.description.length < 5) newErrors.description = "Minimum 5 characters required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    try {
      const response = await createLeaveType(formData);
      console.log("Leave Type Created: ", response);
      toast.success("Leave type created successfully!");
      navigate("/LeavesTypes");
    } catch (error) {
      console.error("Error creating leave types: ", error);
      toast.error("Error creating leave types.");
    }
  };

  return (
    <div className="py-3">
      <div className="card p-4 shadow-sm border-0">
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label htmlFor="leaveType">Leave Type</label>
            <input
              type="text"
              className={`form-control ${errors.leaveType ? "is-invalid" : ""}`}
              name="leaveType"
              id="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
            />
            {errors.leaveType && (
              <div className="invalid-feedback">{errors.leaveType}</div>
            )}
          </div>

          <div className="mt-3">
            <label htmlFor="description">Description</label>
            <textarea
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              rows={3}
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>

          <div className="text-end mt-3">
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Leaves
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLeaveTypesForm;