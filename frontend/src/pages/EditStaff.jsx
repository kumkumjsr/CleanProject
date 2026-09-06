import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function EditStaff() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [staff, setStaff] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(
                "http://127.0.0.1:8000/api/accounts/staff/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = response.data.find(
                item => item.id === Number(id)
            );

            if (data) {
                setStaff(data);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setStaff({
            ...staff,
            [e.target.name]: e.target.value
        });
    };

    const updateStaff = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("access");

            await axios.put(
                `http://127.0.0.1:8000/api/accounts/staff/${id}/update/`,
                staff,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Staff Updated Successfully");

            navigate("/staff-list");

        } catch (error) {

            console.log(error);

            alert("Update Failed");

        }

    };

    return (

        <DashboardLayout>

            <div className="bg-white shadow-xl rounded-2xl p-6">

                <h2 className="text-3xl font-bold text-green-700 mb-6">
                    ✏ Edit Staff
                </h2>

                <form onSubmit={updateStaff} className="space-y-4">

                    <input
                        className="border p-3 w-full rounded"
                        name="username"
                        value={staff.username || ""}
                        onChange={handleChange}
                        placeholder="Username"
                    />

                    <input
                        className="border p-3 w-full rounded"
                        name="email"
                        value={staff.email || ""}
                        onChange={handleChange}
                        placeholder="Email"
                    />

                    <input
                        className="border p-3 w-full rounded"
                        name="first_name"
                        value={staff.first_name || ""}
                        onChange={handleChange}
                        placeholder="First Name"
                    />

                    <input
                        className="border p-3 w-full rounded"
                        name="last_name"
                        value={staff.last_name || ""}
                        onChange={handleChange}
                        placeholder="Last Name"
                    />

                    <input
                        className="border p-3 w-full rounded"
                        name="phone"
                        value={staff.phone || ""}
                        onChange={handleChange}
                        placeholder="Phone"
                    />

                    <input
                        className="border p-3 w-full rounded"
                        name="address"
                        value={staff.address || ""}
                        onChange={handleChange}
                        placeholder="Address"
                    />

                    <div className="flex gap-4">

                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                        >
                            Update Staff
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/staff-list")}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
                        >
                            Back
                        </button>

                    </div>

                </form>

            </div>

        </DashboardLayout>

    );
}

export default EditStaff;