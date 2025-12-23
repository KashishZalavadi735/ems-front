import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { PayrollData } from "../types/types";
import { getSalarySlipById } from "../services/payrollService";

function SalarySlip() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [payroll, setPayroll] = useState<PayrollData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchPayrolls = async () => {
      try {
        const data = await getSalarySlipById(Number(id));
        console.log("Payroll fetched: ", data);
        setPayroll(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayrolls();
  }, [id]);

  if (loading) return <p>Loading Payroll...</p>;
  if (!payroll) return <p>Payroll not found</p>;

  // Formate Month into string
  const formateMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Calculations
  const totalEarnings = (payroll.basicSalary ?? 0) + (payroll.allowance ?? 0);

  // Handle Go Back
  const handleGoBack = () => {
    navigate("/Payroll");
  };

  return (
    <div>
      <div className="card p-4 shadow-sm border-0 h-100 table-responsive mt-5">
        <h5 className="mb-3 border-bottom pb-2">
          Salary Slip - {formateMonthYear(payroll.month)}
        </h5>

        <div className="row">
          <div className="col-6">
            <p>
              <b>Employee Name : </b>
              {payroll.employee.firstName} {payroll.employee.lastName}
            </p>
            <p>
              <b>Employee ID : </b>
              {payroll.employee.employeeCode}
            </p>
            <p>
              <b>Department :</b>
              {payroll.employee.department}
            </p>
          </div>
          <div className="col-6">
            <p>
              <b>Pay Date : </b>
              {payroll.createdAt}
            </p>
            <p>
              <b>Position : </b>
              {payroll.employee.position}
            </p>
          </div>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Earnings</th>
              <th>Amount</th>
              <th>Deductions</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic Salary</td>
              <td>₹ {(payroll.basicSalary ?? 0).toFixed(2)}</td>
              <td>Allowances</td>
              <td>₹ {(payroll.allowance ?? 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td>
                <b>Total Earnings</b>
              </td>
              <td>
                <b>₹ {totalEarnings.toFixed(2)}</b>
              </td>
              <td>
                <b>Total Deductions</b>
              </td>
              <td>
                <b>₹ {(payroll.deduction ?? 0).toFixed(2)}</b>
              </td>
            </tr>
          </tbody>
        </table>

        <h6 className="text-end mt-3">
          Net Salary: <b>₹ {(payroll.netSalary ?? 0).toFixed(2)}</b>
        </h6>
      </div>

      <div className="mt-3 text-end">
        <button className="btn btn-outline-secondary" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default SalarySlip;
