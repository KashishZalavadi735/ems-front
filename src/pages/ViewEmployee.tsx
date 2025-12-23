import { useState , useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Employee } from "../types/types";
import { getEmployeeById } from "../services/userService";

function ViewEmployee() {
  const navigate = useNavigate();
  const { id } = useParams<{id: string}>();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  // Handle Go Back
  const handleGoBack = () => {
    navigate("/Employees")
  };

  const fetchEmployeeDetails = async () => {
    try {
      if (!id) return;
      const data = await getEmployeeById(id);

      setEmployee(data);
      setLoading(false);

      console.log("API Response:", data);

    } catch (error) {
      console.error("Error Fetching data : ",error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  if (loading) {
    return <h5>Loading...</h5>
  }

  return (
    <div>
      <h4 className="py-4">Employee Details</h4>

      {/* EMPLOYEE DETAILS */}
      <h6 className="fw-bold mb-2 text-secondary">Employee Details:</h6>
      <div className="card p-4 shadow-sm border-0 table-responsive mb-4">
        <table className="table align-middle table-hover">
          <tbody>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Employee Id :</td>
              <td>{employee?.employeeCode}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">First Name :</td>
              <td>{employee?.firstName}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Last Name :</td>
              <td>{employee?.lastName}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Email :</td>
              <td>{employee?.email}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Contact No :</td>
              <td>{employee?.contactNumber}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Joining Date :</td>
              <td>{new Date(employee?.joiningDate || "").toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Department :</td>
              <td>{employee?.department}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Position :</td>
              <td>{employee?.position}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Status :</td>
              <td className="text-success fw-semibold">{employee?.status || "Active"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PERSONAL DETAILS */}
      <h6 className="fw-bold mb-2 text-secondary">Personal Details:</h6>
      <div className="card p-4 shadow-sm border-0 table-responsive mb-4">
        <table className="table align-middle table-hover">
          <tbody>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Father Name :</td>
              <td>{employee?.personalInfo?.fatherName || "-"}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Father's Contact No :</td>
              <td>{employee?.personalInfo?.fatherContact || "-"}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Mother Name :</td>
            <td>{employee?.personalInfo?.motherName || "-"}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Mother's Contact No :</td>
              <td>{employee?.personalInfo?.motherContact || "-"}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Address :</td>
              <td>{employee?.personalInfo?.address || "-"}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Date of Birth :</td>
              <td>{new Date(employee?.personalInfo?.dateOfBirth || "-").toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* EDUCATION DETAILS */}
      <h6 className="fw-bold mb-2 text-secondary">Education Details:</h6>
      <div className="card p-4 shadow-sm border-0 table-responsive mb-4">
        <table className="table align-middle table-hover">
          <tbody>

            {/* UNDER GRADUATION */}
            <tr className="table-light">
              <td colSpan={2} className="fw-bold text-muted text-uppercase text-center">
                Under Graduation
              </td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Degree Name :</td>
              <td>{employee?.educationInfo?.uDegree || "-"}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">University / College :</td>
              <td>{employee?.educationInfo?.uCollege || "-"}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Passing Year :</td>
              <td>{employee?.educationInfo?.uYear || "-"}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">CGPA :</td>
              <td>{employee?.educationInfo?.uCGPA || "-"}</td>
            </tr>

            {/* POST GRADUATION */}
            <tr className="table-light">
              <td colSpan={2} className="fw-bold text-muted text-uppercase text-center">
                Post Graduation
              </td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Degree Name :</td>
              <td>{employee?.educationInfo?.pDegree || "-"}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">University / College :</td>
              <td>{employee?.educationInfo?.pCollege || "-"}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Passing Year :</td>
              <td>{employee?.educationInfo?.pYear || "-"}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">CGPA :</td>
              <td>{employee?.educationInfo?.pCGPA || "-"}</td>
            </tr>

            {/* PHD */}
            <tr className="table-light">
              <td colSpan={2} className="fw-bold text-muted text-uppercase text-center">
                PhD
              </td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Research Area / Thesis Topic :</td>
              <td>{employee?.educationInfo?.phdResearch || "-"}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">University / College :</td>
              <td>{employee?.educationInfo?.phdCollege || "-"}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Passing Year :</td>
              <td>{employee?.educationInfo?.phdYear || "-"}</td>
            </tr>
            <tr>
              <td className="fw-semibold text-uppercase text-primary">Result :</td>
              <td>{employee?.educationInfo?.phdResult || "-"}</td>
            </tr>

          </tbody>
        </table>
      </div>

      <div className="mt-3 text-end">
        <button className="btn btn-outline-secondary" onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
  );
}

export default ViewEmployee;
