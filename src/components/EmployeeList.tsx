import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Employee } from "../types/types";
import { deleteEmployee, getAllEmployees } from "../services/userService";
import { getEnums } from "../services/enumService";
import toast from "react-hot-toast";

function EmployeeList() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");

  const [statuses, setStatuses] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Employees and enums
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empData, enumData] = await Promise.all([
          getAllEmployees(page, limit),
          getEnums(),
        ]);

        setEmployees(empData.employees);
        setFilteredEmployees(empData.employees);
        setTotalPages(empData.totalPages);

        // Set dropdown options
        setDepartments(["All Departments", ...(enumData.departments || [])]);
        setStatuses(["All Status", ...(enumData.statuses || [])]);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  // Filter Logic
  useEffect(() => {
    let filtered = [...employees];

    if (selectedDepartment !== "All Departments") {
      filtered = filtered.filter(
        (emp) => emp.department === selectedDepartment
      );
    }

    if (selectedStatus !== "All Status") {
      filtered = filtered.filter((emp) => emp.status === selectedStatus);
    }

    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(lowerSearch) ||
          emp.lastName.toLowerCase().includes(lowerSearch) ||
          emp.email.toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredEmployees(filtered);
  }, [search, selectedDepartment, selectedStatus, employees]);

  // Handle Employee Page
  const handleViewEmployee = (id: number) => {
    navigate(`/Employees/ViewEmployee/${id}`);
  };

  // Handle Edit Employee
  const handleUpdateEmployee = (id: number) => {
    navigate(`/Employees/Update/${id}`);
  };

  // Handle Delete Employee
  const handleDeleteEmployee = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      const response = await deleteEmployee(id);
      console.log("Employee Deleted: ", response);
      setEmployees(employees.filter((emp) => emp.id !== id));
      toast.success("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee: ", error);
    }
  };
  return (
    <div>
      {/* Filter */}
      <div className="py-3">
        <div className="card p-4 shadow-sm border-0 w-100">
          <div className="row">
            <div className="col-12 col-md-4">
              <label htmlFor="search">
                <small>Search</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="department">
                <small>Department</small>
              </label>
              <select
                className="form-select"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map((dept) => (
                  <option value={dept} key={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="status">
                <small>Status</small>
              </label>
              <select
                className="form-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map((status) => (
                  <option value={status} key={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="card p-4 shadow-sm border-0">
        {loading ? (
          <h6>Loading employees...</h6>
        ) : (
          <>
            <table className="table align-middle">
              <thead>
                <tr className="text-muted small">
                  <th>EMP ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>JOINING</th>
                  <th>DEPARTMENT</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.employeeCode}</td>
                      <td>
                        {emp.firstName} {emp.lastName}
                      </td>
                      <td>{emp.email}</td>
                      <td>{new Date(emp.joiningDate).toLocaleDateString()}</td>
                      <td>{emp.department}</td>
                      <td>
                        <span
                          className={`badge rounded-pill px-3 ${
                            emp.status === "Active"
                              ? "bg-success-subtle text-success"
                              : "bg-danger-subtle text-danger"
                          }`}
                        >
                          {emp.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <i
                          className="bi bi-eye text-primary"
                          onClick={() => handleViewEmployee(emp.id)}
                        />
                        <i
                          className="bi bi-pencil-square text-info mx-3"
                          onClick={() => handleUpdateEmployee(emp.id)}
                        />
                        <i
                          className="bi bi-trash text-danger"
                          onClick={() => handleDeleteEmployee(emp.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center text-muted">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* 🔹 Pagination Buttons */}
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-outline-secondary"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                className="btn btn-outline-secondary"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
