import axios from "axios";


const API = "http://127.0.0.1:8000/api";


const getAuthHeader = () => {

    return {

        headers: {

            Authorization:
                `Bearer ${localStorage.getItem("access")}`

        }

    };

};


// ============================
// GET STAFF TASKS
// ============================

export const getStaffTasks = async () => {

    const response = await axios.get(
        `${API}/tasks/staff/`,
        getAuthHeader()
    );

    return response.data;

};


// ============================
// UPDATE STATUS
// ============================

export const updateTaskStatus = async (
    id,
    status
) => {

    const response = await axios.patch(

        `${API}/tasks/${id}/status/`,

        {
            status: status
        },

        getAuthHeader()

    );

    return response.data;

};


// ============================
// START TASK
// BEFORE IMAGE
// ============================

export const startTask = async (
    id,
    beforeImage
) => {

    const formData = new FormData();

    formData.append(
        "before_image",
        beforeImage
    );


    const response = await axios.patch(

        `${API}/tasks/start/${id}/`,

        formData,

        {

            headers: {

                Authorization:
                    `Bearer ${localStorage.getItem("access")}`,

                "Content-Type":
                    "multipart/form-data"

            }

        }

    );


    return response.data;

};


// ============================
// COMPLETE TASK
// AFTER IMAGE
// ============================

export const completeTask = async (
    id,
    formData
) => {

    const response = await axios.patch(

        `${API}/tasks/${id}/complete/`,

        formData,

        {

            headers: {

                Authorization:
                    `Bearer ${localStorage.getItem("access")}`,

                "Content-Type":
                    "multipart/form-data"

            }

        }

    );


    return response.data;

};


// ============================
// STAFF STATS
// ============================

export const getStaffStats = async () => {

    const response = await axios.get(

        `${API}/tasks/staff/stats/`,

        getAuthHeader()

    );


    return response.data;

};