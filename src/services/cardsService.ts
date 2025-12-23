import axios from "axios";
import { CARDS_URL } from "../constants/api";

// Get token from LocalStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

export const getDashboardCard = async () => {
    const response = await axios.get(CARDS_URL.DASHBOARD_CARDS, {
        headers: getAuthHeader()
    });
    return response.data.data;
}