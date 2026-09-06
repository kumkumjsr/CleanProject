import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const getDashboard = async () => {

    const token = localStorage.getItem("access");

    const response = await axios.get(
        `${API}/user/dashboard/`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};