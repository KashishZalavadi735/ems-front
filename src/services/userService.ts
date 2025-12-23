import axios from "axios";
import { USER_API } from "../constants/api";

// Get token from LocalStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

// Recent employees
export const getRecentEmployees = async () => {
    const response = await axios.get(`${USER_API.GET_ALL}?page=1&limit=2`, {
        headers: getAuthHeader()
    });
    return response.data;
}

// Create employee
export const createEmployee = async (employeeData: any) => {
    const response = await axios.post(USER_API.CREATE, employeeData, {
        headers: getAuthHeader()
    });
    return response.data;
};

// Return all employees
export const getAllEmployees = async ( page: number = 1, limit: number = 5) => {
    const response = await axios.get(`${USER_API.GET_ALL}?page=${page}&limit=${limit}`,{
        headers: getAuthHeader()
    });
    return response.data.data;
};

// Return Single employee
export const getEmployeeById = async (id :string| number) => {
    const response = await axios.get(USER_API.GET_BY_ID(id),{
        headers: getAuthHeader()
    });
    return response.data.data;
};

// Update employee
export const updateEmployee = async (id: number | string, employeeData: any) => {
    const response = await axios.put(USER_API.UPDATE(id), employeeData, {
        headers: getAuthHeader()
    })
    return response.data.data;
};

// Delete employee
export const deleteEmployee = async (id:number | string) => {
    const response = await axios.delete(USER_API.DELETE(id), {
        headers: getAuthHeader()
    })
    return response.data;
};