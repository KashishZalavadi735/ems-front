import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserCheck,
  faBuilding,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Cards.css";
import { useEffect, useState } from "react";
import type { cards } from "../types/types";
import { getDashboardCard } from "../services/cardsService";

const initialState: cards = {
  totalEmployees: 0,
  activeEmployees: 0,
  departments: 0,
  thisMonthPayroll: 0,
};

function Cards() {
  const [stats, setStats] = useState<cards>(initialState);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardCard();
        console.log("Api response: ", data);
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats: ", error);        
      } 
    };

    loadStats();
  }, []);

  return (
    <div className=" mt-4">
      <div className="row g-3" style={{ cursor: "pointer" }}>
        {/* Total Employee */}
        <div className="col-12 col-sm-6 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 p-3">
            <div className="d-flex align-items-center">
              <div
                className="me-3 d-flex align-items-center justify-content-center icon"
                style={{ backgroundColor: "rgba(13, 110, 253, 0.15)" }}
              >
                <FontAwesomeIcon icon={faUsers} style={{ color: "#3b3ca9" }} />
              </div>

              <div>
                <p className="mb-0 text-secondary">Total Employees</p>
                <h5>{stats.totalEmployees}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Active Employee */}
        <div className="col-12 col-sm-6 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 p-3">
            <div className="d-flex align-items-center">
              <div
                className="me-3 d-flex align-items-center justify-content-center icon"
                style={{ backgroundColor: "rgba(25, 135, 84, 0.15)" }}
              >
                <FontAwesomeIcon icon={faUserCheck} className="text-success" />
              </div>

              <div>
                <p className="mb-0 text-secondary">Active Employee</p>
                <h5>{stats.activeEmployees}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Departments */}
        <div className="col-12 col-sm-6 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 p-3">
            <div className="d-flex align-items-center">
              <div
                className="me-3 d-flex align-items-center justify-content-center icon"
                style={{ backgroundColor: "rgba(13, 110, 253, 0.15)" }}
              >
                <FontAwesomeIcon icon={faBuilding} className="text-primary" />
              </div>

              <div>
                <p className="mb-0 text-secondary">Departments</p>
                <h5>{stats.departments}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* This Month Payroll */}
        <div className="col-12 col-sm-6 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 p-3">
            <div className="d-flex align-items-center">
              <div
                className="me-3 d-flex align-items-center justify-content-center icon"
                style={{ backgroundColor: "rgba(255, 193, 7, 0.15)" }}
              >
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-warning"
                />
              </div>

              <div>
                <p className="mb-0 text-secondary">This Month Payroll</p>
                <h5>₹ {stats.thisMonthPayroll}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
