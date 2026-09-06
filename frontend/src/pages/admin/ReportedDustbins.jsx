import { useEffect, useState } from "react";
import axios from "axios";

function ReportedDustbins() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [dustbins, setDustbins] = useState([]);
    const [workers, setWorkers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [workersLoading, setWorkersLoading] = useState(false);
    const [assigning, setAssigning] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [selectedDustbin, setSelectedDustbin] = useState(null);
    const [selectedWorker, setSelectedWorker] = useState("");

    // ======================================================
    // FETCH REPORTED DUSTBINS
    // ======================================================

    const fetchReports = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("access");

            const response = await axios.get(
                `${BASEURL}/api/dustbins/reported/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setDustbins(response.data);
        } catch (error) {
            console.log(
                "Reported Dustbins Error:",
                error.response?.data || error
            );

            if (error.response?.status === 401) {
                alert("Session expired. Please login again.");
            } else if (error.response?.status === 403) {
                alert("Only admin can view reported dustbins.");
            } else {
                alert("Failed to load reported dustbins.");
            }
        } finally {
            setLoading(false);
        }
    };

    // ======================================================
    // FETCH WORKERS
    // ======================================================

    const fetchWorkers = async () => {
        try {
            setWorkersLoading(true);

            const token = localStorage.getItem("access");

            const response = await axios.get(
                `${BASEURL}/api/employees/available/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setWorkers(response.data);
        } catch (error) {
            console.log(
                "Workers Fetch Error:",
                error.response?.data || error
            );

            alert("Failed to load available workers.");
        } finally {
            setWorkersLoading(false);
        }
    };

    // ======================================================
    // INITIAL LOAD
    // ======================================================

    useEffect(() => {
        fetchReports();
    }, []);

    // ======================================================
    // OPEN ASSIGN MODAL
    // ======================================================

    const openAssignModal = (dustbin) => {
        setSelectedDustbin(dustbin);
        setSelectedWorker("");
        setShowModal(true);

        fetchWorkers();
    };

    // ======================================================
    // CLOSE MODAL
    // ======================================================

    const closeModal = () => {
        if (assigning) {
            return;
        }

        setShowModal(false);
        setSelectedDustbin(null);
        setSelectedWorker("");
    };

    // ======================================================
    // ASSIGN WORKER
    // ======================================================

    const assignWorker = async () => {
        if (!selectedDustbin) {
            alert("Please select a dustbin.");
            return;
        }

        if (!selectedWorker) {
            alert("Please select a worker.");
            return;
        }

        try {
            setAssigning(true);

            const token = localStorage.getItem("access");

            const response = await axios.post(
                `${BASEURL}/api/tasks/create/`,
                {
                    dustbin_id: selectedDustbin.id,
                    worker_id: selectedWorker,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            alert(
                response.data?.message ||
                    "Worker assigned successfully! ✅"
            );

            setShowModal(false);
            setSelectedDustbin(null);
            setSelectedWorker("");

            // Refresh reported dustbins
            await fetchReports();
        } catch (error) {
            console.log(
                "Assign Error:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.detail ||
                    error.response?.data?.error ||
                    "Task Assignment Failed"
            );
        } finally {
            setAssigning(false);
        }
    };

    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {
        return (
            <div className="p-6">
                <div className="bg-white shadow rounded-2xl p-10 text-center">
                    <div className="text-4xl mb-3">🚨</div>

                    <p className="text-gray-500 text-lg">
                        Loading reported dustbins...
                    </p>
                </div>
            </div>
        );
    }

    // ======================================================
    // MAIN UI
    // ======================================================

    return (
        <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        🚨 Reported Full Dustbins
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Monitor full dustbins and assign workers
                        for collection.
                    </p>
                </div>

                <div className="bg-red-100 text-red-700 px-5 py-3 rounded-xl font-bold">
                    {dustbins.length} Full Dustbin
                    {dustbins.length !== 1 ? "s" : ""}
                </div>
            </div>

            {/* ==================================================
                NO REPORTS
            ================================================== */}

            {dustbins.length === 0 ? (
                <div className="bg-white shadow-xl rounded-2xl p-10 text-center">
                    <div className="text-6xl mb-4">
                        ✅
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">
                        No Full Dustbins Reported
                    </h2>

                    <p className="text-gray-500 mt-2">
                        All dustbins are currently available.
                    </p>
                </div>
            ) : (
                /* ==================================================
                   DUSTBIN CARDS
                ================================================== */

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {dustbins.map((item) => (
                        <div
                            key={item.id}
                            className="
                                bg-white
                                shadow-xl
                                rounded-2xl
                                p-6
                                border
                                border-red-100
                                hover:shadow-2xl
                                transition
                            "
                        >
                            {/* STATUS */}

                            <div className="flex items-center justify-between">
                                <span
                                    className="
                                        bg-red-100
                                        text-red-700
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        font-bold
                                    "
                                >
                                    🔴 FULL
                                </span>

                                {item.bin_id && (
                                    <span className="text-xs font-semibold text-gray-500">
                                        {item.bin_id}
                                    </span>
                                )}
                            </div>

                            {/* NAME */}

                            <h2 className="text-xl font-bold text-gray-800 mt-5">
                                🗑️ {item.name}
                            </h2>

                            {/* TYPE */}

                            <div className="mt-3">
                                <span className="
                                    inline-block
                                    bg-green-100
                                    text-green-700
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-semibold
                                ">
                                    {item.type}
                                </span>
                            </div>

                            {/* ADDRESS */}

                            <div className="mt-4 bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-500 mb-1">
                                    LOCATION
                                </p>

                                <p className="text-gray-700 font-medium">
                                    📍 {item.address}
                                </p>
                            </div>

                            {/* COORDINATES */}

                            <div className="mt-3 bg-gray-50 rounded-xl p-4 text-sm">
                                <p>
                                    <b>Latitude:</b>{" "}
                                    {item.latitude}
                                </p>

                                <p className="mt-1">
                                    <b>Longitude:</b>{" "}
                                    {item.longitude}
                                </p>
                            </div>

                            {/* PRIORITY */}

                            <div className="
                                mt-4
                                bg-red-50
                                border
                                border-red-100
                                rounded-xl
                                p-4
                            ">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Collection Priority
                                    </span>

                                    <span className="
                                        bg-red-600
                                        text-white
                                        px-3
                                        py-1
                                        rounded-full
                                        text-xs
                                        font-bold
                                    ">
                                        HIGH
                                    </span>
                                </div>
                            </div>

                            {/* VIEW LOCATION */}

                            <a
                                href={`https://maps.google.com/?q=${item.latitude},${item.longitude}`}
                                target="_blank"
                                rel="noreferrer"
                                className="
                                    block
                                    mt-5
                                    bg-green-700
                                    hover:bg-green-800
                                    text-white
                                    text-center
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    transition
                                "
                            >
                                📍 View Location
                            </a>

                            {/* ASSIGN WORKER */}

                            <button
                                onClick={() =>
                                    openAssignModal(item)
                                }
                                className="
                                    mt-3
                                    w-full
                                    bg-blue-600
                                    hover:bg-blue-700
                                    text-white
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    transition
                                "
                            >
                                👷 Assign Worker
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* ==================================================
                ASSIGN WORKER MODAL
            ================================================== */}

            {showModal && (
                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        bg-black/50
                        flex
                        items-center
                        justify-center
                        p-4
                    "
                >
                    <div className="
                        bg-white
                        rounded-2xl
                        p-6
                        md:p-8
                        w-full
                        max-w-md
                        shadow-2xl
                    ">
                        {/* MODAL HEADER */}

                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-bold text-gray-800">
                                👷 Assign Worker
                            </h2>

                            <button
                                onClick={closeModal}
                                disabled={assigning}
                                className="
                                    text-gray-500
                                    hover:text-gray-800
                                    text-2xl
                                    disabled:opacity-50
                                "
                            >
                                ✕
                            </button>
                        </div>

                        {/* DUSTBIN */}

                        <div className="
                            bg-red-50
                            border
                            border-red-100
                            rounded-xl
                            p-4
                            mb-5
                        ">
                            <p className="text-xs text-gray-500">
                                FULL DUSTBIN
                            </p>

                            <p className="font-bold text-gray-800 mt-1">
                                🗑️ {selectedDustbin?.name}
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                                {selectedDustbin?.address}
                            </p>

                            {selectedDustbin?.bin_id && (
                                <p className="text-xs text-green-700 font-semibold mt-2">
                                    {selectedDustbin.bin_id}
                                </p>
                            )}
                        </div>

                        {/* WORKER SELECT */}

                        <label className="
                            block
                            font-medium
                            text-gray-700
                            mb-2
                        ">
                            Select Available Worker
                        </label>

                        {workersLoading ? (
                            <div className="
                                w-full
                                border
                                rounded-xl
                                p-3
                                text-gray-500
                                text-center
                            ">
                                Loading workers...
                            </div>
                        ) : workers.length === 0 ? (
                            <div className="
                                w-full
                                bg-yellow-50
                                border
                                border-yellow-200
                                rounded-xl
                                p-4
                                text-yellow-700
                                text-sm
                            ">
                                ⚠️ No available workers found.
                            </div>
                        ) : (
                            <select
                                value={selectedWorker}
                                onChange={(e) =>
                                    setSelectedWorker(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-xl
                                    p-3
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-green-500
                                "
                            >
                                <option value="">
                                    Select Worker
                                </option>

                                {workers.map((worker) => (
                                    <option
                                        key={worker.id}
                                        value={worker.id}
                                    >
                                        {worker.name}
                                        {worker.department
                                            ? ` - ${worker.department}`
                                            : ""}
                                    </option>
                                ))}
                            </select>
                        )}

                        {/* ASSIGN */}

                        <button
                            onClick={assignWorker}
                            disabled={
                                assigning ||
                                workersLoading ||
                                workers.length === 0
                            }
                            className="
                                w-full
                                mt-5
                                bg-green-700
                                hover:bg-green-800
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                text-white
                                py-3
                                rounded-xl
                                font-semibold
                                transition
                            "
                        >
                            {assigning
                                ? "Assigning..."
                                : "✅ Assign Worker"}
                        </button>

                        {/* CANCEL */}

                        <button
                            onClick={closeModal}
                            disabled={assigning}
                            className="
                                w-full
                                mt-3
                                bg-gray-200
                                hover:bg-gray-300
                                disabled:opacity-50
                                text-gray-700
                                py-3
                                rounded-xl
                                font-semibold
                            "
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReportedDustbins;
