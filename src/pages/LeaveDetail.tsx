import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLeaveById } from "../services/leaveService";
import type { AdminLeaveData } from "../types/types";

function LeaveDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [leave, setLeave] = useState<AdminLeaveData | null>(null);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        if (id) {
          const data = await getLeaveById(id);
          console.log("Fetched Leave Data:", data);
          setLeave(data);
        }
      } catch (error) {
        console.error("Error fetching leave: ", error);
      }
    };
    fetchLeave();
  }, [id]);

  // Formate Date
  const formatDate = (date: string | Date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  // Handle Navigate
  const handleGoBack = () => {
    navigate("/LeavesManagement");
  };

  return (
    <div>
      <h4 className="py-4">Leave Details</h4>
      <div className="card p-4 shadow-sm border-0 table-responsive">
        {!leave ? (
            <h6>Loading leave details...</h6>
        ) : (
          <table className="table align-middle table-hover">
            <tbody>
              <tr>
                <td className="fw-semibold text-muted">Employee ID:</td>
                <td>{leave?.employee.employeeCode}</td>
              </tr>
              <tr>
                <td className="fw-semibold text-muted">Employee Name:</td>
                <td>
                  {leave?.employee.firstName} {leave?.employee.lastName}
                </td>
              </tr>
              <tr>
                <td className="fw-semibold text-muted">Employee Email:</td>
                <td>{leave?.employee.email}</td>
              </tr>
              <tr>
                <td className="fw-semibold text-muted">Leave Type:</td>
                <td>{leave?.leaveType.leaveType}</td>
              </tr>
              <tr>
                <td className="fw-semibold text-muted">
                  Employee Leave Description:
                </td>
                <td>{leave?.description}.</td>
              </tr>
              <tr>
                <td className="fw-semibold text-muted">Leave Date:</td>
                <td>
                  From {formatDate(leave?.fromDate || "")} To{" "}
                  {formatDate(leave?.toDate || "")}
                </td>
              </tr>
              <tr>
                <td className="fw-semibold text-muted">Posting Date:</td>
                <td>{formatDate(leave?.createdAt || "")}</td>
              </tr>
              <tr>
                <td className="fw-semibold text-muted">Leave Status:</td>
                <td
                  className={
                    leave.status === "Approved"
                      ? "text-success"
                      : leave.status === "Rejected"
                      ? "text-danger"
                      : "text-warning"
                  }
                >
                  {leave?.status}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="py-4 text-end">
        <button className="btn btn-outline-secondary" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default LeaveDetail;
