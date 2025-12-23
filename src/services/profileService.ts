import axios from "axios";
import { PROFILE_URL } from "../constants/api";
import type { EducationData, PersonalData } from "../types/types";
// Get token from LocalStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

// Get MyProfile
export const getMyProfile = async () => {
    const response = await axios.get(PROFILE_URL.MY_PROFILE, {
        headers: getAuthHeader()
    });
    return response.data.data;
};

// Update Basic Info
export const saveBasicInfo = async (data:any) => {
    const response = await axios.post(PROFILE_URL.BASIC_INFO, data, {
        headers: getAuthHeader()
    });
    return response.data.data;
};

// Update Personal Info
export const savePersonalInfo = async (data: PersonalData) => {
    const response = await axios.post(PROFILE_URL.PERSONAL_INFO, data, {
        headers: getAuthHeader()
    });
    return response.data.data;
};

// Update Education Info
export const saveEducationInfo = async (data: EducationData) => {
    const response = await axios.post(PROFILE_URL.EDUCATION_INFO, data, {
        headers: getAuthHeader()
    });
    return response.data.data;
};