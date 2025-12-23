import axios from "axios";
import { USER_API, PAYROLL_URL } from "../constants/api";
import toast from "react-hot-toast";

// Get token from LocalStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

// Fetch all employees
export const getEmployees = async () => {
    const response = await axios.get(USER_API.GET_ALL,{
        headers: getAuthHeader()
    });
    return response.data.data;
};

//  Process payroll
export const processPayroll = async (employeeId: any, month: any) => {
    const response = await axios.post(PAYROLL_URL.PROCESS_PAYROLL, { employeeId, month }, {
        headers: getAuthHeader()
    });
    return response.data.data;
};

// Get all payrolls
export const getAllPayrolls = async ( page: number = 1, limit: number = 10 ) => {
    const response = await axios.get(`${PAYROLL_URL.GET_ALL_PAYROLL}?page=${page}&limit=${limit}`, {
        headers: getAuthHeader()
    });
    return response.data.data;
};

// Get payroll for single employee
export const getPayrollById = async (payrollId: number) => {
    const response = await axios.get(PAYROLL_URL.GET_PAYROLL_BY_EMP(payrollId), {
        headers: getAuthHeader()
    });
    return response.data.data;
}

// Get all payroll to employee
export const getMyPayrollHistory = async () => {
    const response = await axios.get(PAYROLL_URL.GET_MY_PAYROLL, {
        headers: getAuthHeader()
    });
    return response.data.data;
}

// Get salary slip by Id
export const getSalarySlipById = async (id: number) => {
    const response = await axios.get(PAYROLL_URL.GET_SALARY_SLIP(id),{
        headers: getAuthHeader()
    });
    return response.data.data;
}

// Download Salary Slip

export const downloadSalarySlip = async (id: number) => {
  try {
    const response = await axios.get(PAYROLL_URL.DOWNLOAD_SALARY_SLIP(id), {
      headers: getAuthHeader(),
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `salary-slip-${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
    toast.success("Salary Slip downloaded successfully!");
  } catch (error) {
    console.error("Failed to download salary slip:", error);
    toast.error("Failed to download salary slip.");
  }
};
