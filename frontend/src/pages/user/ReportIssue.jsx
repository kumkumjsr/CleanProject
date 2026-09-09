import { useState } from "react";
import axios from "axios";

function ReportIssue() {
    const [dustbinId, setDustbinId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!dustbinId.trim()) {
            setError("Please enter Dustbin ID");
            return;
        }

        try {
            const token = localStorage.getItem("access");

            const formData = new FormData();

            // IMPORTANT
            formData.append(
                "dustbin_id",
                dustbinId.trim()
            );

            formData.append(
                "title",
                title.trim()
            );

            formData.append(
                "description",
                description.trim()
            );

            formData.append(
                "location",
                location.trim()
            );

            if (image) {
                formData.append(
                    "image",
                    image
                );
            }

            // Check what is being sent
            console.log("========== COMPLAINT DATA ==========");

            for (const [key, value] of formData.entries()) {
                console.log(
                    key,
                    value instanceof File
                        ? value.name
                        : value
                );
            }

            console.log("====================================");

            const response = await axios.post(
                "https://cleanproject-b0mh.onrender.com/api/complaints/create/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(
                "Complaint response:",
                response.data
            );

            setMessage(
                "Issue reported successfully ✅"
            );

            setDustbinId("");
            setTitle("");
            setDescription("");
            setLocation("");
            setImage(null);

        } catch (error) {
            console.log(
                "Complaint Error:",
                error.response?.data
            );

            setError(
                error.response?.data?.error ||
                "Failed to submit report"
            );
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">

            <h1 className="text-3xl font-bold text-red-600">
                🚨 Report Issue
            </h1>

            <p className="text-gray-500 mt-3">
                Report overflowing dustbins or illegal dumping here.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-4"
            >

                {/* DUSTBIN ID */}
                <input
                    type="text"
                    placeholder="Dustbin ID (e.g. 1)"
                    value={dustbinId}
                    onChange={(e) =>
                        setDustbinId(e.target.value)
                    }
                    className="w-full border rounded-xl p-3"
                    required
                />

                <input
                    type="text"
                    placeholder="Issue Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    className="w-full border rounded-xl p-3"
                    required
                />

                <textarea
                    placeholder="Describe the issue"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    className="w-full border rounded-xl p-3 h-32"
                    required
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                    className="w-full border rounded-xl p-3"
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setImage(e.target.files[0])
                    }
                    className="w-full"
                />

                <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
                >
                    Submit Report
                </button>

            </form>

            {message && (
                <p className="mt-4 text-green-600 font-semibold">
                    {message}
                </p>
            )}

            {error && (
                <p className="mt-4 text-red-600 font-semibold">
                    {error}
                </p>
            )}

        </div>
    );
}

export default ReportIssue;