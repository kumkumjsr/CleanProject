import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    Eye,
    Edit,
    Trash2,
    MapPin,
    User,
    Clock,
    Camera,
    CheckCircle,
    PlayCircle,
    Timer
} from "lucide-react";


function TaskList() {


    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate();


    const API = "http://127.0.0.1:8000";


    // ============================
    // FETCH TASKS
    // ============================

    const fetchTasks = async () => {

        try {

            const response = await axios.get(

                `${API}/api/tasks/admin/`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${localStorage.getItem("access")}`

                    }

                }

            );


            setTasks(response.data);


        }

        catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchTasks();

    }, []);


    // ============================
    // DELETE TASK
    // ============================

    const deleteTask = async (id) => {


        const confirmDelete = window.confirm(

            "Are you sure you want to delete this task?"

        );


        if (!confirmDelete) {

            return;

        }


        try {


            await axios.delete(

                `${API}/api/tasks/admin/${id}/delete/`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${localStorage.getItem("access")}`

                    }

                }

            );


            alert("Task deleted successfully");


            fetchTasks();


        }

        catch (error) {

            console.log(error);

            alert("Failed to delete task");

        }

    };


    // ============================
    // STATUS COLOR
    // ============================

    const getStatusClass = (status) => {


        if (status === "COMPLETED") {

            return "bg-green-600";

        }


        if (status === "IN_PROGRESS") {

            return "bg-blue-600";

        }


        return "bg-yellow-500";

    };


    // ============================
    // IMAGE URL
    // ============================

    const getImageUrl = (image) => {


        if (!image) {

            return null;

        }


        if (image.startsWith("http")) {

            return image;

        }


        return `${API}${image}`;

    };


    // ============================
    // FORMAT DATE
    // ============================

    const formatDate = (date) => {


        if (!date) {

            return "Not available";

        }


        return new Date(date).toLocaleString();

    };


    // ============================
    // CLEANING DURATION
    // ============================

    const formatDuration = (minutes) => {


        if (
            minutes === null ||
            minutes === undefined
        ) {

            return "Not completed";

        }


        if (minutes < 60) {

            return `${minutes} minutes`;

        }


        const hours = Math.floor(minutes / 60);

        const remainingMinutes = minutes % 60;


        return `${hours} hr ${remainingMinutes} min`;

    };


    // ============================
    // LOADING
    // ============================

    if (!tasks) {

        return (

            <div className="p-6">

                Loading Tasks...

            </div>

        );

    }


    return (


        <div className="p-6">


            {/* ============================
                HEADER
            ============================ */}

            <div className="flex justify-between items-center mb-6">


                <div>

                    <h1 className="text-3xl font-bold">

                        All Tasks

                    </h1>


                    <p className="text-gray-500 mt-1">

                        Monitor assigned cleaning tasks

                    </p>

                </div>


                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl">

                    Total Tasks: <b>{tasks.length}</b>

                </div>


            </div>


            {/* ============================
                NO TASK
            ============================ */}

            {tasks.length === 0 ? (

                <div className="bg-white shadow rounded-xl p-8 text-center">

                    <p className="text-gray-500">

                        No Tasks Available

                    </p>

                </div>

            ) : (


                <div className="grid gap-6">


                    {tasks.map((task) => (


                        <div

                            key={task.id}

                            className="bg-white shadow-lg rounded-2xl p-6"

                        >


                            {/* ============================
                                TOP SECTION
                            ============================ */}

                            <div className="flex justify-between items-start">


                                <div>


                                    <h2 className="text-xl font-bold">

                                        🗑️ {task.title}

                                    </h2>


                                    <p className="text-gray-500 mt-1">

                                        Task ID: #{task.id}

                                    </p>


                                </div>


                                <span

                                    className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${getStatusClass(task.status)}`}

                                >

                                    {task.status}

                                </span>


                            </div>


                            {/* ============================
                                DESCRIPTION
                            ============================ */}

                            <p className="mt-4 text-gray-600">

                                {task.description}

                            </p>


                            {/* ============================
                                BASIC DETAILS
                            ============================ */}

                            <div className="grid md:grid-cols-2 gap-4 mt-5">


                                <div className="bg-gray-50 p-4 rounded-xl">


                                    <div className="flex items-center gap-2 font-semibold">

                                        <User size={18} />

                                        Staff

                                    </div>


                                    <p className="mt-2 text-gray-700">

                                        {task.assigned_staff

                                            ? (

                                                task.assigned_staff.first_name

                                                    ? `${task.assigned_staff.first_name} ${task.assigned_staff.last_name || ""}`

                                                    : task.assigned_staff.username

                                            )

                                            : "Not Assigned"

                                        }

                                    </p>


                                    {task.assigned_staff?.email && (

                                        <p className="text-sm text-gray-500">

                                            {task.assigned_staff.email}

                                        </p>

                                    )}


                                </div>


                                <div className="bg-gray-50 p-4 rounded-xl">


                                    <div className="flex items-center gap-2 font-semibold">

                                        <MapPin size={18} />

                                        Location

                                    </div>


                                    <p className="mt-2 text-gray-700">

                                        {task.location || "Not available"}

                                    </p>


                                </div>


                                <div className="bg-gray-50 p-4 rounded-xl">


                                    <div className="font-semibold">

                                        🗑️ Dustbin

                                    </div>


                                    <p className="mt-2 text-gray-700">

                                        {task.dustbin_name || "Not linked"}

                                    </p>


                                </div>


                                <div className="bg-gray-50 p-4 rounded-xl">


                                    <div className="font-semibold">

                                        📅 Created

                                    </div>


                                    <p className="mt-2 text-gray-700">

                                        {formatDate(task.created_at)}

                                    </p>


                                </div>


                            </div>


                            {/* ============================
                                CLEANING TIMELINE
                            ============================ */}

                            <div className="mt-6">


                                <h3 className="text-lg font-bold mb-4">

                                    Cleaning Timeline

                                </h3>


                                <div className="grid md:grid-cols-3 gap-4">


                                    {/* START */}

                                    <div className="border rounded-xl p-4">


                                        <div className="flex items-center gap-2 font-semibold text-blue-700">

                                            <PlayCircle size={20} />

                                            Started At

                                        </div>


                                        <p className="mt-2">

                                            {formatDate(task.started_at)}

                                        </p>


                                    </div>


                                    {/* COMPLETE */}

                                    <div className="border rounded-xl p-4">


                                        <div className="flex items-center gap-2 font-semibold text-green-700">

                                            <CheckCircle size={20} />

                                            Completed At

                                        </div>


                                        <p className="mt-2">

                                            {formatDate(task.completed_at)}

                                        </p>


                                    </div>


                                    {/* DURATION */}

                                    <div className="border rounded-xl p-4">


                                        <div className="flex items-center gap-2 font-semibold text-purple-700">

                                            <Timer size={20} />

                                            Cleaning Duration

                                        </div>


                                        <p className="mt-2">

                                            {formatDuration(

                                                task.cleaning_duration

                                            )}

                                        </p>


                                    </div>


                                </div>


                            </div>


                            {/* ============================
                                BEFORE / AFTER IMAGES
                            ============================ */}

                            <div className="mt-6">


                                <h3 className="text-lg font-bold mb-4">

                                    Cleaning Proof

                                </h3>


                                <div className="grid md:grid-cols-2 gap-6">


                                    {/* BEFORE */}

                                    <div>


                                        <div className="flex items-center gap-2 font-semibold mb-2">

                                            <Camera size={18} />

                                            Before Cleaning

                                        </div>


                                        {task.before_image ? (

                                            <img

                                                src={getImageUrl(
                                                    task.before_image
                                                )}

                                                alt="Before Cleaning"

                                                className="w-full h-64 object-cover rounded-xl border"

                                            />

                                        ) : (

                                            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-xl text-gray-500">

                                                Before image not uploaded

                                            </div>

                                        )}


                                    </div>


                                    {/* AFTER */}

                                    <div>


                                        <div className="flex items-center gap-2 font-semibold mb-2">

                                            <Camera size={18} />

                                            After Cleaning

                                        </div>


                                        {task.after_image ? (

                                            <img

                                                src={getImageUrl(
                                                    task.after_image
                                                )}

                                                alt="After Cleaning"

                                                className="w-full h-64 object-cover rounded-xl border"

                                            />

                                        ) : (

                                            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-xl text-gray-500">

                                                After image not uploaded

                                            </div>

                                        )}


                                    </div>


                                </div>


                            </div>


                            {/* ============================
                                COMPLETION DETAILS
                            ============================ */}

                            {task.status === "COMPLETED" && (

                                <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5">


                                    <h3 className="text-lg font-bold text-green-800 mb-3">

                                        Completion Details

                                    </h3>


                                    <div className="grid md:grid-cols-2 gap-4">


                                        <div>

                                            <b>Completion Note:</b>

                                            <p className="mt-1">

                                                {task.completion_note ||

                                                    "No note provided"

                                                }

                                            </p>

                                        </div>


                                        <div>

                                            <b>Completed Location:</b>

                                            <p className="mt-1">

                                                {task.completed_location ||

                                                    "Not available"

                                                }

                                            </p>

                                        </div>


                                    </div>


                                </div>

                            )}


                            {/* ============================
                                ACTION BUTTONS
                            ============================ */}

                            <div className="flex flex-wrap gap-3 mt-6">


                                <button

                                    onClick={() =>

                                        navigate(
                                            `/admin/tasks/${task.id}`
                                        )

                                    }

                                    className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"

                                >

                                    <Eye size={18} />

                                    View Details

                                </button>


                                <button

                                    onClick={() =>

                                        navigate(
                                            `/admin/tasks/edit/${task.id}`
                                        )

                                    }

                                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"

                                >

                                    <Edit size={18} />

                                    Edit

                                </button>


                                <button

                                    onClick={() =>

                                        deleteTask(task.id)

                                    }

                                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"

                                >

                                    <Trash2 size={18} />

                                    Delete

                                </button>


                            </div>


                        </div>


                    ))}


                </div>

            )}


        </div>

    );

}


export default TaskList;