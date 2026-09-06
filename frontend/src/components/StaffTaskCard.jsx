import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { startTask } from "../services/staffService";


function StaffTaskCard({ task, onUpdate }) {

    const navigate = useNavigate();

    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);


    const handleStart = async () => {

        if (!image) {

            alert(
                "Please upload before cleaning image"
            );

            return;
        }


        try {

            setLoading(true);


            await startTask(
                task.id,
                image
            );


            alert(
                "Cleaning Started Successfully"
            );


            onUpdate(
                task.id,
                "IN_PROGRESS"
            );

        }

        catch (error) {

            console.log(error);

            alert(
                "Start task failed"
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="bg-white shadow-xl rounded-2xl p-6 mb-5">


            <h2 className="text-xl font-bold">

                🗑️ {task.title}

            </h2>


            <p className="text-gray-600 mt-2">

                {task.description}

            </p>


            <p className="mt-3">

                📍 {task.location}

            </p>


            <p className="mt-3">

                Status:

                <span className="font-bold ml-2">

                    {task.status}

                </span>

            </p>


            {/* =========================
                PENDING
            ========================= */}

            {task.status === "PENDING" && (

                <div className="mt-5">


                    <label className="block mb-2 font-semibold">

                        Upload Before Cleaning Image

                    </label>


                    <input

                        type="file"

                        accept="image/*"

                        onChange={(e) =>
                            setImage(
                                e.target.files[0]
                            )
                        }

                        className="border p-2 rounded w-full"

                    />


                    {image && (

                        <img

                            src={URL.createObjectURL(image)}

                            alt="Before Cleaning Preview"

                            className="mt-4 w-full h-48 object-cover rounded-xl"

                        />

                    )}


                    <button

                        onClick={handleStart}

                        disabled={loading}

                        className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-xl w-full"

                    >

                        {loading
                            ? "Starting..."
                            : "▶ Start Cleaning"
                        }

                    </button>

                </div>

            )}


            {/* =========================
                IN PROGRESS
            ========================= */}

            {task.status === "IN_PROGRESS" && (

                <div className="mt-5">


                    <p className="text-blue-600 font-semibold mb-3">

                        🔄 Cleaning in progress...

                    </p>


                    {task.before_image && (

                        <img

                            src={`http://127.0.0.1:8000${task.before_image}`}

                            alt="Before Cleaning"

                            className="w-full h-48 object-cover rounded-xl mb-4"

                        />

                    )}


                    <button

                        onClick={() =>
                            navigate(
                                `/staff/tasks/${task.id}/complete`
                            )
                        }

                        className="bg-green-700 text-white px-5 py-3 rounded-xl w-full"

                    >

                        ✅ Complete Task

                    </button>

                </div>

            )}


            {/* =========================
                COMPLETED
            ========================= */}

            {task.status === "COMPLETED" && (

                <div className="mt-5">


                    <p className="text-green-700 font-bold">

                        ✅ Task Completed

                    </p>


                    {task.before_image && (

                        <div className="mt-4">

                            <p className="font-semibold mb-2">

                                Before Cleaning

                            </p>

                            <img

                                src={`http://127.0.0.1:8000${task.before_image}`}

                                alt="Before Cleaning"

                                className="w-full h-48 object-cover rounded-xl"

                            />

                        </div>

                    )}


                    {task.after_image && (

                        <div className="mt-4">

                            <p className="font-semibold mb-2">

                                After Cleaning

                            </p>

                            <img

                                src={`http://127.0.0.1:8000${task.after_image}`}

                                alt="After Cleaning"

                                className="w-full h-48 object-cover rounded-xl"

                            />

                        </div>

                    )}


                    {task.cleaning_duration !== null && (

                        <p className="mt-4">

                            ⏱️ Cleaning Time:

                            <b className="ml-2">

                                {task.cleaning_duration} minutes

                            </b>

                        </p>

                    )}

                </div>

            )}

        </div>

    );

}


export default StaffTaskCard;