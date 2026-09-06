// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import { getStaffStats } from "../services/staffService";


// function StaffDashboard(){


//     const [stats,setStats] = useState({

//         total_tasks:0,
//         pending_tasks:0,
//         in_progress_tasks:0,
//         completed_tasks:0

//     });



//     const loadStats = async()=>{

//         try{

//             const data = await getStaffStats();

//             setStats(data);

//         }
//         catch(error){

//             console.log(error);

//         }

//     }



//     useEffect(()=>{

//         loadStats();

//     },[]);




//     return(


//         <div>


//             <h1 className="text-3xl font-bold mb-6">
//                 Staff Dashboard
//             </h1>




//             <div className="grid grid-cols-4 gap-5">



//                 <div className="bg-white shadow rounded-xl p-5">

//                     <h2 className="font-bold text-xl">
//                         Total Tasks
//                     </h2>

//                     <p className="text-3xl mt-3">
//                         {stats.total_tasks}
//                     </p>

//                 </div>




//                 <div className="bg-white shadow rounded-xl p-5">

//                     <h2 className="font-bold text-xl">
//                         Pending
//                     </h2>

//                     <p className="text-3xl mt-3">
//                         {stats.pending_tasks}
//                     </p>

//                 </div>




//                 <div className="bg-white shadow rounded-xl p-5">

//                     <h2 className="font-bold text-xl">
//                         In Progress
//                     </h2>

//                     <p className="text-3xl mt-3">
//                         {stats.in_progress_tasks}
//                     </p>

//                 </div>




//                 <div className="bg-white shadow rounded-xl p-5">

//                     <h2 className="font-bold text-xl">
//                         Completed
//                     </h2>

//                     <p className="text-3xl mt-3">
//                         {stats.completed_tasks}
//                     </p>

//                 </div>



//             </div>





//             <div className="mt-8">

//                 <Link

//                 to="/staff/tasks"

//                 className="bg-green-600 text-white px-5 py-3 rounded"

//                 >

//                 View My Tasks

//                 </Link>


//             </div>



//         </div>


//     )

// }


// export default StaffDashboard;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { getStaffStats } from "../services/staffService";


function StaffDashboard(){


    const [stats,setStats] = useState({

        total_tasks:0,
        pending_tasks:0,
        in_progress_tasks:0,
        completed_tasks:0

    });


    const [tasks,setTasks] = useState([]);




    const loadStats = async()=>{

        try{

            const data = await getStaffStats();

            setStats(data);

        }

        catch(error){

            console.log(error);

        }

    };






    const loadTasks = async()=>{


        try{


            const token = localStorage.getItem("access");


            const response = await axios.get(

                "http://127.0.0.1:8000/api/tasks/staff/",

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );


            setTasks(response.data.slice(0,3));


        }

        catch(error){

            console.log(error);

        }


    };







    useEffect(()=>{


        loadStats();

        loadTasks();


    },[]);







    return(


        <div className="p-8">



            <h1 className="text-3xl font-bold">

                👷 Staff Dashboard

            </h1>


            <p className="text-gray-500 mt-2">

                Manage your assigned cleaning tasks

            </p>







            <div className="grid md:grid-cols-4 gap-5 mt-8">



                <div className="bg-white shadow rounded-2xl p-6">

                    <h2 className="font-semibold text-gray-500">

                        Total Tasks

                    </h2>

                    <p className="text-4xl font-bold mt-3">

                        {stats.total_tasks}

                    </p>

                </div>





                <div className="bg-yellow-50 shadow rounded-2xl p-6">

                    <h2 className="font-semibold text-yellow-700">

                        Pending

                    </h2>

                    <p className="text-4xl font-bold mt-3">

                        {stats.pending_tasks}

                    </p>

                </div>





                <div className="bg-blue-50 shadow rounded-2xl p-6">

                    <h2 className="font-semibold text-blue-700">

                        In Progress

                    </h2>

                    <p className="text-4xl font-bold mt-3">

                        {stats.in_progress_tasks}

                    </p>

                </div>






                <div className="bg-green-50 shadow rounded-2xl p-6">

                    <h2 className="font-semibold text-green-700">

                        Completed

                    </h2>

                    <p className="text-4xl font-bold mt-3">

                        {stats.completed_tasks}

                    </p>

                </div>


            </div>









            <div className="mt-10">


                <div className="flex justify-between items-center mb-5">


                    <h2 className="text-2xl font-bold">

                        Recent Tasks

                    </h2>



                    <Link

                    to="/staff/tasks"

                    className="bg-green-700 text-white px-5 py-2 rounded-xl"

                    >

                    View All

                    </Link>


                </div>






                <div className="grid md:grid-cols-3 gap-5">


                {

                tasks.map((task)=>(


                    <div

                    key={task.id}

                    className="bg-white shadow rounded-2xl p-5"

                    >


                        <h3 className="font-bold text-lg">

                            🗑️ {task.title}

                        </h3>


                        <p className="text-gray-500 mt-2">

                            📍 {task.location}

                        </p>



                        <span className="inline-block mt-3 px-3 py-1 rounded-full bg-gray-100">

                            {task.status}

                        </span>



                    </div>


                ))


                }


                </div>



            </div>






        </div>


    );


}


export default StaffDashboard;