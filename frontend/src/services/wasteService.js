import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/waste/";


export const scanWaste = async (formData) => {

  const token = localStorage.getItem("access");


  const response = await axios.post(
    `${API_URL}scan/`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );


  return response.data;
};



export const getWasteHistory = async () => {

  const token = localStorage.getItem("access");


  const response = await axios.get(
    `${API_URL}history/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


  return response.data;
};