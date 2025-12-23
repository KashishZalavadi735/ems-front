import { useState, useEffect } from "react";
import { getUserLeaves } from "../services/leaveService";
import type { Leave } from "../types/types";

function LeaveHistory() {
  const [leaves, setLeaves] = useState<Leave[]>([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const data = await getUserLeaves();
        setLeaves(data);
      } catch (error) {
        console.error("Error ferching leaves: ", error);
      }
    };
    fetchLeaves();
  }, []);

  const formatDate = (date: string | Date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  return (
    <div className="card p-4 shadow-sm border-0 table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(leaves) && leaves.length > 0 ? (
            leaves.map((leave, index) => (
              <tr key={leave.id}>
                <td>{index + 1}</td>
                <td>{leave.leaveType?.leaveType || "-"}</td>
                <td>{formatDate(leave.fromDate)}</td>
                <td>{formatDate(leave.toDate)}</td>
                <td>{leave.description || "-"}</td>
                <td
                  className={`${
                    leave.status === "Approved"
                      ? "text-success"
                      : leave.status === "Rejected"
                      ? "text-danger"
                      : "text-muted"
                  }`}
                >
                  {leave.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No leaves found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveHistory;
