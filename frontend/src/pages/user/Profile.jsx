import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [editing, setEditing] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        address: "",
    });

    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    // ==============================
    // FETCH PROFILE
    // ==============================

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("access");

            const response = await axios.get(
                "http://127.0.0.1:8000/api/accounts/profile/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProfile(response.data);

            setFormData({
                username: response.data.username || "",
                email: response.data.email || "",
                phone: response.data.phone || "",
                address: response.data.address || "",
            });

        } catch (error) {
            console.log("Profile Error", error);

            if (error.response) {
                console.log("Response:", error.response.data);
            }
        } finally {
            setLoading(false);
        }
    };


    // ==============================
    // HANDLE INPUT
    // ==============================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    // ==============================
    // HANDLE IMAGE
    // ==============================

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setProfileImage(file);

        setPreviewImage(URL.createObjectURL(file));
    };


    // ==============================
    // EDIT PROFILE
    // ==============================

    const handleEdit = () => {
        setEditing(true);
    };


    // ==============================
    // CANCEL EDIT
    // ==============================

    const handleCancel = () => {
        setEditing(false);

        setProfileImage(null);
        setPreviewImage(null);

        setFormData({
            username: profile.username || "",
            email: profile.email || "",
            phone: profile.phone || "",
            address: profile.address || "",
        });
    };


    // ==============================
    // UPDATE PROFILE
    // ==============================

    const handleUpdate = async (e) => {
        e.preventDefault();

        setSaving(true);

        try {
            const token = localStorage.getItem("access");

            const data = new FormData();

            data.append("username", formData.username);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("address", formData.address);

            if (profileImage) {
                data.append("profile_image", profileImage);
            }

            const response = await axios.patch(
                "http://127.0.0.1:8000/api/accounts/profile/update/",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Profile Updated:", response.data);


            setProfile(prev => ({
                ...prev,
                ...response.data
            }));


            await fetchProfile();


            setFormData({
                username: response.data.username || "",
                email: response.data.email || "",
                phone: response.data.phone || "",
                address: response.data.address || "",
            });

            setEditing(false);

            setProfileImage(null);
            setPreviewImage(null);

            alert("Profile Updated Successfully! ✅");

        } catch (error) {
            console.log("Profile Update Error:", error);

            if (error.response) {
                console.log("Backend Error:", error.response.data);

                alert(
                    error.response.data.detail ||
                    "Profile update failed"
                );
            } else {
                alert("Something went wrong");
            }

        } finally {
            setSaving(false);
        }
    };


    // ==============================
    // LOADING
    // ==============================

    if (loading) {
        return (
            <div className="p-6">

                <div className="bg-white rounded-2xl shadow p-8 text-center">

                    <p className="text-lg text-gray-600">
                        Loading Profile...
                    </p>

                </div>

            </div>
        );
    }


    // ==============================
    // PROFILE NOT FOUND
    // ==============================

    if (!profile) {
        return (
            <div className="p-6">

                <div className="bg-white rounded-2xl shadow p-8">

                    <h2 className="text-xl font-bold text-red-600">
                        Unable to load profile
                    </h2>

                </div>

            </div>
        );
    }


    // ==============================
    // PROFILE IMAGE
    // ==============================
    const imageToShow =
        previewImage ||
        (
            profile.profile_image
                ? (
                    profile.profile_image.startsWith("http")
                        ? `${profile.profile_image}?t=${new Date().getTime()}`
                        : `http://127.0.0.1:8000${profile.profile_image}?t=${new Date().getTime()}`
                )
                : null
        );
    // ==============================
    // UI
    // ==============================

    return (
        <div className="p-6">

            {/* PAGE TITLE */}

            <div className="mb-6">

                <h1 className="text-3xl font-bold">
                    👤 My Profile
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage your EcoSmart profile
                </p>

            </div>


            {/* PROFILE CARD */}

            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl">


                {/* ========================= */}
                {/* PROFILE HEADER */}
                {/* ========================= */}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">


                    <div className="flex items-center gap-6">


                        {/* IMAGE */}

                        <div>

                            {imageToShow ? (

                                <img
                                    src={imageToShow}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                                />

                            ) : (

                                <div className="w-24 h-24 rounded-full bg-green-600 text-white flex items-center justify-center text-4xl">

                                    🌱

                                </div>

                            )}

                        </div>


                        {/* NAME */}

                        <div>

                            <h2 className="text-2xl font-bold">

                                {profile.username}

                            </h2>

                            <p className="text-gray-500">

                                {profile.email}

                            </p>

                            <span className="inline-block mt-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">

                                {profile.role}

                            </span>

                        </div>


                    </div>


                    {/* EDIT BUTTON */}

                    {!editing && (

                        <button
                            onClick={handleEdit}
                            className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition"
                        >

                            ✏️ Edit Profile

                        </button>

                    )}

                </div>


                {/* ========================= */}
                {/* STATS */}
                {/* ========================= */}

                {!editing && (

                    <div className="grid md:grid-cols-3 gap-5 mb-8">


                        <div className="bg-green-50 p-5 rounded-xl text-center">

                            <p className="text-gray-600">
                                Eco Points
                            </p>

                            <h2 className="text-3xl font-bold text-green-700">

                                {profile.eco_points ?? 0}

                            </h2>

                        </div>


                        <div className="bg-blue-50 p-5 rounded-xl text-center">

                            <p className="text-gray-600">
                                Total Scans
                            </p>

                            <h2 className="text-3xl font-bold text-blue-700">

                                {profile.total_scans ?? 0}

                            </h2>

                        </div>


                        <div className="bg-yellow-50 p-5 rounded-xl text-center">

                            <p className="text-gray-600">
                                Badge
                            </p>

                            <h2 className="text-xl font-bold">

                                🏆 {profile.badge || "Beginner"}

                            </h2>

                        </div>

                    </div>

                )}


                {/* ========================= */}
                {/* VIEW MODE */}
                {/* ========================= */}

                {!editing && (

                    <div className="space-y-4">


                        <div className="border p-4 rounded-lg">

                            <p className="text-gray-500">
                                Username
                            </p>

                            <p className="font-semibold">
                                {profile.username || "Not Added"}
                            </p>

                        </div>


                        <div className="border p-4 rounded-lg">

                            <p className="text-gray-500">
                                Email
                            </p>

                            <p className="font-semibold">
                                {profile.email || "Not Added"}
                            </p>

                        </div>


                        <div className="border p-4 rounded-lg">

                            <p className="text-gray-500">
                                Phone
                            </p>

                            <p className="font-semibold">
                                {profile.phone || "Not Added"}
                            </p>

                        </div>


                        <div className="border p-4 rounded-lg">

                            <p className="text-gray-500">
                                Address
                            </p>

                            <p className="font-semibold">
                                {profile.address || "Not Added"}
                            </p>

                        </div>


                        <div className="border p-4 rounded-lg">

                            <p className="text-gray-500">
                                Account Role
                            </p>

                            <p className="font-semibold capitalize">
                                {profile.role}
                            </p>

                        </div>


                    </div>

                )}


                {/* ========================= */}
                {/* EDIT MODE */}
                {/* ========================= */}

                {editing && (

                    <form
                        onSubmit={handleUpdate}
                        className="space-y-6"
                    >


                        <div>

                            <h2 className="text-xl font-bold mb-4">

                                ✏️ Edit Profile

                            </h2>

                        </div>


                        {/* PROFILE IMAGE */}

                        <div>

                            <label className="block font-medium mb-2">

                                Profile Image

                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full border rounded-xl p-3"
                            />

                        </div>


                        {/* USERNAME */}

                        <div>

                            <label className="block font-medium mb-2">

                                Username

                            </label>

                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />

                        </div>


                        {/* EMAIL */}

                        <div>

                            <label className="block font-medium mb-2">

                                Email

                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />

                        </div>


                        {/* PHONE */}

                        <div>

                            <label className="block font-medium mb-2">

                                Phone

                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                        </div>


                        {/* ADDRESS */}

                        <div>

                            <label className="block font-medium mb-2">

                                Address

                            </label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter your address"
                                rows="4"
                                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                        </div>


                        {/* ROLE - READ ONLY */}

                        <div>

                            <label className="block font-medium mb-2">

                                Role

                            </label>

                            <input
                                type="text"
                                value={profile.role}
                                disabled
                                className="w-full border rounded-xl p-3 bg-gray-100 text-gray-500"
                            />

                            <p className="text-xs text-gray-500 mt-1">

                                Account role cannot be changed from profile.

                            </p>

                        </div>


                        {/* BUTTONS */}

                        <div className="flex gap-4 pt-4">


                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-green-700 text-white px-7 py-3 rounded-xl hover:bg-green-800 disabled:opacity-50"
                            >

                                {saving
                                    ? "Saving..."
                                    : "💾 Save Changes"
                                }

                            </button>


                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={saving}
                                className="bg-gray-200 text-gray-700 px-7 py-3 rounded-xl hover:bg-gray-300"
                            >

                                ❌ Cancel

                            </button>


                        </div>


                    </form>

                )}

            </div>

        </div>
    );
}

export default Profile;

