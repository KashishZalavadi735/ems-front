import { useEffect, useState } from "react";
import { getEmployees, processPayroll } from "../services/payrollService";
import type { Employee } from "../types/types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ProcessPayrollForm() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [month, setMonth] = useState("");

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const data = await getEmployees();
        console.log("Fetched employees:", data);
        setEmployees(data.employees || []);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedEmployee || !month) {
      alert("Please select employee and month");
      return;
    }

    try {
      const res = await processPayroll(selectedEmployee, month);
      console.log(res);
      navigate("/Payroll");
      toast.success("Payroll processed successfully!");
      // Reset the form
      setSelectedEmployee("");
      setMonth("");
    } catch (error) {
      console.error("Error processing payroll: ", error);
      toast.error("Error processing payroll.");
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    navigate("/Payroll");
  };

  return (
    <div>
      <div className="py-3">
        <div className="card p-4 shadow-sm border-0">
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <label className="form-label" htmlFor="selectEmployee">
                Select Employee
              </label>
              <select
                className="form-control"
                name="selectEmployee"
                id="selectEmployee"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="">Select Employee</option>
                {Array.isArray(employees) &&
                  employees.map((emp) => (
                    <option value={emp.id} key={emp.id}>
                      {emp.firstName} {emp.lastName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mt-3">
              <label htmlFor="month" className="form-label">
                Select Month
              </label>
              <input
                type="month"
                className="form-control"
                name="selectMonth"
                id="selectMonth"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>

            <div className="mt-3 text-end">
              <button
                type="button"
                className="btn btn-outline-secondary me-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Process
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProcessPayrollForm;
