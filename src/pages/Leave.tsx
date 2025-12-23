import { useNavigate } from "react-router-dom";
import LeaveHistory from "../components/LeaveHistory";

function Leave() {
  const navigate = useNavigate()

  const handleApplyLeave = () => {
    navigate("/Leave/ApplyLeave")
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center py-3">
        <div>
          <h4>Leave History</h4>
          <small>Add and Manage your Leaves.</small>
        </div>
        <div>
          <button
            className="btn d-flex align-items-center gap-2 btn-primary"
            style={{ fontSize: "15px" }}
            onClick={handleApplyLeave}
          >
            APPLY FOR LEAVE
          </button>
        </div>
      </div>
      
      <div className="py-3">
        <LeaveHistory />
      </div>
    </div>
  );
}

export default Leave;
