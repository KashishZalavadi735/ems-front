import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { PayrollData } from "../types/types";
import { getPayrollById } from "../services/payrollService";

function EmpPayrollSlip() {
  const { id } = useParams<{ id: string }>();
  const [payroll, setPayroll] = useState<PayrollData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchPayroll = async () => {
      try {
        const data = await getPayrollById(Number(id));
        console.log("Payroll fetched: ", data);

        if (Array.isArray(data)) {
          setPayroll(data[0]);
        } else {
          setPayroll(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayroll();
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

  // Handle Go Back
  const handleGoBack = () => {
    navigate("/Payroll")
  }
  
  return (
    <div>
      <div className="card p-4 shadow-sm border-0 h-100 table-responsive mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom">
          <h5>Payroll Details</h5>
          <span>{formateMonthYear(payroll.month)}</span>
        </div>

        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <p className="mb-0">
              <b>Employee Name : </b>
              {payroll.employee.firstName} {payroll.employee.lastName}
            </p>
            <p className="mb-0">
              <b>Employee ID : </b>
              {payroll.employee.employeeCode}
            </p>
          </div>
          <div className="col-12 col-md-6">
            <p className="mb-0">
              <b>Department : </b>
              {payroll.employee.department}
            </p>
            <p className="mb-0">
              <b>Payroll Status : </b>
              {payroll.payrollStatus}
            </p>
          </div>
        </div>

        <h6 className="text-center mb-3">Salary Breakdown</h6>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="fw-semibold">Basic Salary</td>
              <td>₹ {(payroll.basicSalary ?? 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td className="fw-semibold">Allowances</td>
              <td>₹ {(payroll.allowance ?? 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td className="fw-semibold">Deductions</td>
              <td>₹ {(payroll.deduction ?? 0).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <h5 className="text-end">
          Net Salary : ₹ {(payroll.netSalary ?? 0).toFixed(2)}
        </h5>
      </div>

      <div className="mt-3 text-end">
        <button className="btn btn-outline-secondary" onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
  );
}

export default EmpPayrollSlip;
