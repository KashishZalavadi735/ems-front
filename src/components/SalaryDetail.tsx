import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Payroll } from "../types/types";
import { getAllPayrolls, downloadSalarySlip } from "../services/payrollService";
import { getEnums } from "../services/enumService";

function SalaryDetail() {
  const navigate = useNavigate();
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [filteredPayrolls, setFilteredPayrolls] = useState<Payroll[]>([]);

  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>("All Departments");

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch payrolls
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [payrollData, enumData] = await Promise.all([
          getAllPayrolls(page, limit),
          getEnums(),
        ]);

        setPayrolls(payrollData.payrolls);
        setFilteredPayrolls(payrollData.payrolls);
        setTotalPages(payrollData.totalPages);

        // Get all departments
        const deptOptions = enumData.departments || [];
        setDepartments(["All Departments", ...deptOptions]);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  // Filter and search Logic
  useEffect(() => {
    let filtered = [...payrolls];

    if (selectedDepartment !== "All Departments") {
      filtered = filtered.filter(
        (p) => p.employee?.department === selectedDepartment
      );
    }

    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.employee.firstName.toLowerCase().includes(lowerSearch) ||
          p.employee.lastName.toLowerCase().includes(lowerSearch) ||
          p.employee.email.toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredPayrolls(filtered);
  }, [search, selectedDepartment, payrolls]);

  // Handle View
  const handleView = (id: number) => {
    navigate(`/Payroll/PayrollSlip/${id}`);
  };

  return (
    <div className="card p-4 shadow-sm border-0 h-100 table-responsive">
      <div className="d-flex justify-content-between align-items-center pb-4 border-bottom">
        <div className="d-flex justify-content-start">
          <h6 className="">Payroll List</h6>
        </div>

        <div className="d-flex justify-content-end gap-2">
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

          <input
            type="text"
            className="form-control"
            name="search"
            id="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <h6>Loading payrolls...</h6>
      ) : (
        <>
          <table className="table align-middle">
            <thead>
              <tr className="small text-muted">
                <th>EMPLOYEE</th>
                <th>DEPARTMENT</th>
                <th>BASIC SALARY</th>
                <th>ALLOWANCES</th>
                <th>DEDUCTIONS</th>
                <th>NET SALARY</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayrolls.length > 0 ? (
                filteredPayrolls.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.employee?.firstName} {p.employee?.lastName}
                      <br />
                      <small className="text-muted">{p.employee?.email}</small>
                    </td>
                    <td>{p.employee?.department}</td>
                    <td>₹ {p.basicSalary}</td>
                    <td>₹ {p.allowance}</td>
                    <td>₹ {p.deduction}</td>
                    <td>₹ {p.netSalary}</td>
                    <td>
                      <span
                        className={`badge rounded-pill ${
                          p.payrollStatus === "PAID"
                            ? "text-success pills-bg"
                            : "text-warning"
                        }`}
                      >
                        {p.payrollStatus}
                      </span>
                    </td>
                    <td style={{cursor: "pointer"}} className="text-center">
                      <span
                        className="text-primary me-2"
                        onClick={() => handleView(p.id)}
                      >
                        View
                      </span>
                      <span
                        className="text-success"
                        onClick={() => downloadSalarySlip(p.id)}
                      >
                        Download
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center text-muted">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
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
  );
}

export default SalaryDetail;
