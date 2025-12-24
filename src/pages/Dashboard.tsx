import "../css/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Cards from "../components/Cards";
import RecentEmployee from "../components/RecentEmployee";
import QuickAction from "../components/QuickAction";
import { useEffect, useState } from "react";
import type { Employee } from "../types/types";
import toast from "react-hot-toast";

function Dashboard() {
  // Get role
  const role = localStorage.getItem("role");
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user data
  useEffect(() => {
    if (role === "EMPLOYEE") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setEmployee(JSON.parse(storedUser));
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [role]);

  // Toast on dashboard after login
  useEffect(() => {
    if (sessionStorage.getItem("dashboardToastShown")) return;

    if (role === "ADMIN") {
      toast.success("Welcome Admin 👑", {
        style: {
          borderRadius: "10px",
        },
      });
      sessionStorage.setItem("dashboardToastShown","true");
    }

    if (role === "EMPLOYEE" && employee) {
      toast(`Hello ${employee.firstName} `, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#1526dbff",
          color: "#fff",
        },
      });
      sessionStorage.setItem("dashboardToastShown", "true");
    }
  }, [role, employee]);

  if (role === "EMPLOYEE" && loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      {role === "ADMIN" ? (
        <>
          {/* aAdmin View */}
          {/* Top Cards */}
          <div className="row py-3">
            <Cards />
          </div>

          {/* Recent Employees + Quick Actions */}
          <div className="row py-3 ">
            <div className="col-12 col-lg-8 dashboard-card">
              <RecentEmployee />
            </div>

            <div className="col-12 col-lg-4">
              <QuickAction />
            </div>
          </div>
        </>
      ) : role === "EMPLOYEE" ? (
        <>
          <div>
            <div className="mt-4">
              <div
                className="card shadow-sm border-0 py-5 px-4"
                style={{
                  background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                }}
              >
                <div className="d-flex align-items-center justify-content-between user-dashboard">
                  <div>
                    <h5 className="text-white fw-bold mb-1">
                      Welcome back, {employee?.firstName}!
                    </h5>
                    <small className="text-light">
                      Here's your dashboard with all the important information.
                    </small>
                  </div>

                  <div className="text-end d-flex">
                    <div className="me-3">
                      <small className="text-light opacity-75">
                        Employee ID
                      </small>
                      <h6 className="text-white fw-bold">
                        {employee?.employeeCode}
                      </h6>
                    </div>
                    <div className="">
                      <div
                        className="d-flex align-items-center justify-content-center icon"
                        style={{ background: "rgba(255, 255, 255, 0.2)" }}
                      >
                        <FontAwesomeIcon icon={faUser} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center py-5">Role not recognized. Please login.</p>
      )}
    </div>
  );
}

export default Dashboard;
