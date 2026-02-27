export const BASE_URL = "https://ems-backend-tgfr.onrender.com/api";

export const AUTH_API = {
    LOGIN: `${BASE_URL}/auth/login`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
    CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`
};

export const USER_API ={
    GET_ALL: `${BASE_URL}/users`,
    GET_BY_ID : (id: string | number) => `${BASE_URL}/users/${id}`,
    CREATE: `${BASE_URL}/users`,
    UPDATE: (id: string | number) => `${BASE_URL}/users/${id}`,
    DELETE: (id: string | number) => `${BASE_URL}/users/${id}`
};

export const LEAVE_TYPE_URL = {
    CREATE: `${BASE_URL}/leavetype`,
    GET: `${BASE_URL}/leavetype`,
    GET_BY_ID : (id: string | number) => `${BASE_URL}/leavetype/${id}`,
    UPDATE: (id: string | number) => `${BASE_URL}/leavetype/${id}`,
    DELETE: (id: string | number) => `${BASE_URL}/leavetype/${id}`
};

export const LEAVE = {
    CREATE: `${BASE_URL}/leaves`,
    GET_LEAVE: `${BASE_URL}/leaves`,
    GET_ALL_LEAVE: `${BASE_URL}/leaves/allLeave`,
    GET_LEAVE_BY_ID: (id: string | number) => `${BASE_URL}/leaves/allLeave/${id}`,
    UPDATE_LEAVE: (id: string | number) => `${BASE_URL}/leaves/${id}`
};

export const PAYROLL_URL = {
    PROCESS_PAYROLL: `${BASE_URL}/payroll/process`,
    GET_ALL_PAYROLL: `${BASE_URL}/payroll/all`,
    GET_PAYROLL_BY_EMP: (id: string | number) => `${BASE_URL}/payroll/all/${id}`,
    GET_MY_PAYROLL: `${BASE_URL}/payroll/my`,
    GET_SALARY_SLIP: (id: string | number) => `${BASE_URL}/payroll/my/${id}`,
    DOWNLOAD_SALARY_SLIP: (id: number | string) => `${BASE_URL}/payroll/${id}/download`,
};

export const PROFILE_URL = {
    MY_PROFILE: `${BASE_URL}/profile/me`,
    BASIC_INFO: `${BASE_URL}/profile/basic`,
    PERSONAL_INFO: `${BASE_URL}/profile/personal`,
    EDUCATION_INFO: `${BASE_URL}/profile/education`
};

export const CARDS_URL = {
    DASHBOARD_CARDS: `${BASE_URL}/cards/dashboard-cards`
};
