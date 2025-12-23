import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLeaveById,
  updateLeave,
  getLeaveTypes,
} from "../services/leaveService";
import toast from "react-hot-toast";

function EditLeave() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [leaveTypeId, setLeaveTypeId] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveTypes, setLeaveTypes] = useState<{ id: number; leaveType: string }[]>([]);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<{ leaveTypeId?: string; fromDate?: string; toDate?: string; status?: string }>({});
  const [loading, setLoading] = useState(true);

  const STATUS_OPTIONS = ["Pending", "Approved", "Rejected"];

  // Fetch leave details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await getLeaveTypes();
        setLeaveTypes(types);

        if (id) {
          const leave = await getLeaveById(id);
          setStatus(leave.status);
          setLeaveTypeId(leave.leaveType.id);
          setFromDate(leave.fromDate.split("T")[0]);
          setToDate(leave.toDate.split("T")[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Validation
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!leaveTypeId) newErrors.leaveTypeId = "Please select leave type";
    if (!fromDate) newErrors.fromDate = "From date is required";
    if (!toDate) newErrors.toDate = "To date is required";
    else if (fromDate && toDate && toDate < fromDate) newErrors.toDate = "To date cannot be before from date";
    if (!status) newErrors.status = "Please select status";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle Cancel Button
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/LeavesManagement");
  };

  // Handle save button
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    try {
      if (id) {
        await updateLeave(id, { status, leaveTypeId, fromDate, toDate });
        toast.success("Leave updated successfully!");
        navigate("/LeavesManagement");
      }
    } catch (error) {
      console.error("Error updating leave status: ", error);
      toast.error("Error updating leave.");
    }
  };

  if (loading) return <p>Loading leave details...</p>;

  return (
    <div className="py-3">
      <div className="card p-4 shadow-sm border-0">
        <h4>Edit Leave</h4>

        <form onSubmit={handleSave}>
          <div className="mt-2">
            <label className="form-label">Leave Type</label>
            <select
              className={`form-select ${errors.leaveTypeId ? "is-invalid" : ""}`}
              value={leaveTypeId || ""}
              onChange={(e) => setLeaveTypeId(Number(e.target.value))}
            >
              <option value="">Select Leave Type</option>
              {leaveTypes.map((lt) => (
                <option key={lt.id} value={lt.id}>
                  {lt.leaveType}
                </option>
              ))}
            </select>
            {errors.leaveTypeId && <div className="invalid-feedback">{errors.leaveTypeId}</div>}
          </div>

          <div className="mt-2">
            <label className="form-label">From Date</label>
            <input
              type="date"
              className={`form-control ${errors.fromDate ? "is-invalid" : ""}`}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            {errors.fromDate && <div className="invalid-feedback">{errors.fromDate}</div>}
          </div>

          <div className="mt-2">
            <label className="form-label">To Date</label>
            <input
              type="date"
              className={`form-control ${errors.toDate ? "is-invalid" : ""}`}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
            {errors.toDate && <div className="invalid-feedback">{errors.toDate}</div>}
          </div>

          <div className="mt-2">
            <label className="form-label">Status</label>
            <select
              className={`form-select ${errors.status ? "is-invalid" : ""}`}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.status && <div className="invalid-feedback">{errors.status}</div>}
          </div>

          <div className="mt-3 text-end">
            <button
              type="button"
              className="btn btn-outline-secondary me-3"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditLeave;