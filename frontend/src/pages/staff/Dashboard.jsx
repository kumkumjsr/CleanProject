// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
// ClipboardList,
// Clock,
// LoaderCircle,
// CheckCircle2,
// ArrowRight
// } from "lucide-react";

// import { getStaffStats } from "../../services/staffService";
// import StaffLayout from "../../layouts/StaffLayout";

// function DashboardContent() {
// const [stats, setStats] = useState({

//     total_tasks: 0,
//     pending_tasks: 0,
//     in_progress_tasks: 0,
//     completed_tasks: 0

// });


// const loadStats = async () => {

//     try {

//         const data = await getStaffStats();

//         setStats(data);

//     }
//     catch (error) {

//         console.log(error);

//     }

// };


// useEffect(() => {

//     loadStats();

// }, []);


// const cards = [

//     {
//         title: "Total Tasks",
//         value: stats.total_tasks,
//         icon: ClipboardList,
//         text: "All assigned tasks"
//     },

//     {
//         title: "Pending",
//         value: stats.pending_tasks,
//         icon: Clock,
//         text: "Waiting to start"
//     },

//     {
//         title: "In Progress",
//         value: stats.in_progress_tasks,
//         icon: LoaderCircle,
//         text: "Currently cleaning"
//     },

//     {
//         title: "Completed",
//         value: stats.completed_tasks,
//         icon: CheckCircle2,
//         text: "Successfully completed"
//     }

// ];


// return (

//     <div>


//         {/* HEADER */}

//         <div className="mb-8">

//             <h1 className="text-3xl font-bold text-gray-800">

//                 Staff Dashboard

//             </h1>

//             <p className="text-gray-500 mt-1">

//                 Track your assigned cleaning work

//             </p>

//         </div>



//         {/* STATS */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

//             {cards.map((card) => {

//                 const Icon = card.icon;

//                 return (

//                     <div
//                         key={card.title}
//                         className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition"
//                     >

//                         <div className="flex items-center justify-between">

//                             <div>

//                                 <p className="text-sm text-gray-500">
//                                     {card.title}
//                                 </p>

//                                 <h2 className="text-3xl font-bold text-gray-800 mt-2">
//                                     {card.value}
//                                 </h2>

//                             </div>


//                             <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">

//                                 <Icon
//                                     size={24}
//                                     className="text-green-700"
//                                 />

//                             </div>

//                         </div>


//                         <p className="text-xs text-gray-400 mt-4">

//                             {card.text}

//                         </p>

//                     </div>

//                 );

//             })}

//         </div>



//         {/* TASK SECTION */}

//         <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-7">

//             <div className="flex items-center justify-between">

//                 <div>

//                     <h2 className="text-xl font-bold text-gray-800">

//                         My Assigned Tasks

//                     </h2>

//                     <p className="text-gray-500 text-sm mt-1">

//                         View and manage your cleaning assignments

//                     </p>

//                 </div>


//                 <Link
//                     to="/staff/tasks"
//                     className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
//                 >

//                     View Tasks

//                     <ArrowRight size={18} />

//                 </Link>

//             </div>


//             <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">


//                 <div className="rounded-xl bg-yellow-50 border border-yellow-100 p-5">

//                     <p className="text-sm text-yellow-700">
//                         Pending
//                     </p>

//                     <p className="text-2xl font-bold text-yellow-800 mt-1">
//                         {stats.pending_tasks}
//                     </p>

//                 </div>


//                 <div className="rounded-xl bg-blue-50 border border-blue-100 p-5">

//                     <p className="text-sm text-blue-700">
//                         In Progress
//                     </p>

//                     <p className="text-2xl font-bold text-blue-800 mt-1">
//                         {stats.in_progress_tasks}
//                     </p>

//                 </div>


//                 <div className="rounded-xl bg-green-50 border border-green-100 p-5">

//                     <p className="text-sm text-green-700">
//                         Completed
//                     </p>

//                     <p className="text-2xl font-bold text-green-800 mt-1">
//                         {stats.completed_tasks}
//                     </p>

//                 </div>

//             </div>

//         </div>


//     </div>

// );
// ```

// }

// function Dashboard() {

// ```
// return (

//     <StaffLayout>

//         <DashboardContent />

//     </StaffLayout>

// );


// }

// export default Dashboard;






import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ClipboardList,
    Clock,
    LoaderCircle,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";

import { getStaffStats } from "../../services/staffService";
import StaffLayout from "../../layouts/StaffLayout";


function DashboardContent() {

    const [stats, setStats] = useState({
        total_tasks: 0,
        pending_tasks: 0,
        in_progress_tasks: 0,
        completed_tasks: 0,
    });

    const [loading, setLoading] = useState(true);


    const loadStats = async () => {

        try {

            const data = await getStaffStats();

            setStats(data);

        } catch (error) {

            console.log("Staff Stats Error:", error);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadStats();

    }, []);


    const cards = [

        {
            title: "Total Tasks",
            value: stats.total_tasks,
            icon: ClipboardList,
            text: "All assigned tasks",
        },

        {
            title: "Pending",
            value: stats.pending_tasks,
            icon: Clock,
            text: "Waiting to start",
        },

        {
            title: "In Progress",
            value: stats.in_progress_tasks,
            icon: LoaderCircle,
            text: "Currently cleaning",
        },

        {
            title: "Completed",
            value: stats.completed_tasks,
            icon: CheckCircle2,
            text: "Successfully completed",
        },

    ];


    return (

        <div>

            {/* HEADER */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Staff Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                    Track your assigned cleaning work
                </p>

            </div>


            {/* LOADING */}

            {loading ? (

                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    Loading dashboard...
                </div>

            ) : (

                <>


                    {/* STATS */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                        {cards.map((card) => {

                            const Icon = card.icon;

                            return (

                                <div
                                    key={card.title}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition"
                                >

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-sm text-gray-500">
                                                {card.title}
                                            </p>

                                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                                {card.value}
                                            </h2>

                                        </div>


                                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">

                                            <Icon
                                                size={24}
                                                className="text-green-700"
                                            />

                                        </div>

                                    </div>


                                    <p className="text-xs text-gray-400 mt-4">
                                        {card.text}
                                    </p>

                                </div>

                            );

                        })}

                    </div>



                    {/* ASSIGNED TASK SECTION */}

                    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-7">

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                            <div>

                                <h2 className="text-xl font-bold text-gray-800">
                                    My Assigned Tasks
                                </h2>

                                <p className="text-gray-500 text-sm mt-1">
                                    View and manage your cleaning assignments
                                </p>

                            </div>


                            <Link
                                to="/staff/tasks"
                                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
                            >

                                View Tasks

                                <ArrowRight size={18} />

                            </Link>

                        </div>


                        {/* TASK STATUS */}

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">


                            {/* PENDING */}

                            <div className="rounded-xl bg-yellow-50 border border-yellow-100 p-5">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-yellow-700">
                                            Pending
                                        </p>

                                        <p className="text-2xl font-bold text-yellow-800 mt-1">
                                            {stats.pending_tasks}
                                        </p>

                                    </div>

                                    <Clock
                                        size={28}
                                        className="text-yellow-600"
                                    />

                                </div>

                            </div>



                            {/* IN PROGRESS */}

                            <div className="rounded-xl bg-blue-50 border border-blue-100 p-5">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-blue-700">
                                            In Progress
                                        </p>

                                        <p className="text-2xl font-bold text-blue-800 mt-1">
                                            {stats.in_progress_tasks}
                                        </p>

                                    </div>

                                    <LoaderCircle
                                        size={28}
                                        className="text-blue-600"
                                    />

                                </div>

                            </div>



                            {/* COMPLETED */}

                            <div className="rounded-xl bg-green-50 border border-green-100 p-5">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-green-700">
                                            Completed
                                        </p>

                                        <p className="text-2xl font-bold text-green-800 mt-1">
                                            {stats.completed_tasks}
                                        </p>

                                    </div>

                                    <CheckCircle2
                                        size={28}
                                        className="text-green-600"
                                    />

                                </div>

                            </div>


                        </div>

                    </div>


                </>

            )}

        </div>

    );

}


function Dashboard() {

    return (

        <StaffLayout>

            <DashboardContent />

        </StaffLayout>

    );

}


export default Dashboard;
