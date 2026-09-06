// import { useEffect, useState } from "react";
// import axios from "axios";


// function CreateTask(){


// const [staff,setStaff] = useState([]);


// const [form,setForm] = useState({

//     title:"",
//     description:"",
//     assigned_to:"",
//     location:"",
//     status:"PENDING"

// });





// const loadStaff = async()=>{


// try{


// const res = await axios.get(

// "http://127.0.0.1:8000/api/accounts/staff/",

// {

// headers:{

// Authorization:
// `Bearer ${localStorage.getItem("access")}`

// }

// }

// );


// setStaff(res.data);


// }

// catch(error){

// console.log(error);

// }


// }





// useEffect(()=>{

// loadStaff();

// },[]);







// const handleChange=(e)=>{


// setForm({

// ...form,

// [e.target.name]:e.target.value

// });


// }






// const createTask = async(e)=>{


// e.preventDefault();



// try{


// await axios.post(

// "http://127.0.0.1:8000/api/tasks/create/",

// form,

// {

// headers:{

// Authorization:
// `Bearer ${localStorage.getItem("access")}`

// }

// }

// );



// alert("Task Created Successfully 🌱");



// setForm({

// title:"",
// description:"",
// assigned_to:"",
// location:"",
// status:"PENDING"

// });



// }

// catch(error){

// console.log(error);

// alert("Task creation failed");

// }


// }







// return(


// <div className="bg-white rounded-xl shadow p-6">


// <h1 className="text-3xl font-bold mb-6">

// Create Task

// </h1>




// <form onSubmit={createTask}>




// <input

// className="border p-3 w-full rounded mb-4"

// placeholder="Task Title"

// name="title"

// value={form.title}

// onChange={handleChange}

// />





// <textarea

// className="border p-3 w-full rounded mb-4"

// placeholder="Description"

// name="description"

// value={form.description}

// onChange={handleChange}

// />





// <select

// className="border p-3 w-full rounded mb-4"

// name="assigned_to"

// value={form.assigned_to}

// onChange={handleChange}

// >


// <option value="">

// Select Staff

// </option>



// {

// staff.map((item)=>(


// <option

// key={item.id}

// value={item.id}

// >

// {item.username}

// </option>


// ))


// }


// </select>






// <input

// className="border p-3 w-full rounded mb-4"

// placeholder="Location"

// name="location"

// value={form.location}

// onChange={handleChange}

// />





// <select

// className="border p-3 w-full rounded mb-4"

// name="status"

// value={form.status}

// onChange={handleChange}

// >


// <option value="PENDING">

// PENDING

// </option>


// <option value="IN_PROGRESS">

// IN_PROGRESS

// </option>


// <option value="COMPLETED">

// COMPLETED

// </option>


// </select>







// <button

// className="bg-green-600 text-white px-6 py-3 rounded-xl"

// >

// Create Task

// </button>




// </form>


// </div>


// )


// }



// export default CreateTask;


// import { useEffect, useState } from "react";
// import axios from "axios";


// function CreateTask() {


//     const [dustbins, setDustbins] = useState([]);

//     const [staff, setStaff] = useState([]);

//     const [loading, setLoading] = useState(true);

//     const [submitting, setSubmitting] = useState(false);


//     const [form, setForm] = useState({

//         dustbin_id: "",

//         worker_id: ""

//     });




//     // ==========================================
//     // AUTH HEADER
//     // ==========================================

//     const getHeaders = () => {

//         return {

//             headers: {

//                 Authorization:
//                     `Bearer ${localStorage.getItem("access")}`

//             }

//         };

//     };




//     // ==========================================
//     // LOAD DUSTBINS + STAFF
//     // ==========================================

//     const loadData = async () => {

//         try {

//             const [dustbinResponse, staffResponse] =
//                 await Promise.all([

//                     axios.get(
//                         "http://127.0.0.1:8000/api/dustbins/reported/",
//                         getHeaders()
//                     ),

//                     axios.get(
//                         "http://127.0.0.1:8000/api/employees/available/",
//                         getHeaders()
//                     )

//                 ]);


//             setDustbins(dustbinResponse.data);

//             setStaff(staffResponse.data);


//         }
//         catch (error) {

//             console.log(error);

//             alert("Unable to load dustbins or staff");

//         }
//         finally {

//             setLoading(false);

//         }

//     };




//     // ==========================================
//     // PAGE LOAD
//     // ==========================================

//     useEffect(() => {

//         loadData();

//     }, []);




//     // ==========================================
//     // HANDLE CHANGE
//     // ==========================================

//     const handleChange = (e) => {

//         setForm({

//             ...form,

//             [e.target.name]: e.target.value

//         });

//     };




//     // ==========================================
//     // CREATE TASK
//     // ==========================================

//     const createTask = async (e) => {

//         e.preventDefault();


//         if (!form.dustbin_id) {

//             alert("Please select a dustbin");

//             return;

//         }


//         if (!form.worker_id) {

//             alert("Please select a staff member");

//             return;

//         }


//         setSubmitting(true);


//         try {

//             const response = await axios.post(

//                 "http://127.0.0.1:8000/api/tasks/create/",

//                 {

//                     dustbin_id: form.dustbin_id,

//                     worker_id: form.worker_id

//                 },

//                 getHeaders()

//             );


//             console.log(response.data);


//             alert(
//                 `Task Assigned Successfully ✅\n\nWorker: ${response.data.worker}\nDustbin: ${response.data.dustbin}`
//             );


//             // Reset form

//             setForm({

//                 dustbin_id: "",

//                 worker_id: ""

//             });


//             // Refresh reported dustbins

//             loadData();


//         }
//         catch (error) {

//             console.log(error);

//             console.log(error.response?.data);


//             alert(

//                 error.response?.data?.error ||

//                 "Task creation failed"

//             );

//         }
//         finally {

//             setSubmitting(false);

//         }

//     };




//     // ==========================================
//     // LOADING
//     // ==========================================

//     if (loading) {

//         return (

//             <div className="p-6">

//                 <h1 className="text-2xl font-bold">

//                     Loading...

//                 </h1>

//             </div>

//         );

//     }




//     // ==========================================
//     // PAGE
//     // ==========================================

//     return (

//         <div className="max-w-3xl mx-auto">

//             <div className="bg-white rounded-2xl shadow-xl p-8">


//                 {/* HEADER */}

//                 <div className="mb-8">

//                     <h1 className="text-3xl font-bold">

//                         Create Cleaning Task

//                     </h1>

//                     <p className="text-gray-500 mt-2">

//                         Assign a reported full dustbin to an available staff member.

//                     </p>

//                 </div>




//                 <form onSubmit={createTask}>


//                     {/* =================================
//                         DUSTBIN
//                     ================================= */}

//                     <div className="mb-6">

//                         <label className="block font-semibold mb-2">

//                             🗑️ Select Full Dustbin

//                         </label>


//                         <select

//                             name="dustbin_id"

//                             value={form.dustbin_id}

//                             onChange={handleChange}

//                             className="w-full border border-gray-300 rounded-xl p-3"

//                         >

//                             <option value="">

//                                 Select Dustbin

//                             </option>


//                             {

//                                 dustbins.map((dustbin) => (

//                                     <option

//                                         key={dustbin.id}

//                                         value={dustbin.id}

//                                     >

//                                         {dustbin.name} - {dustbin.address}

//                                     </option>

//                                 ))

//                             }

//                         </select>


//                         {

//                             dustbins.length === 0 && (

//                                 <p className="text-red-500 text-sm mt-2">

//                                     No reported full dustbins available.

//                                 </p>

//                             )

//                         }

//                     </div>




//                     {/* =================================
//                         STAFF
//                     ================================= */}

//                     <div className="mb-6">

//                         <label className="block font-semibold mb-2">

//                             👷 Select Staff

//                         </label>


//                         <select

//                             name="worker_id"

//                             value={form.worker_id}

//                             onChange={handleChange}

//                             className="w-full border border-gray-300 rounded-xl p-3"

//                         >

//                             <option value="">

//                                 Select Staff

//                             </option>


//                             {

//                                 staff.map((item) => (

//                                     <option

//                                         key={item.id}

//                                         value={item.id}

//                                     >

//                                         {item.name} - {item.employee_id}

//                                     </option>

//                                 ))

//                             }

//                         </select>


//                         {

//                             staff.length === 0 && (

//                                 <p className="text-red-500 text-sm mt-2">

//                                     No available staff found.

//                                 </p>

//                             )

//                         }

//                     </div>




//                     {/* =================================
//                         SELECTED DUSTBIN PREVIEW
//                     ================================= */}

//                     {

//                         form.dustbin_id && (

//                             <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">


//                                 <h2 className="font-bold text-lg text-red-700">

//                                     🚨 Selected Dustbin

//                                 </h2>


//                                 {

//                                     (() => {

//                                         const selected =
//                                             dustbins.find(

//                                                 item =>
//                                                     String(item.id) ===
//                                                     String(form.dustbin_id)

//                                             );


//                                         if (!selected) {

//                                             return null;

//                                         }


//                                         return (

//                                             <div className="mt-3">

//                                                 <p>

//                                                     <strong>Name:</strong>{" "}

//                                                     {selected.name}

//                                                 </p>


//                                                 <p>

//                                                     <strong>Address:</strong>{" "}

//                                                     {selected.address}

//                                                 </p>


//                                                 <p>

//                                                     <strong>Type:</strong>{" "}

//                                                     {selected.type}

//                                                 </p>


//                                                 <a

//                                                     href={`https://maps.google.com/?q=${selected.latitude},${selected.longitude}`}

//                                                     target="_blank"

//                                                     rel="noreferrer"

//                                                     className="inline-block mt-3 text-green-700 font-semibold"

//                                                 >

//                                                     📍 View Location

//                                                 </a>

//                                             </div>

//                                         );

//                                     })()

//                                 }

//                             </div>

//                         )

//                     }




//                     {/* =================================
//                         SELECTED STAFF PREVIEW
//                     ================================= */}

//                     {

//                         form.worker_id && (

//                             <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">


//                                 <h2 className="font-bold text-lg text-blue-700">

//                                     👷 Assigned Staff

//                                 </h2>


//                                 {

//                                     (() => {

//                                         const selected =
//                                             staff.find(

//                                                 item =>
//                                                     String(item.id) ===
//                                                     String(form.worker_id)

//                                             );


//                                         if (!selected) {

//                                             return null;

//                                         }


//                                         return (

//                                             <div className="mt-3">

//                                                 <p>

//                                                     <strong>Name:</strong>{" "}

//                                                     {selected.name}

//                                                 </p>


//                                                 <p>

//                                                     <strong>Employee ID:</strong>{" "}

//                                                     {selected.employee_id}

//                                                 </p>


//                                                 <p>

//                                                     <strong>Department:</strong>{" "}

//                                                     {selected.department}

//                                                 </p>

//                                             </div>

//                                         );

//                                     })()

//                                 }

//                             </div>

//                         )

//                     }




//                     {/* =================================
//                         SUBMIT
//                     ================================= */}

//                     <button

//                         type="submit"

//                         disabled={submitting}

//                         className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl transition"

//                     >

//                         {

//                             submitting

//                                 ? "Assigning Task..."

//                                 : "🚀 Assign Cleaning Task"

//                         }

//                     </button>


//                 </form>


//             </div>

//         </div>

//     );

// }


// export default CreateTask;





import { useEffect, useState } from "react";
import axios from "axios";

function CreateTask() {

    const [dustbins, setDustbins] = useState([]);
    const [staff, setStaff] = useState([]);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        dustbin_id: "",
        worker_id: ""
    });

    const API = "http://127.0.0.1:8000";



    // =====================================================
    // AUTH HEADER
    // =====================================================

    const getHeaders = () => {

        const token = localStorage.getItem("access");

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };



    // =====================================================
    // LOAD DUSTBINS
    // =====================================================

    const loadDustbins = async () => {

        try {

            const response = await axios.get(
                `${API}/api/dustbins/`,
                getHeaders()
            );

            console.log(
                "ALL DUSTBIN DATA:",
                response.data
            );


            let data = response.data;


            // Handle different response formats

            if (data && Array.isArray(data.results)) {
                data = data.results;
            }


            if (!Array.isArray(data)) {
                data = [];
            }


            setDustbins(data);

        }
        catch (error) {

            console.log(
                "DUSTBIN ERROR:",
                error.response?.data || error
            );

            setDustbins([]);

        }

    };



    // =====================================================
    // LOAD STAFF
    // =====================================================

    const loadStaff = async () => {

        try {

            const response = await axios.get(
                `${API}/api/employees/available/`,
                getHeaders()
            );


            console.log(
                "ALL STAFF DATA:",
                response.data
            );


            let data = response.data;


            // Handle different response formats

            if (data && Array.isArray(data.results)) {
                data = data.results;
            }


            if (!Array.isArray(data)) {
                data = [];
            }


            setStaff(data);

        }
        catch (error) {

            console.log(
                "STAFF ERROR:",
                error.response?.data || error
            );

            setStaff([]);

        }

    };



    // =====================================================
    // LOAD EVERYTHING
    // =====================================================

    const loadData = async () => {

        setLoading(true);

        await Promise.all([
            loadDustbins(),
            loadStaff()
        ]);

        setLoading(false);

    };



    // =====================================================
    // PAGE LOAD
    // =====================================================

    useEffect(() => {

        loadData();

    }, []);



    // =====================================================
    // HANDLE CHANGE
    // =====================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    };



    // =====================================================
    // CREATE TASK
    // =====================================================

    const createTask = async (e) => {

        e.preventDefault();


        if (!form.dustbin_id) {

            alert("Please select a dustbin");

            return;

        }


        if (!form.worker_id) {

            alert("Please select a staff member");

            return;

        }


        setSubmitting(true);


        try {

            console.log(
                "SENDING TASK:",
                {
                    dustbin_id: form.dustbin_id,
                    worker_id: form.worker_id
                }
            );


            const response = await axios.post(

                `${API}/api/tasks/create/`,

                {
                    dustbin_id: form.dustbin_id,
                    worker_id: form.worker_id
                },

                getHeaders()

            );


            console.log(
                "TASK CREATED:",
                response.data
            );


            alert(
                `Task Assigned Successfully ✅\n\n` +
                `Worker: ${response.data.worker}\n` +
                `Dustbin: ${response.data.dustbin}`
            );


            // Reset

            setForm({
                dustbin_id: "",
                worker_id: ""
            });


            // Refresh

            await loadData();

        }
        catch (error) {

            console.log(
                "CREATE TASK ERROR:",
                error
            );


            console.log(
                "SERVER RESPONSE:",
                error.response?.data
            );


            const message =
                error.response?.data?.error ||
                error.response?.data?.detail ||
                "Task creation failed";


            alert(message);

        }
        finally {

            setSubmitting(false);

        }

    };



    // =====================================================
    // SELECTED DUSTBIN
    // =====================================================

    const selectedDustbin = dustbins.find(
        item =>
            String(item.id) ===
            String(form.dustbin_id)
    );



    // =====================================================
    // SELECTED STAFF
    // =====================================================

    const selectedStaff = staff.find(
        item =>
            String(item.id) ===
            String(form.worker_id)
    );



    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="p-6">

                <div className="
                    bg-white
                    rounded-2xl
                    shadow-xl
                    p-8
                ">

                    <h1 className="
                        text-2xl
                        font-bold
                        text-gray-800
                    ">

                        Loading Task Data...

                    </h1>

                    <p className="
                        text-gray-500
                        mt-2
                    ">

                        Loading dustbins and staff...

                    </p>

                </div>

            </div>

        );

    }



    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="
            max-w-3xl
            mx-auto
            p-4
        ">

            <div className="
                bg-white
                rounded-2xl
                shadow-xl
                p-8
            ">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mb-8">

                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-800
                    ">

                        Create Cleaning Task

                    </h1>


                    <p className="
                        text-gray-500
                        mt-2
                    ">

                        Assign a dustbin to an available staff member.

                    </p>

                </div>



                {/* =================================================
                    FORM
                ================================================= */}

                <form onSubmit={createTask}>


                    {/* =================================================
                        DUSTBIN
                    ================================================= */}

                    <div className="mb-6">

                        <label className="
                            block
                            font-semibold
                            mb-2
                            text-gray-700
                        ">

                            🗑️ Select Dustbin

                        </label>


                        <select

                            name="dustbin_id"

                            value={form.dustbin_id}

                            onChange={handleChange}

                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-xl
                                p-3
                                bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-green-500
                            "

                        >

                            <option value="">

                                Select Dustbin

                            </option>


                            {

                                dustbins.map((dustbin) => (

                                    <option

                                        key={dustbin.id}

                                        value={dustbin.id}

                                    >

                                        {dustbin.name}
                                        {" - "}
                                        {dustbin.address}

                                    </option>

                                ))

                            }

                        </select>


                        {/* DUSTBIN COUNT */}

                        <p className="
                            text-xs
                            text-gray-500
                            mt-2
                        ">

                            {dustbins.length} dustbin(s) available

                        </p>


                        {

                            dustbins.length === 0 && (

                                <p className="
                                    text-red-500
                                    text-sm
                                    mt-2
                                ">

                                    No dustbins found.

                                </p>

                            )

                        }

                    </div>



                    {/* =================================================
                        STAFF
                    ================================================= */}

                    <div className="mb-6">

                        <label className="
                            block
                            font-semibold
                            mb-2
                            text-gray-700
                        ">

                            👷 Select Staff

                        </label>


                        <select

                            name="worker_id"

                            value={form.worker_id}

                            onChange={handleChange}

                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-xl
                                p-3
                                bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "

                        >

                            <option value="">

                                Select Staff

                            </option>


                            {

                                staff.map((item) => (

                                    <option

                                        key={item.id}

                                        value={item.id}

                                    >

                                        {item.name}
                                        {" - "}
                                        {item.employee_id}

                                    </option>

                                ))

                            }

                        </select>


                        {/* STAFF COUNT */}

                        <p className="
                            text-xs
                            text-gray-500
                            mt-2
                        ">

                            {staff.length} staff member(s) available

                        </p>


                        {

                            staff.length === 0 && (

                                <p className="
                                    text-red-500
                                    text-sm
                                    mt-2
                                ">

                                    No staff found.

                                </p>

                            )

                        }

                    </div>



                    {/* =================================================
                        SELECTED DUSTBIN
                    ================================================= */}

                    {

                        selectedDustbin && (

                            <div className="
                                bg-red-50
                                border
                                border-red-200
                                rounded-xl
                                p-5
                                mb-6
                            ">

                                <h2 className="
                                    font-bold
                                    text-lg
                                    text-red-700
                                ">

                                    🚨 Selected Dustbin

                                </h2>


                                <div className="
                                    mt-3
                                    space-y-2
                                ">

                                    <p>

                                        <strong>
                                            Name:
                                        </strong>{" "}

                                        {selectedDustbin.name}

                                    </p>


                                    <p>

                                        <strong>
                                            Address:
                                        </strong>{" "}

                                        {selectedDustbin.address}

                                    </p>


                                    {

                                        selectedDustbin.type && (

                                            <p>

                                                <strong>
                                                    Type:
                                                </strong>{" "}

                                                {selectedDustbin.type}

                                            </p>

                                        )

                                    }


                                    {

                                        selectedDustbin.latitude != null &&
                                        selectedDustbin.longitude != null && (

                                            <a

                                                href={
                                                    `https://maps.google.com/?q=${selectedDustbin.latitude},${selectedDustbin.longitude}`
                                                }

                                                target="_blank"

                                                rel="noreferrer"

                                                className="
                                                    inline-block
                                                    mt-2
                                                    text-green-700
                                                    font-semibold
                                                    hover:underline
                                                "

                                            >

                                                📍 View Location

                                            </a>

                                        )

                                    }

                                </div>

                            </div>

                        )

                    }



                    {/* =================================================
                        SELECTED STAFF
                    ================================================= */}

                    {

                        selectedStaff && (

                            <div className="
                                bg-blue-50
                                border
                                border-blue-200
                                rounded-xl
                                p-5
                                mb-6
                            ">

                                <h2 className="
                                    font-bold
                                    text-lg
                                    text-blue-700
                                ">

                                    👷 Assigned Staff

                                </h2>


                                <div className="
                                    mt-3
                                    space-y-2
                                ">

                                    <p>

                                        <strong>
                                            Name:
                                        </strong>{" "}

                                        {selectedStaff.name}

                                    </p>


                                    <p>

                                        <strong>
                                            Username:
                                        </strong>{" "}

                                        {selectedStaff.username}

                                    </p>


                                    <p>

                                        <strong>
                                            Employee ID:
                                        </strong>{" "}

                                        {selectedStaff.employee_id}

                                    </p>


                                    <p>

                                        <strong>
                                            Department:
                                        </strong>{" "}

                                        {selectedStaff.department}

                                    </p>


                                    {

                                        selectedStaff.phone && (

                                            <p>

                                                <strong>
                                                    Phone:
                                                </strong>{" "}

                                                {selectedStaff.phone}

                                            </p>

                                        )

                                    }

                                </div>

                            </div>

                        )

                    }



                    {/* =================================================
                        SUMMARY
                    ================================================= */}

                    {

                        selectedDustbin &&
                        selectedStaff && (

                            <div className="
                                bg-green-50
                                border
                                border-green-200
                                rounded-xl
                                p-5
                                mb-6
                            ">

                                <h2 className="
                                    font-bold
                                    text-lg
                                    text-green-700
                                    mb-3
                                ">

                                    📋 Task Summary

                                </h2>


                                <p>

                                    🗑️{" "}

                                    <strong>
                                        Dustbin:
                                    </strong>{" "}

                                    {selectedDustbin.name}

                                </p>


                                <p className="mt-2">

                                    👷{" "}

                                    <strong>
                                        Staff:
                                    </strong>{" "}

                                    {selectedStaff.name}

                                </p>

                            </div>

                        )

                    }



                    {/* =================================================
                        SUBMIT
                    ================================================= */}

                    <button

                        type="submit"

                        disabled={
                            submitting ||
                            !form.dustbin_id ||
                            !form.worker_id
                        }

                        className="
                            w-full
                            bg-green-700
                            hover:bg-green-800
                            disabled:bg-gray-400
                            disabled:cursor-not-allowed
                            text-white
                            font-semibold
                            py-3
                            rounded-xl
                            transition
                        "

                    >

                        {

                            submitting

                                ? "Assigning Task..."

                                : "🚀 Assign Cleaning Task"

                        }

                    </button>


                </form>

            </div>

        </div>

    );

}

export default CreateTask;