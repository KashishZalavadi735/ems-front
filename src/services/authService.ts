import axios from "axios";
import { AUTH_API } from "../constants/api";
import type { LoginData, ChangePassword } from "../types/types";

// Login 
export const loginUser = async (data: LoginData) => {
    const response = await axios.post(AUTH_API.LOGIN, data);
    return response.data;
}

// Get token from LocalStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

// Send OTP to email
export const sendOtpService = async (email:string) => {
    const response = await axios.post(AUTH_API.FORGOT_PASSWORD, {email});
    return response.data;
};

// Verify OTP
export const verifyOtpService = async (email:string, otp: string) => {
    const response = await axios.post(AUTH_API.VERIFY_OTP, {email, otp});
    return response.data;
}

// Change Password
export const ChangePasswordService = async (data: ChangePassword) => {
    const response = await axios.post(AUTH_API.CHANGE_PASSWORD, data, {
        headers: getAuthHeader()
    });
    return response.data;
}