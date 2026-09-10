import { useEffect, useState } from "react";
import axios from "axios";

function ReportIssue() {

    const [dustbins, setDustbins] = useState([]);
    const [dustbinId, setDustbinId] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loadingDustbins, setLoadingDustbins] = useState(true);


    // =========================================================
    // LOAD DUSTBINS
    // =========================================================

    useEffect(() => {

        const fetchDustbins = async () => {

            try {

                const response = await axios.get(
                    "https://cleanproject-b0mh.onrender.com/api/dustbins/"
                );

                console.log(
                    "Dustbins:",
                    response.data
                );

                // API response array ya results dono handle karega
                const data = Array.isArray(response.data)
                    ? response.data
                    : response.data.results || [];

                // Sirf active dustbins
                const activeDustbins = data.filter(
                    (dustbin) =>
                        dustbin.is_active !== false
                );

                setDustbins(activeDustbins);

            } catch (err) {

                console.error(
                    "Dustbin Fetch Error:",
                    err.response?.data || err.message
                );

                setError(
                    "Unable to load dustbins"
                );

            } finally {

                setLoadingDustbins(false);

            }
        };

        fetchDustbins();

    }, []);


    // =========================================================
    // DUSTBIN SELECT
    // =========================================================

    const handleDustbinChange = (e) => {

        const selectedBinId = e.target.value;

        setDustbinId(selectedBinId);

        // Selected dustbin automatically location set karega
        const selectedDustbin = dustbins.find(
            (dustbin) =>
                String(dustbin.bin_id) ===
                String(selectedBinId)
        );

        if (selectedDustbin) {

            setLocation(
                selectedDustbin.address || ""
            );

        } else {

            setLocation("");

        }
    };


    // =========================================================
    // SUBMIT COMPLAINT
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");


        // Dustbin select check
        if (!dustbinId) {

            setError(
                "Please select a dustbin"
            );

            return;
        }


        // Title check
        if (!title.trim()) {

            setError(
                "Please enter issue title"
            );

            return;
        }


        // Description check
        if (!description.trim()) {

            setError(
                "Please describe the issue"
            );

            return;
        }


        try {

            const token =
                localStorage.getItem("access");


            const formData = new FormData();


            // IMPORTANT:
            // Backend ab public bin_id receive karega
            // Example: BIN-C635C804

            formData.append(
                "bin_id",
                dustbinId
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


            // =================================================
            // DEBUG
            // =================================================

            console.log(
                "========== COMPLAINT DATA =========="
            );

            for (
                const [key, value]
                of formData.entries()
            ) {

                console.log(
                    key,
                    value instanceof File
                        ? value.name
                        : value
                );

            }

            console.log(
                "===================================="
            );


            // =================================================
            // API REQUEST
            // =================================================

            const response = await axios.post(

                "https://cleanproject-b0mh.onrender.com/api/complaints/create/",

                formData,

                {
                    headers: {

                        Authorization:
                            `Bearer ${token}`,

                    },

                }

            );


            console.log(
                "Complaint response:",
                response.data
            );


            // SUCCESS
            setMessage(
                "Issue reported successfully ✅"
            );


            // Clear form
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


                {/* =================================================
                    SELECT DUSTBIN
                ================================================= */}

                <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Dustbin
                    </label>


                    <select
                        value={dustbinId}
                        onChange={handleDustbinChange}
                        className="w-full border rounded-xl p-3 bg-white"
                        required
                    >

                        <option value="">
                            {loadingDustbins
                                ? "Loading dustbins..."
                                : "Select a dustbin"
                            }
                        </option>


                        {!loadingDustbins &&
                            dustbins.map((dustbin) => (

                                <option
                                    key={dustbin.id}
                                    value={dustbin.bin_id}
                                >

                                    {dustbin.name}
                                    {" - "}
                                    {dustbin.bin_id}

                                </option>

                            ))
                        }

                    </select>

                </div>


                {/* =================================================
                    ISSUE TITLE
                ================================================= */}

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


                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <textarea
                    placeholder="Describe the issue"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    className="w-full border rounded-xl p-3 h-32"
                    required
                />


                {/* =================================================
                    LOCATION
                ================================================= */}

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


                {/* =================================================
                    IMAGE
                ================================================= */}

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setImage(
                            e.target.files[0]
                        )
                    }
                    className="w-full"
                />


                {/* =================================================
                    SUBMIT
                ================================================= */}

                <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
                >
                    Submit Report
                </button>

            </form>


            {/* =====================================================
                SUCCESS MESSAGE
            ===================================================== */}

            {message && (

                <p className="mt-4 text-green-600 font-semibold">
                    {message}
                </p>

            )}


            {/* =====================================================
                ERROR MESSAGE
            ===================================================== */}

            {error && (

                <p className="mt-4 text-red-600 font-semibold">
                    {error}
                </p>

            )}

        </div>

    );

}

export default ReportIssue;