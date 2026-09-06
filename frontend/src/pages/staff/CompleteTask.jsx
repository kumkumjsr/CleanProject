// import { useState } from "react";
// import { completeTask } from "../../services/staffService";
// import { useNavigate, useParams } from "react-router-dom";

// function CompleteTask() {

//     const { id } = useParams();

//     const navigate = useNavigate();

//     const [afterImage, setAfterImage] = useState(null);

//     const [completionNote, setCompletionNote] = useState("");

//     const [completedLocation, setCompletedLocation] = useState("");

//     const [loading, setLoading] = useState(false);



//     // Get Current Location Name
//     const getLocation = () => {

//         if (!navigator.geolocation) {

//             alert("Geolocation is not supported.");

//             return;

//         }


//         navigator.geolocation.getCurrentPosition(

//             async(position)=>{

//                 const lat = position.coords.latitude;

//                 const lon = position.coords.longitude;


//                 try{

//                     const res = await fetch(

//                         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`

//                     );

//                     const data = await res.json();

//                     setCompletedLocation(data.display_name);

//                 }

//                 catch(error){

//                     console.log(error);

//                     alert("Location fetch failed");

//                 }

//             },

//             ()=>{

//                 alert("Location permission denied");

//             }

//         );

//     };



//     const handleSubmit = async(e)=>{

//         e.preventDefault();

//         setLoading(true);

//         try{

//             const formData = new FormData();

//             formData.append("completion_note",completionNote);

//             formData.append("completed_location",completedLocation);

//             if(afterImage){

//                 formData.append("after_image",afterImage);

//             }

//             await completeTask(id,formData);

//             alert("Task Completed Successfully");

//             navigate("/staff/tasks");

//         }

//         catch(error){

//             console.log(error);

//             alert("Something went wrong");

//         }

//         setLoading(false);

//     };



//     return(

//         <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-6">

//             <h1 className="text-2xl font-bold mb-5">

//                 Complete Task

//             </h1>


//             <form onSubmit={handleSubmit}>


//                 <label className="font-semibold">

//                     Upload After Cleaning Image

//                 </label>

//                 <input

//                     type="file"

//                     className="border w-full p-2 mt-2 mb-4"

//                     onChange={(e)=>setAfterImage(e.target.files[0])}

//                     required

//                 />



//                 <label className="font-semibold">

//                     Completion Note

//                 </label>

//                 <textarea

//                     className="border w-full p-3 mt-2 mb-4"

//                     rows="4"

//                     value={completionNote}

//                     onChange={(e)=>setCompletionNote(e.target.value)}

//                     placeholder="Area cleaned successfully..."

//                     required

//                 />



//                 <label className="font-semibold">

//                     Location

//                 </label>

//                 <div className="flex gap-2 mt-2">

//                     <input

//                         className="border p-2 flex-1"

//                         value={completedLocation}

//                         readOnly

//                     />

//                     <button

//                         type="button"

//                         onClick={getLocation}

//                         className="bg-blue-600 text-white px-4 rounded"

//                     >

//                         Get Location

//                     </button>

//                 </div>



//                 <button

//                     className="bg-green-600 text-white w-full mt-6 py-3 rounded"

//                     disabled={loading}

//                 >

//                     {

//                         loading

//                         ?

//                         "Submitting..."

//                         :

//                         "Complete Task"

//                     }

//                 </button>

//             </form>

//         </div>

//     );

// }

// export default CompleteTask;


import { useState } from "react";

import {
    completeTask
} from "../../services/staffService";

import {
    useNavigate,
    useParams
} from "react-router-dom";


function CompleteTask() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [afterImage, setAfterImage] =
        useState(null);

    const [completionNote, setCompletionNote] =
        useState("");

    const [completedLocation, setCompletedLocation] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    // =========================
    // GET CURRENT LOCATION
    // =========================

    const getLocation = () => {

        if (!navigator.geolocation) {

            alert(
                "Geolocation is not supported"
            );

            return;
        }


        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const lat =
                    position.coords.latitude;

                const lon =
                    position.coords.longitude;


                try {

                    const response =
                        await fetch(

                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`

                        );


                    const data =
                        await response.json();


                    setCompletedLocation(
                        data.display_name || ""
                    );

                }

                catch (error) {

                    console.log(error);

                    alert(
                        "Location fetch failed"
                    );

                }

            },

            () => {

                alert(
                    "Location permission denied"
                );

            }

        );

    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!afterImage) {

            alert(
                "Please upload after cleaning image"
            );

            return;
        }


        if (!completionNote) {

            alert(
                "Please enter completion note"
            );

            return;
        }


        setLoading(true);


        try {

            const formData =
                new FormData();


            formData.append(
                "completion_note",
                completionNote
            );


            formData.append(
                "completed_location",
                completedLocation
            );


            formData.append(
                "after_image",
                afterImage
            );


            await completeTask(
                id,
                formData
            );


            alert(
                "Task Completed Successfully"
            );


            navigate(
                "/staff/tasks"
            );

        }

        catch (error) {

            console.log(error);

            alert(
                error.response?.data?.error ||
                "Something went wrong"
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">


            <h1 className="text-2xl font-bold mb-6">

                Complete Cleaning Task

            </h1>


            <form onSubmit={handleSubmit}>


                {/* AFTER IMAGE */}

                <label className="font-semibold">

                    Upload After Cleaning Image

                </label>


                <input

                    type="file"

                    accept="image/*"

                    className="border w-full p-2 mt-2 mb-4"

                    onChange={(e) =>
                        setAfterImage(
                            e.target.files[0]
                        )
                    }

                    required

                />


                {afterImage && (

                    <img

                        src={URL.createObjectURL(afterImage)}

                        alt="After Preview"

                        className="w-full h-56 object-cover rounded-xl mb-5"

                    />

                )}


                {/* NOTE */}

                <label className="font-semibold">

                    Completion Note

                </label>


                <textarea

                    className="border w-full p-3 mt-2 mb-4 rounded"

                    rows="4"

                    value={completionNote}

                    onChange={(e) =>
                        setCompletionNote(
                            e.target.value
                        )
                    }

                    placeholder="Area cleaned successfully..."

                    required

                />


                {/* LOCATION */}

                <label className="font-semibold">

                    Completed Location

                </label>


                <div className="flex gap-2 mt-2">


                    <input

                        className="border p-2 flex-1 rounded"

                        value={completedLocation}

                        readOnly

                        placeholder="Click Get Location"

                    />


                    <button

                        type="button"

                        onClick={getLocation}

                        className="bg-blue-600 text-white px-4 rounded"

                    >

                        📍 Get Location

                    </button>

                </div>


                {/* COMPLETE */}

                <button

                    type="submit"

                    disabled={loading}

                    className="bg-green-600 text-white w-full mt-6 py-3 rounded-xl font-semibold"

                >

                    {loading
                        ? "Submitting..."
                        : "✅ Complete Task"
                    }

                </button>


            </form>

        </div>

    );

}


export default CompleteTask;