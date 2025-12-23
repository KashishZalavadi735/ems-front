import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import RequireAuth from "./middleware/RequireAuth";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";
import ViewEmployee from "./pages/ViewEmployee";
import LeavesTypes from "./pages/LeavesTypes";
import AddLeaveType from "./pages/AddLeaveType";
import UpdateLeaveType from "./pages/UpdateLeaveType";
import LeaveManagement from "./pages/LeaveManagement";
import EditLeave from "./pages/EditLeave";
import LeaveDetail from "./pages/LeaveDetail";
import Payroll from "./pages/Payroll";
import ProcessPayroll from "./pages/ProcessPayroll";
import EmpPayrollSlip from "./pages/EmpPayrollSlip";
import SalarySlip from "./pages/SalarySlip";
import Profile from "./pages/Profile";
import UpdateBasicDetail from "./pages/UpdateBasicDetail";
import UpdatePersonalDetail from "./pages/UpdatePersonalDetail";
import UpdateEducationDetail from "./pages/UpdateEducationDetail";
import Leave from "./pages/Leave";
import ApplyLeave from "./pages/ApplyLeave";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />

          <Route element={<Layout />}>
            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />

            {/* Employess */}
            <Route path="/Employees" element={<Employees />} />
            <Route path="/Employees/Add" element={<AddEmployee />} />
            <Route path="/Employees/Update/:id" element={<UpdateEmployee />} />
            <Route
              path="/Employees/ViewEmployee/:id"
              element={<ViewEmployee />}
            />

            {/* Leave Types */}
            <Route path="/LeavesTypes" element={<LeavesTypes />} />
            <Route
              path="/LeavesTypes/AddLeaveTypes"
              element={<AddLeaveType />}
            />
            <Route
              path="/LeavesTypes/UpdateLeaveTypes/:id"
              element={<UpdateLeaveType />}
            />

            {/* Leaves Management */}
            <Route path="/LeavesManagement" element={<LeaveManagement />} />
            <Route
              path="/LeavesManagement/EditLeave/:id"
              element={<EditLeave />}
            />
            <Route
              path="/LeavesManagement/LeaveDetail/:id"
              element={<LeaveDetail />}
            />

            {/* Payroll */}
            <Route path="/Payroll" element={<Payroll />} />
            <Route
              path="/Payroll/ProcessPayroll"
              element={<ProcessPayroll />}
            />
            <Route
              path="/Payroll/PayrollSlip/:id"
              element={<EmpPayrollSlip />}
            />
            <Route path="/Payroll/SalarySlip/:id" element={<SalarySlip />} />

            {/* Profile */}
            <Route path="/Profile" element={<Profile />} />
            <Route
              path="/Profile/EditDetails"
              element={<UpdateBasicDetail />}
            />
            <Route
              path="/Profile/EditPersonalDetails"
              element={<UpdatePersonalDetail />}
            />
            <Route
              path="/Profile/EditEducationDetails"
              element={<UpdateEducationDetail />}
            />

            {/* Employee Leave */}
            <Route path="/Leave" element={<Leave />} />
            <Route path="/Leave/ApplyLeave" element={<ApplyLeave />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
