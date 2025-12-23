import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AdminLeaveData } from "../types/types";
import { getAllLeaves } from "../services/leaveService";

function ManageLeaves() {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState<AdminLeaveData[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch all Leaves
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const data = await getAllLeaves(page, limit);
        setLeaves(data.leaves || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching leaves: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, [page]);

  // Formate Date
  const formatDate = (date: string | Date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  // Handle View More
  const handleViewMore = (id: number) => {
    navigate(`/LeavesManagement/LeaveDetail/${id}`);
  };

  // Handle Edit
  const handleEdit = (id: number) => {
    navigate(`/LeavesManagement/EditLeave/${id}`);
  };

  return (
    <div className="card p-4 shadow-sm border-0 table-responsive">
      {loading ? (
        <h6>Loading Leaves...</h6>
      ) : (
        <>
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-muted">
                    No leaves found
                  </td>
                </tr>
              ) : (
                Array.isArray(leaves) &&
                leaves.map((leave, index) => (
                  <tr key={leave.id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>
                      {leave.employee.firstName} {leave.employee.lastName}
                    </td>
                    <td>{leave.leaveType.leaveType}</td>
                    <td>{formatDate(leave.fromDate)}</td>
                    <td>{formatDate(leave.toDate)}</td>
                    <td>
                      <span
                        className={`${
                          leave.status === "Approved"
                            ? "text-success"
                            : leave.status === "Rejected"
                            ? "text-danger"
                            : "text-muted"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    <td style={{ cursor: "pointer" }} className="text-center">
                      <i
                        className="bi bi-pencil-square text-info me-3"
                        onClick={() => handleEdit(leave.id)}
                      ></i>
                      <i
                        className="bi bi-eye text-primary"
                        onClick={() => handleViewMore(leave.id)}
                      ></i>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              className="btn btn-outline-secondary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              className="btn btn-outline-secondary"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ManageLeaves;