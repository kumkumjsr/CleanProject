import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

// =======================
// Register
// =======================

export const registerUser = async (userData) => {

    const response = await axios.post(
        `${BASE_URL}/accounts/register/`,
        userData
    );

    return response.data;
};


// =======================
// Login
// =======================

export const loginUser = async (username, password) => {

    const response = await axios.post(
        `${BASE_URL}/token/`,
        {
            username,
            password,
        }
    );

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    localStorage.setItem("role", response.data.role);
    localStorage.setItem("username", response.data.username);

    return response.data;
};