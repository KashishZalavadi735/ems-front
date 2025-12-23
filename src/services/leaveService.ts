import axios from "axios";
import { LEAVE_TYPE_URL, LEAVE } from "../constants/api";

// Get token from LocalStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

// LeaveTypes fetch for dropdown in Apply leave form
export const getLeaveTypes = async () => {
    const response = await axios.get(LEAVE_TYPE_URL.GET, {
        headers: getAuthHeader()
    });
    return response.data.data;
}

// Apply Leave
export const applyLeave = async (leaveData: any) => {
    const response = await axios.post(LEAVE.CREATE, leaveData, {
        headers: getAuthHeader()
    });   
    return response.data.data;
}

// Get Leaves of Logged in User
export const getUserLeaves = async () => {
    const response = await axios.get(LEAVE.GET_LEAVE, {
        headers: getAuthHeader()
    });
    return response.data.data;
}

// Get All leaves(Admin)
export const getAllLeaves = async ( page: number = 1, limit: number = 5 ) => {
    const response = await axios.get(`${LEAVE.GET_ALL_LEAVE}?page=${page}&limit=${limit}`, {
        headers: getAuthHeader()
    });
    return response.data.data;
}

// Get Leave by id
export const getLeaveById = async (id: number | string) => {
    const response = await axios.get(LEAVE.GET_LEAVE_BY_ID(id),{
        headers: getAuthHeader()
    });
    return response.data.data;
}

// Update leave
export const updateLeave = async (id:string, leaveData: any) => {
    const response = await axios.put(LEAVE.UPDATE_LEAVE(id),leaveData, {
        headers: getAuthHeader()
    });
    return response.data.data;
}