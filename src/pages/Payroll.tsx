import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import SalaryDetail from "../components/SalaryDetail";
import SalaryHistory from "../components/SalaryHistory";

function Payroll() {
  const navigate = useNavigate();

  // Get role
  const role = localStorage.getItem("role");

  // Handle Process Payroll
  const handleProcessPayroll = () => {
    navigate("/Payroll/ProcessPayroll");
  };

  return (
    <div>
      {role === "ADMIN" ? (
        <>
          {/* Admin View */}
          <div className="d-flex justify-content-between align-items-center pt-3">
            <div>
              <h4>Payroll Management</h4>
              <small>Process and manage employee salaries</small>
            </div>
            <div className="d-flex flex-row gap-2">
              <button
                className="btn d-flex align-items-center gap-2 bg-white text-black"
                style={{ fontSize: "15px" }}
              >
                <FontAwesomeIcon icon={faDownload} />
                Export
              </button>

              <button
                className="btn btn-primary d-flex align-items-center gap-2"
                style={{ fontSize: "15px" }}
                onClick={handleProcessPayroll}
              >
                <FontAwesomeIcon icon={faCalculator} />
                PROCESS PAYROLL
              </button>
            </div>
          </div>

          <div className="py-3">
            <SalaryDetail />
          </div>
        </>
      ) : role === "EMPLOYEE" ? (
        <>
          <div>

            <div className="py-3">
              <SalaryHistory />
            </div>
          </div>
        </>
      ) : (
        <p className="text-center py-5">Role not recognized. Please login.</p>
      )}
    </div>
  );
}

export default Payroll;
