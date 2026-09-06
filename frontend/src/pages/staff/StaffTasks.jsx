import { useEffect, useState } from "react";

import {
    getStaffTasks,
    updateTaskStatus
} from "../../services/staffService";

import StaffTaskCard from "../../components/StaffTaskCard";

import StaffLayout from "../../layouts/StaffLayout";


function StaffTasksContent() {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);


    // =========================
    // LOAD STAFF TASKS
    // =========================

    const loadTasks = async () => {

        try {

            setLoading(true);

            const data = await getStaffTasks();

            setTasks(data);

        }

        catch (error) {

            console.log(
                "Task Fetch Error:",
                error
            );

        }

        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadTasks();

    }, []);


    // =========================
    // UPDATE TASK STATUS
    // =========================

    const handleUpdate = async (id, status) => {

        try {

            await updateTaskStatus(
                id,
                status
            );

            await loadTasks();

        }

        catch (error) {

            console.log(
                "Status Update Error:",
                error
            );

        }

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <StaffLayout>

                <div className="flex justify-center items-center min-h-[400px]">

                    <div className="text-center">

                        <div className="text-4xl mb-3">
                            ⏳
                        </div>

                        <p className="text-gray-500">
                            Loading your tasks...
                        </p>

                    </div>

                </div>

            </StaffLayout>

        );

    }


    // =========================
    // PAGE
    // =========================

    return (

        <StaffLayout>

            <div className="max-w-7xl mx-auto">


                {/* PAGE HEADER */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">

                        📋 My Assigned Tasks

                    </h1>

                    <p className="text-gray-500 mt-2">

                        View and manage your assigned cleaning tasks.

                    </p>

                </div>


                {/* TASK COUNT */}

                {tasks.length > 0 && (

                    <div className="mb-6 bg-white rounded-2xl shadow-sm p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">

                                    Total Assigned Tasks

                                </p>

                                <p className="text-3xl font-bold text-gray-800 mt-1">

                                    {tasks.length}

                                </p>

                            </div>


                            <div className="bg-green-100 text-green-700 p-4 rounded-xl text-2xl">

                                🧹

                            </div>

                        </div>

                    </div>

                )}


                {/* NO TASK */}

                {tasks.length === 0 ? (

                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

                        <div className="text-6xl mb-5">

                            📋

                        </div>


                        <h2 className="text-2xl font-bold text-gray-700">

                            No Tasks Assigned

                        </h2>


                        <p className="text-gray-500 mt-2">

                            New cleaning assignments from admin will appear here.

                        </p>

                    </div>

                ) : (

                    /* TASK LIST */

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {tasks.map((task) => (

                            <StaffTaskCard

                                key={task.id}

                                task={task}

                                onUpdate={handleUpdate}

                            />

                        ))}

                    </div>

                )}

            </div>

        </StaffLayout>

    );

}


// IMPORTANT
// StaffTasks naam ka wrapper component define karna hai

function StaffTasks() {

    return (

        <StaffTasksContent />

    );

}


export default StaffTasks;

