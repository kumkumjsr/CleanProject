import axios from "axios";

const API = "https://cleanproject-b0mh.onrender.com/api";

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