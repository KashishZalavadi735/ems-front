import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PayrollData } from "../types/types";
import {
  getMyPayrollHistory,
  downloadSalarySlip,
} from "../services/payrollService";

function SalaryHistory() {
  const navigate = useNavigate();
  const [payrolls, setPayrolls] = useState<PayrollData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getMyPayrollHistory();
        console.log("Salary History: ", data);
        setPayrolls(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Formate Month into string
  const formateMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Handle View of Salary Slip
  const handleView = (id: number) => {
    navigate(`/Payroll/SalarySlip/${id}`);
  };

  // Handle download
  const handleDownload = async (id: number) => {
    try {
      await downloadSalarySlip(id);
    } catch (error) {
      console.error("Failed to download salary slip:", error);
    }
  };

  if (loading) return <p>Loading salary history...</p>;

  return (
    <div className="card p-4 shadow-sm border-0 h-100 table-responsive">
      <div className="d-flex justify-content-between align-items-center pb-4 border-bottom">
        <div className="d-flex justify-content-start">
          <h6 className="">Salary History</h6>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button type="submit" className="btn btn-primary">
            <FontAwesomeIcon icon={faDownload} className="me-2" />
            Download All Slips
          </button>
        </div>
      </div>
      <table className="table align-middle">
        <thead>
          <tr>
            <th className="small text-muted">MONTH</th>
            <th className="small text-muted">BASIC SALARY</th>
            <th className="small text-muted">ALLOWANCES</th>
            <th className="small text-muted">DEDUCTIONS</th>
            <th className="small text-muted">NET SALARY</th>
            <th className="small text-muted">STATUS</th>
            <th className="small text-muted">ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {payrolls.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center">
                No salary history found
              </td>
            </tr>
          )}

          {Array.isArray(payrolls) &&
            payrolls.map((p) => (
              <tr key={p.id}>
                <td>{formateMonthYear(p.month)}</td>
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
                <td style={{ cursor: "pointer" }} className="text-center">
                  <span
                    className="text-decoration-none me-2 text-primary"
                    onClick={() => handleView(p.id)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                    View
                  </span>
                  <span
                    className="text-decoration-none text-success"
                    onClick={() => handleDownload(p.id)}
                  >
                    <FontAwesomeIcon icon={faDownload} />
                    Download
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalaryHistory;
