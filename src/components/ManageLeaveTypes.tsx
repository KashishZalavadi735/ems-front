import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LeaveType } from "../types/types";
import { deleteLeaveType, getLeaveTypes } from "../services/leaveTypeService";
import toast from "react-hot-toast";

function ManageLeave() {
  const navigate = useNavigate();

  const [leaveType, setLeaveTypes] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch LeaveTypes from Backend
  const fetchLeaveTypes = async () => {
    try {
      const data = await getLeaveTypes();
      setLeaveTypes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leave types : ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  // Handle Edit Leave Type
  const handleUpdateLeaveType = (id: number) => {
    navigate(`/LeavesTypes/UpdateLeaveTypes/${id}`);
  };

  // Handle Delete Leave Type
  const handleDeleteLeaveType = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this leave type?"))
      return;

    try {
      const response = await deleteLeaveType(id);
      console.log("LeaveType Deleted: ", response);
      setLeaveTypes(leaveType.filter((lt) => lt.id !== id));
      toast.success("Leave Type deleted successfully!");
    } catch (error) {
      console.error("Error deleting leavetype: ", error);
      toast.error("Error deleting leavetype.");
    }
  };

  return (
    <div className="card p-4 shadow-sm border-0 table-responsive">
      {loading ? (
        <h6>Loading Leave Types...</h6>
      ) : (
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Leave Type</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(leaveType) && leaveType.map((lt, index) => (
                <tr key={lt.id}>
                    <td>{index+1}</td>
                    <td>{lt.leaveType}</td>
                    <td>{lt.description}</td>
                    <td style={{cursor: "pointer"}}>
                        <i className="bi bi-pencil-square text-info mx-3" onClick={() => {handleUpdateLeaveType(lt.id)}}></i>
                        <i className="bi bi-trash text-danger" onClick={() => {handleDeleteLeaveType(lt.id)}}></i>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageLeave;
