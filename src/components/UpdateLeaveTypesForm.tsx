import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { LeaveTypeData } from "../types/types";
import { getLeaveTypesById, updateLeaveType } from "../services/leaveTypeService";
import toast from "react-hot-toast";

function UpdateLeaveTypesForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<LeaveTypeData>({
    leaveType: "",
    description: "",
  });

  const [errors, setErrors] = useState<Partial<LeaveTypeData>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leave = await getLeaveTypesById(id!);
        setFormData({
          leaveType: leave.leaveType,
          description: leave.description,
        });
      } catch (error) {
        console.error("Error loading LeaveType Data : ", error);
      }
    };
    fetchData();
  }, [id]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    validateField(name as keyof LeaveTypeData, value);
  };

  // Validate single field
  const validateField = (name: keyof LeaveTypeData, value: string) => {
    let error: string | undefined;

    switch (name) {
      case "leaveType":
        if (!value.trim()) error = "Leave Type is required";
        else if (value.trim().length < 3) error = "Minimum 3 characters required";
        break;

      case "description":
        if (!value.trim()) error = "Description is required";
        else if (value.trim().length < 5) error = "Minimum 5 characters required";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors: Partial<LeaveTypeData> = {};

    (Object.keys(formData) as (keyof LeaveTypeData)[]).forEach((field) => {
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
      const response = await updateLeaveType(id!, formData);
      console.log("Leave Type Updated: ", response);
      toast.success("LeaveType updated successfully!");
      navigate("/LeavesTypes");
    } catch (error) {
      console.error("Error updating leave types: ", error);
      toast.error("Error updating leave types.");
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    navigate("/LeavesTypes");
  };

  return (
    <div>
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
              {errors.leaveType && <div className="invalid-feedback">{errors.leaveType}</div>}
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
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
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
                Update Leaves
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateLeaveTypesForm;