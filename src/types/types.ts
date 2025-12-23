export interface LoginData {
    email: string;
    password: string;
}

export interface ChangePassword {
    email?: string;
    newPassword: string;
    confirmPassword: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isFirstLogin: boolean;
}

export interface Employee {
    id: number;
    employeeCode: string;
    firstName: string;
    lastName: string;
    email: string;
    joiningDate: string;
    contactNumber: string;
    department: string;
    position: string;
    status: string;
    personalInfo?: PersonalData | null;
    educationInfo?: EducationData | null;
}

export interface EmployeeData{
    firstName: string;
    lastName: string;
    email: string;
    joiningDate: string;
    contactNumber: string;
    department: string;
    position: string;
    status: string;
}

export interface LeaveType {
    id: number;
    leaveType: string;
    description: string;
}

export interface LeaveTypeData {
    leaveType: string;
    description: string;
}

export interface Leave {
    id: number;
    leaveType: LeaveType;
    fromDate: string;
    toDate: string;
    description: string;
    status: string;
}

export interface LeaveData {
    leaveTypeId: number;
    fromDate: string;
    toDate: string;
    description: string;
}

export interface AdminLeaveData{
    id: number;
    fromDate: string;
    toDate: string;
    status: string;
    description: string;
    createdAt: string;
    employee: {
        firstName: string;
        lastName: string;
        employeeCode: string;
        email: string;
    };
    leaveType: {
        leaveType: string;
    };
}

export interface Payroll {
  id: number;
  employee: {
    firstName: string;
    lastName: string;
    email: string;
    department: string;
  };
  basicSalary: number;
  allowance: number;
  deduction: number;
  netSalary: number;
  payrollStatus: string;
  createdAt: string;
}


export interface PayrollData {
    id: number;
    employeeId: number;
    employee: {
        firstName: string;
        lastName: string;
        email: string;
        department: string;
        employeeCode: string;
        position: string;
    };
    month: string;
    basicSalary: number;
    allowance: number;
    deduction: number;
    netSalary: number;
    payrollStatus: string;
    createdAt: string;
}

export interface ProfileData {
    id: number;
    employeeCode: string;
    firstName: string;
    lastName: string;
    email: string;
    joiningDate: string;
    contactNumber: string;
    department: string;
    position: string;
    status: string;
    personalInfo?: PersonalData | null;
    educationInfo?: EducationData | null;
}

export interface PersonalData {
    fatherName?: string;
    fatherContact?: string;
    motherName?: string;
    motherContact?: string;
    address?: string;
    dateOfBirth?: string;
}

export interface EducationData {
  // Undergraduate
  uDegree?: string;
  uCollege?: string;
  uYear?: string;
  uCGPA?: number;

  // Postgraduate
  pDegree?: string;
  pCollege?: string;
  pYear?: string;
  pCGPA?: number;

  // PhD
  phdResearch?: string;
  phdCollege?: string;
  phdYear?: string;
  phdResult?: string;
}

export interface cards {
    totalEmployees: number;
    activeEmployees: number;
    departments: number;
    thisMonthPayroll: number;
}