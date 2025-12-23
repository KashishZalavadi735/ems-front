import { useEffect, useState } from "react";
import "../css/RecentEmployees.css";
import { getRecentEmployees } from "../services/userService";
import { Link } from "react-router-dom";

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    joiningDate: string;
    department: string;
    status: string;
}

function RecentEmployee() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentEmployees = async () => {
      try {
        const data = await getRecentEmployees();
        console.log("Recent employees: ", data);
        setEmployees(data.employees);
      } catch (error) {
        console.error("Error fetching employees: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentEmployees();
  }, []);

  return (
    <div className="card p-4 shadow-sm border-0 h-100 table-responsive">
      <h5 className="border-bottom pb-4">Recent Employees</h5>
      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : (
        <table className="table align-middle">
          <thead>
            <tr className="text-secondary small">
              <th>NAME</th>
              <th>DEPARTMENT</th>
              <th>JOIN DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            {employees?.map((emp) => (
              <tr key={emp.id}>
                <td className="d-flex align-items-center">
                  <div className="d-flex align-items-center justify-content-center me-3 font-style-design">
                    <span className="fw-bold text-primary">
                      {emp.firstName[0]}
                      {emp.lastName[0]}
                    </span>
                  </div>

                  <div>
                    <div className="fw-bold">
                      {emp.firstName} {emp.lastName}
                    </div>
                    <small className="text-muted">{emp.email}</small>
                  </div>
                </td>
                <td>{emp.department}</td>
                <td>
                  {new Date(emp.joiningDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <span
                    className={`px-3 py-1 badge rounded-pill ${
                      emp.status === "Active"
                        ? "text-success pills-bg"
                        : "text-danger bg-light"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link
        to="/Employees"
        className="text-primary small fw-semibold ms-1 text-decoration-none"
      >
        View all employees
      </Link>
    </div>
  );
}

export default RecentEmployee;
