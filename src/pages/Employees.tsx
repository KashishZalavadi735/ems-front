import EmployeeList from "../components/EmployeeList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Employees() {
  const navigate = useNavigate();

  const handleAddEmployee = () => {
    navigate("/Employees/Add");
  }
  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center py-3">
        <div>
          <h4>Employee Management</h4>
          <small>Manage all employees in your organization</small>
        </div>
        <div>
          <button
            className="btn d-flex align-items-center gap-2 btn-primary"
            style={{ fontSize: "15px" }}
            onClick={handleAddEmployee}
          >
            <FontAwesomeIcon icon={faUserPlus} />
            ADD EMPLOYEE
          </button>
        </div>
      </div>

      {/* Employee List */}
        <EmployeeList />

      
    </div>
  );
}

export default Employees;