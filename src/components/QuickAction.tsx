import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faFileInvoice,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import "../css/QuickAction.css";
import { Link } from "react-router-dom";

function QuickAction() {
  return (
    <div
      className="card p-4 shadow-sm border-0"
      style={{ borderRadius: "12px" }}
    >
      <h5 className="border-bottom pb-4">Quick Actions</h5>

      {/* Add New Employees */}
      <Link to="/Employees/Add" className="text-decoration-none text-dark">
        <div className="d-flex align-items-center p-3 mb-3 rounded action-box">
          <div
            className="d-flex align-items-center justify-content-center me-3 action-icon"
            style={{ backgroundColor: "rgba(13,110,253,0.15)" }}
          >
            <FontAwesomeIcon icon={faUserPlus} className="text-primary" />
          </div>
          <div>
            <div className="fw-bold">Add New Employee</div>
            <small className="text-muted">Register a new employee</small>
          </div>
        </div>
      </Link>

      {/* Process Payroll */}
      <Link to="/Payroll/ProcessPayroll" className="text-decoration-none text-dark">
        <div className="d-flex align-items-center p-3 mb-3 rounded action-box">
          <div
            className="d-flex align-items-center justify-content-center me-3 action-icon"
            style={{ backgroundColor: "rgba(25,135,84,0.15)" }}
          >
            <FontAwesomeIcon icon={faFileInvoice} className="text-success" />
          </div>
          <div>
            <div className="fw-bold">Process Payroll</div>
            <small className="text-muted">Generate salary slips</small>
          </div>
        </div>
      </Link>

      {/* View Reports */}
      <Link to="/Employees/Add" className="text-decoration-none text-dark">
        <div className="d-flex align-items-center p-3 mb-3 rounded action-box">
          <div
            className="d-flex align-items-center justify-content-center me-3 action-icon"
            style={{ backgroundColor: "rgba(13,202,240,0.15)" }}
          >
            <FontAwesomeIcon icon={faChartBar} className="text-info" />
          </div>
          <div>
            <div className="fw-bold">View Reports</div>
            <small className="text-muted">Analytics and insights</small>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default QuickAction;
