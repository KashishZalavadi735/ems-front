import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faUsers,
  faFileInvoiceDollar,
  faRightFromBracket,
  faUser,
  faCalendarAlt,
  faPersonWalking,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { User } from "../types/types";

interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

function Sidebar({ isSidebarOpen, closeSidebar }: SidebarProps) {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("dashboardToastShown");
    navigate("/");
    closeSidebar();
  };

  const role = user?.role || null;

  return (
    
      <div className={`sidebar ${isSidebarOpen ? "mobile-open" : ""}`}>
        <div className="d-flex flex-column justify-content-between pt-3 sidebar-outer" style={{height: "100%"}}>
          {/* Header */}
          {/* <div className="ps-3">
            <h5>EMS</h5>
          </div> */}

          {/* <hr style={{borderColor: "rgba(255, 255, 255, 0.5)"}} /> */}

          {/* User Info */}
          <div className="d-flex align-items-center gap-3 ps-3 admin mb-3 mt-3">
            <FontAwesomeIcon icon={faUser} />
            <div>
              <div className="fw-bold">
                {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
              </div>
              <div className="small">{user ? user.email : "No Email"}</div>
            </div>
          </div>

          <hr style={{borderColor: "rgba(255, 255, 255, 0.5)"}} />

          {/* Menu */}
          <nav className="flex-grow-1">
            <ul className="nav flex-column">
              {/* Dashboard (Both) */}
              <li className="nav-item mb-2">
                <Link to="/dashboard" className="nav-link text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faGauge} className="me-2" />
                  Dashboard
                </Link>
              </li>

              {/* ADMIN MENU */}
              {role === "ADMIN" && (
                <>
                  <li className="nav-item mb-2">
                    <Link to="/Employees" className="nav-link text-white" onClick={closeSidebar}>
                      <FontAwesomeIcon icon={faUsers} className="me-2" />
                      Employees
                    </Link>
                  </li>

                  <li className="nav-item mb-2">
                    <Link to="/LeavesTypes" className="nav-link text-white" onClick={closeSidebar}>
                      <FontAwesomeIcon
                        icon={faPersonWalking}
                        className="me-2"
                      />
                      Leaves Types
                    </Link>
                  </li>

                  <li className="nav-item mb-2">
                    <Link
                      to="/LeavesManagement"
                      className="nav-link text-white"
                      onClick={closeSidebar}
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                      Leaves Management
                    </Link>
                  </li>
                </>
              )}

              {/* EMPLOYEE MENU */}
              {role === "EMPLOYEE" && (
                <>
                  <li className="nav-item mb-2">
                    <Link to="/Profile" className="nav-link text-white" onClick={closeSidebar}>
                      <FontAwesomeIcon icon={faCircleUser} className="me-2" />
                      My Profile
                    </Link>
                  </li>

                  <li className="nav-item mb-2">
                    <Link to="/Leave" className="nav-link text-white" onClick={closeSidebar}>
                      <FontAwesomeIcon
                        icon={faPersonWalking}
                        className="me-2"
                      />
                      Leave
                    </Link>
                  </li>
                </>
              )}

              {/* Payroll (Both) */}
              <li className="nav-item mb-2">
                <Link to="/Payroll" className="nav-link text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon
                    icon={faFileInvoiceDollar}
                    className="me-2"
                  />
                  Payroll
                </Link>
              </li>
            </ul>
          </nav>

          <hr style={{borderColor: "rgba(255, 255, 255, 0.5)"}} />

          {/* Logout */}
          <div className="mb-2 ps-3">
            <button
              onClick={handleLogout}
              className="nav-link text-white bg-transparent border-0"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    
  );
}

export default Sidebar;
