import { useNavigate } from "react-router-dom";
import ManageLeave from "../components/ManageLeaveTypes";
import "../css/Style.css"

function LeavesTypes() {
  const navigate = useNavigate();

  const handleAddLeaveType = () => {
    navigate("/LeavesTypes/AddLeaveTypes")
  }
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center py-3 header-class">
        <div>
          <h4>Leaves Types</h4>
          <small>Add and Manage types of Leaves.</small>
        </div>
        <div>
          <button
            className="btn d-flex align-items-center gap-2 btn-primary"
            style={{ fontSize: "15px" }}
            onClick={handleAddLeaveType}
          >
            ADD LEAVE TYPE
          </button>
        </div>
      </div>

      {/* Manage Leave Type */}
      <div className="py-3">
        <ManageLeave />
      </div>
    </div>
  );
}

export default LeavesTypes;
