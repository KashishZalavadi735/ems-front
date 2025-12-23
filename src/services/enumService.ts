import axios from "axios";
import { BASE_URL } from "../constants/api";

export const getEnums = async () => {
    const response = await axios.get(`${BASE_URL}/enums`);
    return response.data;
}