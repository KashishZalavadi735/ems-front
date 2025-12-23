import axios from "axios";
import { LEAVE_TYPE_URL } from "../constants/api";

// Get token from LocalStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

// Create leavetype
export const createLeaveType = async (leaveTypeData: any) => {
    const response = await axios.post(LEAVE_TYPE_URL.CREATE, leaveTypeData, {
        headers: getAuthHeader()
    });
    return response.data;
};

// Return all leavetype
export const getLeaveTypes = async () => {
    const response = await axios.get(LEAVE_TYPE_URL.GET,{
        headers: getAuthHeader()
    });
    return response.data.data;
};

export const getLeaveTypesById = async (id: string| number) => {
    const response = await axios.get(LEAVE_TYPE_URL.GET_BY_ID(id),{
        headers: getAuthHeader()
    });
    return response.data.data;
}

// Update leavetype
export const updateLeaveType = async (id: number | string, leaveTypeData: any) => {
    const response = await axios.put(LEAVE_TYPE_URL.UPDATE(id), leaveTypeData, {
        headers: getAuthHeader()
    })
    return response.data.data;
};

// Delete leavetype
export const deleteLeaveType = async (id:number | string) => {
    const response = await axios.delete(LEAVE_TYPE_URL.DELETE(id), {
        headers: getAuthHeader()
    })
    return response.data;
};