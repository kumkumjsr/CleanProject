// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import {
//     PieChart,
//     Pie,
//     Cell,
//     Tooltip,
//     ResponsiveContainer
// } from "recharts";

// import DashboardLayout from "../../layouts/DashboardLayout";

// const COLORS = [
//     "#22c55e",
//     "#3b82f6",
//     "#f59e0b",
//     "#ef4444",
//     "#8b5cf6"
// ];

// function AdminDashboard(){


//     const navigate = useNavigate();


//     const [data,setData] = useState(null);

//     const [loading,setLoading] = useState(true);




//     useEffect(()=>{

//         fetchDashboard();

//     },[]);





//     const fetchDashboard = async()=>{


//         try{


//             const token = localStorage.getItem("access");


//             const response = await axios.get(

//                 "https://cleanproject-b0mh.onrender.com/api/dashboard/admin/",

//                 {

//                     headers:{

//                         Authorization:`Bearer ${token}`

//                     }

//                 }

//             );


//             setData(response.data);



//         }

//         catch(error){


//             console.log(
//                 "Dashboard Error",
//                 error
//             );


//         }


//         finally{


//             setLoading(false);


//         }


//     };






//     if(loading){


//         return(

//             <DashboardLayout>

//                 <div className="p-6">

//                     Loading Dashboard...

//                 </div>

//             </DashboardLayout>

//         );


//     }







//     const cards=[


//         {

//             title:"Total Users",

//             value:data.total_users,

//             icon:"👥"

//         },


//         {

//             title:"Total Staff",

//             value:data.total_staff,

//             icon:"🧑‍💼"

//         },


//         {

//             title:"Waste Scans",

//             value:data.total_scans,

//             icon:"♻️"

//         },


//         {

//             title:"Waste Categories",

//             value:data.chart_data.length,

//             icon:"📊"

//         }


//     ];






// return(



// <DashboardLayout>



// <div className="p-6">





// {/* Welcome */}



// <div className="mb-8">


// <h1 className="text-3xl font-bold">

// Welcome Admin 👋

// </h1>


// <p className="text-gray-600 mt-2">

// Monitor Smart Waste AI system activities.

// </p>


// </div>








// {/* Cards */}



// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">



// {
// cards.map((card,index)=>(


// <div

// key={index}

// className="bg-white shadow rounded-xl p-6 flex justify-between items-center"

// >


// <div>


// <p className="text-gray-500">

// {card.title}

// </p>



// <h2 className="text-3xl font-bold">

// {card.value}

// </h2>



// </div>




// <div className="text-4xl">

// {card.icon}

// </div>



// </div>



// ))

// }



// </div>










// <div className="grid lg:grid-cols-2 gap-6 mt-8">



// {/* Chart */}


// <div className="bg-white shadow rounded-xl p-6">


// <h2 className="text-xl font-bold mb-4">
// Waste Category Summary
// </h2>



// <ResponsiveContainer width="100%" height={300}>


// <PieChart>


// <Pie

// data={data.chart_data}

// dataKey="value"

// nameKey="name"

// outerRadius={100}

// label


// >


// {
// data.chart_data.map(

// (item,index)=>(


// <Cell

// key={index}

// fill={
//     COLORS[index % COLORS.length]
// }

// />


// )

// )

// }


// </Pie>



// <Tooltip/>


// </PieChart>


// </ResponsiveContainer>





// {/* Legend */}


// <div className="flex flex-wrap justify-center gap-4 mt-4">


// {
// data.chart_data.map(

// (item,index)=>(


// <div

// key={index}

// className="flex items-center gap-2"

// >


// <div

// className="w-3 h-3 rounded-full"

// style={{

// backgroundColor:
// COLORS[index % COLORS.length]

// }}

// />


// <span className="text-sm">

// {item.name}

// </span>



// </div>


// )

// )

// }


// </div>



// </div>







// {/* Quick Actions */}



// <div className="bg-white shadow rounded-xl p-6">



// <h2 className="text-xl font-bold mb-4">

// Quick Actions

// </h2>




// <div className="space-y-3">





// <button

// onClick={()=>navigate("/admin/users")}

// className="w-full bg-green-700 hover:bg-green-800 text-white p-3 rounded-lg"

// >

// 👥 Manage Users

// </button>







// <button

// onClick={()=>navigate("/admin/staff/create")}

// className="w-full bg-green-700 hover:bg-green-800 text-white p-3 rounded-lg"

// >

// 👷 Create Staff

// </button>







// <button

// onClick={()=>navigate("/admin/staff")}

// className="w-full bg-green-700 hover:bg-green-800 text-white p-3 rounded-lg"

// >

// 🧑‍💼 View Staff

// </button>







// <button

// onClick={()=>navigate("/admin/reports")}

// className="w-full bg-green-700 hover:bg-green-800 text-white p-3 rounded-lg"

// >

// 📊 View Reports

// </button>




// </div>



// </div>





// </div>









// {/* Recent Users */}



// <div className="bg-white shadow rounded-xl p-6 mt-8">


// <h2 className="text-xl font-bold mb-4">

// Recent Users

// </h2>



// <table className="w-full">


// <thead>

// <tr className="border-b">


// <th className="text-left p-2">
// Name
// </th>


// <th className="text-left p-2">
// Email
// </th>


// <th className="text-left p-2">
// Phone
// </th>


// </tr>

// </thead>





// <tbody>


// {
// data.recent_users.map(user=>(


// <tr key={user.id} className="border-b">


// <td className="p-2">

// {user.username}

// </td>


// <td className="p-2">

// {user.email}

// </td>


// <td className="p-2">

// {user.phone}

// </td>


// </tr>



// ))

// }


// </tbody>


// </table>


// </div>









// {/* Recent Scans */}



// <div className="bg-white shadow rounded-xl p-6 mt-8">


// <h2 className="text-xl font-bold mb-4">

// Recent Waste Scans

// </h2>



// <table className="w-full">


// <thead>

// <tr className="border-b">


// <th className="text-left p-2">

// Waste

// </th>


// <th className="text-left p-2">

// Confidence

// </th>


// </tr>


// </thead>





// <tbody>



// {
// data.recent_scans.map(scan=>(


// <tr key={scan.id} className="border-b">


// <td className="p-2">

// {scan.waste_type}

// </td>


// <td className="p-2">

// {scan.confidence}%

// </td>


// </tr>



// ))

// }



// </tbody>



// </table>



// </div>







// </div>



// </DashboardLayout>



// )


// }



// export default AdminDashboard;



// import { useEffect, useState } from "react";
// import axios from "axios";

// import {
//     ClipboardList,
//     Clock,
//     CheckCircle,
//     Loader
// } from "lucide-react";



// function AdminDashboard(){


// const [stats,setStats] = useState({

//     total_tasks:0,
//     pending_tasks:0,
//     in_progress_tasks:0,
//     completed_tasks:0

// });




// const getStats = async()=>{


// try{


// const response = await axios.get(

// "https://cleanproject-b0mh.onrender.com/api/tasks/admin/stats/",

// {

// headers:{

// Authorization:
// `Bearer ${localStorage.getItem("access")}`

// }

// }

// );


// setStats(response.data);


// }

// catch(error){

// console.log(error);

// }


// }




// useEffect(()=>{

// getStats();

// },[]);







// const cards=[


// {
// title:"Total Tasks",
// value:stats.total_tasks,
// icon:<ClipboardList size={30}/>
// },


// {
// title:"Pending Tasks",
// value:stats.pending_tasks,
// icon:<Clock size={30}/>
// },


// {
// title:"In Progress",
// value:stats.in_progress_tasks,
// icon:<Loader size={30}/>
// },


// {
// title:"Completed",
// value:stats.completed_tasks,
// icon:<CheckCircle size={30}/>
// }


// ];





// return(


// <div>


// <h1 className="text-3xl font-bold mb-6">

// Admin Dashboard

// </h1>




// <div className="grid grid-cols-1 md:grid-cols-4 gap-5">



// {

// cards.map((card,index)=>(


// <div

// key={index}

// className="bg-white shadow-lg rounded-xl p-6"

// >


// <div className="flex justify-between items-center">


// <div>

// <p className="text-gray-500">

// {card.title}

// </p>


// <h2 className="text-3xl font-bold mt-2">

// {card.value}

// </h2>


// </div>



// <div className="text-green-600">

// {card.icon}

// </div>


// </div>


// </div>


// ))


// }


// </div>





// <div className="mt-8 bg-white shadow rounded-xl p-6">


// <h2 className="text-xl font-bold mb-4">

// Task Summary

// </h2>



// <div className="space-y-3">


// <p>
// 🟡 Pending :
// <b> {stats.pending_tasks}</b>
// </p>


// <p>
// 🔵 In Progress :
// <b> {stats.in_progress_tasks}</b>
// </p>


// <p>
// 🟢 Completed :
// <b> {stats.completed_tasks}</b>
// </p>


// </div>



// </div>



// </div>


// )


// }


// export default AdminDashboard;


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import DashboardLayout from "../../layouts/DashboardLayout";


const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6"
];


// =========================================================
// ADMIN DASHBOARD
// =========================================================

function AdminDashboard() {

    const navigate = useNavigate();


    // =====================================================
    // STATES
    // =====================================================

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [dustbins, setDustbins] = useState([]);

    const [lastDustbinUpdate, setLastDustbinUpdate] =
        useState(null);


    const [taskStats, setTaskStats] = useState({

        total_tasks: 0,
        pending_tasks: 0,
        in_progress_tasks: 0,
        completed_tasks: 0

    });


    // =====================================================
    // INITIAL LOAD + 1 HOUR DUSTBIN REFRESH
    // =====================================================

    useEffect(() => {

        fetchDashboard();

        fetchTaskStats();

        fetchDustbins();


        const dustbinInterval = setInterval(() => {

            fetchDustbins();

        }, 60 * 60 * 1000);


        return () => {

            clearInterval(dustbinInterval);

        };

    }, []);


    // =====================================================
    // FETCH DUSTBIN LOCATIONS
    // =====================================================

    const fetchDustbins = async () => {

        try {

            const token = localStorage.getItem("access");


            const response = await axios.get(

                "https://cleanproject-b0mh.onrender.com/api/dustbins/locations/",

                {
                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );


            setDustbins(response.data);


            setLastDustbinUpdate(
                new Date()
            );


        }

        catch (error) {

            console.log(
                "Dustbin Location Error",
                error
            );

        }

    };


    // =====================================================
    // FETCH ADMIN DASHBOARD
    // =====================================================

    const fetchDashboard = async () => {

        try {

            const token =
                localStorage.getItem("access");


            const response = await axios.get(

                "https://cleanproject-b0mh.onrender.com/api/dashboard/admin/",

                {
                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );


            console.log(
                "ADMIN DASHBOARD DATA:",
                response.data
            );


            setData(response.data);

        }

        catch (error) {

            console.log(
                "Dashboard Error",
                error
            );

        }

        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // FETCH TASK STATS
    // =====================================================

    const fetchTaskStats = async () => {

        try {

            const response = await axios.get(

                "https://cleanproject-b0mh.onrender.com/api/tasks/admin/stats/",

                {
                    headers: {

                        Authorization:
                            `Bearer ${localStorage.getItem("access")}`

                    }

                }

            );


            setTaskStats(response.data);

        }

        catch (error) {

            console.log(
                "Task Stats Error",
                error
            );

        }

    };


    // =====================================================
    // CONFIDENCE FORMATTER
    // =====================================================

    const formatConfidence = (value) => {

        // No confidence value
        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {

            return "N/A";

        }


        const number = Number(value);


        // Invalid value
        if (Number.isNaN(number)) {

            return "N/A";

        }


        /*
         * Backend usually stores confidence like:
         *
         * 0.95  → 95%
         * 0.87  → 87%
         *
         * But if database already stores:
         *
         * 95 → 95%
         * 87 → 87%
         *
         * both cases are handled.
         */

        if (number <= 1) {

            return `${Math.round(number * 100)}%`;

        }


        return `${Math.round(number)}%`;

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <DashboardLayout>

                <div className="p-6">

                    Loading Dashboard...

                </div>

            </DashboardLayout>

        );

    }


    // =====================================================
    // SAFETY CHECK
    // =====================================================

    if (!data) {

        return (

            <DashboardLayout>

                <div className="p-6">

                    <div className="bg-red-50 text-red-600 p-5 rounded-xl">

                        Unable to load dashboard data.

                    </div>

                </div>

            </DashboardLayout>

        );

    }


    // =====================================================
    // DASHBOARD CARDS
    // =====================================================

    const cards = [

        {

            title: "Total Users",

            value: data.total_users ?? 0,

            icon: "👥"

        },


        {

            title: "Total Staff",

            value: data.total_staff ?? 0,

            icon: "🧑‍💼"

        },


        {

            title: "Waste Scans",

            value: data.total_scans ?? 0,

            icon: "♻️"

        },


        {

            title: "Waste Categories",

            value: data.chart_data?.length ?? 0,

            icon: "📊"

        }

    ];


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <DashboardLayout>


            <div className="p-6">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold">

                        Welcome Admin 👋

                    </h1>


                    <p className="text-gray-600 mt-2">

                        Monitor Smart Waste AI system activities.

                    </p>

                </div>



                {/* =================================================
                    USER WASTE CARDS
                ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


                    {

                        cards.map((card, index) => (

                            <div

                                key={index}

                                className="bg-white shadow rounded-xl p-6 flex justify-between items-center"

                            >

                                <div>

                                    <p className="text-gray-500">

                                        {card.title}

                                    </p>


                                    <h2 className="text-3xl font-bold">

                                        {card.value}

                                    </h2>

                                </div>


                                <div className="text-4xl">

                                    {card.icon}

                                </div>

                            </div>

                        ))

                    }


                </div>



                {/* =================================================
                    TASK MANAGEMENT
                ================================================= */}

                <h2 className="text-2xl font-bold mt-10 mb-5">

                    Task Management

                </h2>


                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">


                    <div className="bg-white shadow rounded-xl p-6">

                        <p className="text-gray-500">

                            Total Tasks

                        </p>


                        <h2 className="text-3xl font-bold">

                            {taskStats.total_tasks}

                        </h2>

                    </div>



                    <div className="bg-white shadow rounded-xl p-6">

                        <p className="text-gray-500">

                            Pending

                        </p>


                        <h2 className="text-3xl font-bold text-yellow-600">

                            {taskStats.pending_tasks}

                        </h2>

                    </div>



                    <div className="bg-white shadow rounded-xl p-6">

                        <p className="text-gray-500">

                            In Progress

                        </p>


                        <h2 className="text-3xl font-bold text-blue-600">

                            {taskStats.in_progress_tasks}

                        </h2>

                    </div>



                    <div className="bg-white shadow rounded-xl p-6">

                        <p className="text-gray-500">

                            Completed

                        </p>


                        <h2 className="text-3xl font-bold text-green-600">

                            {taskStats.completed_tasks}

                        </h2>

                    </div>


                </div>



                {/* =================================================
                    CHART + QUICK ACTIONS
                ================================================= */}

                <div className="grid lg:grid-cols-2 gap-6 mt-8">


                    {/* CHART */}

                    <div className="bg-white shadow rounded-xl p-6">

                        <h2 className="text-xl font-bold mb-4">

                            Waste Category Summary

                        </h2>


                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie

                                    data={data.chart_data || []}

                                    dataKey="value"

                                    nameKey="name"

                                    outerRadius={100}

                                    label

                                >

                                    {

                                        (data.chart_data || []).map(

                                            (item, index) => (

                                                <Cell

                                                    key={index}

                                                    fill={
                                                        COLORS[
                                                            index %
                                                            COLORS.length
                                                        ]
                                                    }

                                                />

                                            )

                                        )

                                    }


                                </Pie>


                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>



                    {/* QUICK ACTIONS */}

                    <div className="bg-white shadow rounded-xl p-6">


                        <h2 className="text-xl font-bold mb-4">

                            Quick Actions

                        </h2>


                        <div className="space-y-3">


                            <button

                                onClick={() =>
                                    navigate("/admin/users")
                                }

                                className="w-full bg-green-700 text-white p-3 rounded-lg"

                            >

                                👥 Manage Users

                            </button>



                            <button

                                onClick={() =>
                                    navigate("/admin/staff/create")
                                }

                                className="w-full bg-green-700 text-white p-3 rounded-lg"

                            >

                                👷 Create Staff

                            </button>



                            <button

                                onClick={() =>
                                    navigate("/admin/tasks/create")
                                }

                                className="w-full bg-green-700 text-white p-3 rounded-lg"

                            >

                                📋 Create Task

                            </button>



                            <button

                                onClick={() =>
                                    navigate("/admin/tasks")
                                }

                                className="w-full bg-green-700 text-white p-3 rounded-lg"

                            >

                                📌 View Tasks

                            </button>


                        </div>


                    </div>


                </div>



                {/* =================================================
                    SMART DUSTBIN LOCATION MONITORING
                ================================================= */}

                <div className="bg-white shadow rounded-xl p-6 mt-8">


                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">


                        <div>

                            <h2 className="text-xl font-bold">

                                🗺️ Smart Dustbin Location Monitoring

                            </h2>


                            <p className="text-gray-500 text-sm mt-1">

                                Monitor active dustbin locations and status

                            </p>

                        </div>



                        <div className="text-sm">


                            <span className="text-green-600 font-semibold">

                                🟢 Monitoring Active

                            </span>


                            <p className="text-gray-500 text-xs mt-1">

                                Updates every 1 hour

                            </p>

                        </div>


                    </div>



                    {/* DUSTBIN COUNT + LAST UPDATE */}

                    <div className="flex flex-wrap gap-4 mb-4">


                        <div className="bg-gray-100 px-4 py-2 rounded-lg">

                            🗑️

                            <span className="font-semibold ml-1">

                                {dustbins.length}

                            </span>

                            <span className="text-gray-600 ml-1">

                                Dustbins

                            </span>

                        </div>



                        <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm">

                            🔄 Last checked:

                            <span className="font-semibold ml-1">

                                {

                                    lastDustbinUpdate

                                        ? lastDustbinUpdate.toLocaleTimeString()

                                        : "Not available"

                                }

                            </span>

                        </div>


                    </div>



                    {/* MAP */}

                    <div className="h-[450px] rounded-lg overflow-hidden">


                        <MapContainer

                            center={[22.8046, 86.2029]}

                            zoom={12}

                            style={{

                                height: "100%",

                                width: "100%"

                            }}

                        >


                            <TileLayer

                                attribution="&copy; OpenStreetMap contributors"

                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                            />



                            {

                                dustbins.map((dustbin) => {

                                    const latitude =
                                        parseFloat(
                                            dustbin.latitude
                                        );


                                    const longitude =
                                        parseFloat(
                                            dustbin.longitude
                                        );


                                    if (

                                        isNaN(latitude) ||

                                        isNaN(longitude)

                                    ) {

                                        return null;

                                    }


                                    return (

                                        <Marker

                                            key={dustbin.id}

                                            position={[

                                                latitude,

                                                longitude

                                            ]}

                                        >

                                            <Popup>


                                                <div className="min-w-[200px]">


                                                    <h3 className="font-bold text-base mb-2">

                                                        🗑️ {dustbin.name}

                                                    </h3>



                                                    <p className="text-sm">

                                                        <strong>
                                                            Type:
                                                        </strong>

                                                        {" "}

                                                        {dustbin.dustbin_type}

                                                    </p>



                                                    <p className="text-sm">

                                                        <strong>
                                                            Address:
                                                        </strong>

                                                        {" "}

                                                        {dustbin.address}

                                                    </p>



                                                    <p className="text-sm mt-2">

                                                        <strong>
                                                            Status:
                                                        </strong>


                                                        <span

                                                            className={

                                                                dustbin.is_full

                                                                    ? "text-red-600 font-bold ml-1"

                                                                    : "text-green-600 font-bold ml-1"

                                                            }

                                                        >

                                                            {

                                                                dustbin.is_full

                                                                    ? "FULL"

                                                                    : "AVAILABLE"

                                                            }

                                                        </span>

                                                    </p>



                                                    <p className="text-xs text-gray-500 mt-2">

                                                        📍

                                                        {" "}

                                                        {latitude.toFixed(6)}

                                                        ,

                                                        {" "}

                                                        {longitude.toFixed(6)}

                                                    </p>


                                                </div>


                                            </Popup>


                                        </Marker>

                                    );

                                })

                            }


                        </MapContainer>


                    </div>


                </div>



                {/* =================================================
                    RECENT USERS
                ================================================= */}

                <div className="bg-white shadow rounded-xl p-6 mt-8">


                    <h2 className="text-xl font-bold mb-4">

                        Recent Users

                    </h2>


                    <div className="overflow-x-auto">


                        <table className="w-full">


                            <thead>

                                <tr className="border-b">


                                    <th className="text-left p-2">

                                        Name

                                    </th>


                                    <th className="text-left p-2">

                                        Email

                                    </th>


                                    <th className="text-left p-2">

                                        Phone

                                    </th>


                                </tr>

                            </thead>



                            <tbody>


                                {

                                    (data.recent_users || []).map(

                                        (user) => (

                                            <tr

                                                key={user.id}

                                                className="border-b"

                                            >

                                                <td className="p-2">

                                                    {user.username}

                                                </td>


                                                <td className="p-2">

                                                    {user.email}

                                                </td>


                                                <td className="p-2">

                                                    {user.phone || "—"}

                                                </td>


                                            </tr>

                                        )

                                    )

                                }


                            </tbody>


                        </table>

                    </div>


                </div>



                {/* =================================================
                    RECENT SCANS
                ================================================= */}

                <div className="bg-white shadow rounded-xl p-6 mt-8">


                    <h2 className="text-xl font-bold mb-4">

                        Recent Waste Scans

                    </h2>


                    <div className="overflow-x-auto">


                        <table className="w-full">


                            <thead>

                                <tr className="border-b">


                                    <th className="text-left p-2">

                                        Waste

                                    </th>


                                    <th className="text-left p-2">

                                        Confidence

                                    </th>


                                </tr>

                            </thead>



                            <tbody>


                                {

                                    (data.recent_scans || []).map(

                                        (scan) => (

                                            <tr

                                                key={scan.id}

                                                className="border-b"

                                            >

                                                <td className="p-2">

                                                    {scan.waste_type || "Unknown"}

                                                </td>


                                                <td className="p-2">

                                                    {formatConfidence(
                                                        scan.confidence_score
                                                    )}

                                                </td>


                                            </tr>

                                        )

                                    )

                                }


                            </tbody>


                        </table>

                    </div>


                </div>


            </div>


        </DashboardLayout>

    );

}


export default AdminDashboard;

