import { useEffect, useState } from "react";
import axios from "axios";

import {
    Users,
    UserCheck,
    ClipboardList,
    Recycle,
    Clock,
    CheckCircle,
    Loader,
} from "lucide-react";

import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";


function Reports() {

    // =====================================================
    // STATES
    // =====================================================

    const [summary, setSummary] = useState({});

    const [staffReport, setStaffReport] = useState([]);

    const [wasteReport, setWasteReport] = useState([]);

    const [areaReport, setAreaReport] = useState([]);


    // =====================================================
    // AUTH
    // =====================================================

    const token = localStorage.getItem("access");

    const headers = {
        Authorization: `Bearer ${token}`,
    };


    // =====================================================
    // LOAD REPORTS
    // =====================================================

    const loadReports = async () => {

        try {

            const [
                summaryRes,
                staffRes,
                wasteRes,
                areaRes
            ] = await Promise.all([

                axios.get(
                    "https://cleanproject-b0mh.onrender.com/api/tasks/reports/",
                    { headers }
                ),

                axios.get(
                    "https://cleanproject-b0mh.onrender.com/api/tasks/reports/staff/",
                    { headers }
                ),

                axios.get(
                    "https://cleanproject-b0mh.onrender.com/api/tasks/reports/waste/",
                    { headers }
                ),

                axios.get(
                    "https://cleanproject-b0mh.onrender.com/api/tasks/reports/area/",
                    { headers }
                ),

            ]);


            console.log(
                "SUMMARY REPORT:",
                summaryRes.data
            );

            console.log(
                "STAFF REPORT:",
                staffRes.data
            );


            setSummary(
                summaryRes.data || {}
            );


            setStaffReport(
                Array.isArray(staffRes.data)
                    ? staffRes.data
                    : []
            );


            setWasteReport(
                Array.isArray(wasteRes.data)
                    ? wasteRes.data
                    : []
            );


            setAreaReport(
                Array.isArray(areaRes.data)
                    ? areaRes.data
                    : []
            );

        }

        catch (error) {

            console.log(
                "Reports Error:",
                error.response?.data ||
                error.message
            );

        }

    };


    // =====================================================
    // LOAD PAGE
    // =====================================================

    useEffect(() => {

        loadReports();

    }, []);


    // =====================================================
    // SAFE SUMMARY VALUES
    // =====================================================

    const totalUsers =
        Number(summary.total_users) || 0;

    const totalStaff =
        Number(summary.total_staff) || 0;

    const totalTasks =
        Number(summary.total_tasks) || 0;

    const completedTasks =
        Number(
            summary.completed_tasks ??
            summary.completed ??
            0
        );

    const pendingTasks =
        Number(
            summary.pending_tasks ??
            summary.pending ??
            0
        );

    const inProgressTasks =
        Number(
            summary.in_progress_tasks ??
            summary.in_progress ??
            0
        );

    const totalScans =
        Number(
            summary.total_scans ??
            summary.scans ??
            0
        );


    // =====================================================
    // TASK STATUS CHART
    // =====================================================

    const taskStatus = [

        {
            name: "Completed",
            value: completedTasks,
        },

        {
            name: "Pending",
            value: pendingTasks,
        },

        {
            name: "In Progress",
            value: inProgressTasks,
        },

    ];


    // =====================================================
    // WASTE COLORS
    // =====================================================

    const pieColors = [

        "#2563eb",
        "#16a34a",
        "#f59e0b",
        "#dc2626",
        "#9333ea",

    ];


    // =====================================================
    // STAFF PERFORMANCE
    // =====================================================

    const getStaffStats = (staff) => {

        const completed =
            Number(staff.completed) || 0;

        const pending =
            Number(staff.pending) || 0;

        const inProgress =
            Number(staff.in_progress) || 0;


        /*
         * IMPORTANT:
         *
         * Sometimes old backend data may return:
         *
         * assigned = 0
         * completed = 2
         *
         * So we calculate a safe assigned value.
         */

        const backendAssigned =
            Number(staff.assigned) || 0;


        const calculatedAssigned =
            completed +
            pending +
            inProgress;


        const assigned =
            Math.max(
                backendAssigned,
                calculatedAssigned
            );


        let completionPercentage = 0;


        if (assigned > 0) {

            completionPercentage =
                Math.round(
                    (completed / assigned) * 100
                );

        }


        completionPercentage =
            Math.min(
                Math.max(
                    completionPercentage,
                    0
                ),
                100
            );


        return {

            assigned,

            completed,

            pending,

            inProgress,

            completionPercentage,

        };

    };


    // =====================================================
    // COMPLETION COLOR
    // =====================================================

    const getCompletionColor = (
        percentage
    ) => {

        if (percentage >= 80) {

            return "text-green-700 bg-green-100";

        }

        if (percentage >= 50) {

            return "text-yellow-700 bg-yellow-100";

        }

        if (percentage > 0) {

            return "text-orange-700 bg-orange-100";

        }

        return "text-gray-600 bg-gray-100";

    };


    // =====================================================
    // EXPORT EXCEL
    // =====================================================

    const exportExcel = () => {

        const summaryData = [

            {

                "Total Users":
                    totalUsers,

                "Total Staff":
                    totalStaff,

                "Total Tasks":
                    totalTasks,

                "Completed":
                    completedTasks,

                "Pending":
                    pendingTasks,

                "In Progress":
                    inProgressTasks,

                "Total Scans":
                    totalScans,

            },

        ];


        const staffData =
            staffReport.map((staff) => {

                const stats =
                    getStaffStats(staff);


                return {

                    "Staff":
                        staff.name ||
                        staff.staff ||
                        staff.username ||
                        "Unknown",

                    "Assigned":
                        stats.assigned,

                    "Completed":
                        stats.completed,

                    "Pending":
                        stats.pending,

                    "In Progress":
                        stats.inProgress,

                    "Completion %":
                        `${stats.completionPercentage}%`,

                };

            });


        const workbook =
            XLSX.utils.book_new();


        const summarySheet =
            XLSX.utils.json_to_sheet(
                summaryData
            );


        const staffSheet =
            XLSX.utils.json_to_sheet(
                staffData
            );


        XLSX.utils.book_append_sheet(
            workbook,
            summarySheet,
            "Summary"
        );


        XLSX.utils.book_append_sheet(
            workbook,
            staffSheet,
            "Staff Performance"
        );


        XLSX.writeFile(
            workbook,
            "EcoSmart_Report.xlsx"
        );

    };


    // =====================================================
    // EXPORT PDF
    // =====================================================

    const exportPDF = () => {

        const doc = new jsPDF();


        doc.setFontSize(18);

        doc.text(
            "EcoSmart Report",
            14,
            20
        );


        // -------------------------------------------------
        // SUMMARY
        // -------------------------------------------------

        autoTable(doc, {

            startY: 30,

            head: [
                ["Title", "Value"]
            ],

            body: [

                [
                    "Total Users",
                    totalUsers
                ],

                [
                    "Total Staff",
                    totalStaff
                ],

                [
                    "Total Tasks",
                    totalTasks
                ],

                [
                    "Completed",
                    completedTasks
                ],

                [
                    "Pending",
                    pendingTasks
                ],

                [
                    "In Progress",
                    inProgressTasks
                ],

                [
                    "Total Scans",
                    totalScans
                ],

            ],

        });


        // -------------------------------------------------
        // STAFF PERFORMANCE
        // -------------------------------------------------

        const staffRows =
            staffReport.map((staff) => {

                const stats =
                    getStaffStats(staff);


                return [

                    staff.name ||
                    staff.staff ||
                    staff.username ||
                    "Unknown",

                    stats.assigned,

                    stats.completed,

                    stats.pending,

                    stats.inProgress,

                    `${stats.completionPercentage}%`,

                ];

            });


        autoTable(doc, {

            startY:
                doc.lastAutoTable.finalY + 10,

            head: [[

                "Staff",

                "Assigned",

                "Completed",

                "Pending",

                "In Progress",

                "Completion %",

            ]],

            body:
                staffRows,

        });


        doc.save(
            "EcoSmart_Report.pdf"
        );

    };


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <div className="p-6">


            {/* =================================================
                HEADER
            ================================================= */}

            <h1 className="text-3xl font-bold mb-8">

                Reports Dashboard

            </h1>



            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div className="grid md:grid-cols-4 gap-6">


                {/* TOTAL USERS */}

                <div className="bg-white rounded-xl shadow p-5">

                    <div className="flex items-center gap-3">

                        <Users size={28} />

                        <div>

                            <p>
                                Total Users
                            </p>

                            <h2 className="text-3xl font-bold">

                                {totalUsers}

                            </h2>

                        </div>

                    </div>

                </div>



                {/* TOTAL STAFF */}

                <div className="bg-white rounded-xl shadow p-5">

                    <div className="flex items-center gap-3">

                        <UserCheck size={28} />

                        <div>

                            <p>
                                Total Staff
                            </p>

                            <h2 className="text-3xl font-bold">

                                {totalStaff}

                            </h2>

                        </div>

                    </div>

                </div>



                {/* TOTAL TASKS */}

                <div className="bg-white rounded-xl shadow p-5">

                    <div className="flex items-center gap-3">

                        <ClipboardList size={28} />

                        <div>

                            <p>
                                Total Tasks
                            </p>

                            <h2 className="text-3xl font-bold">

                                {totalTasks}

                            </h2>

                        </div>

                    </div>

                </div>



                {/* TOTAL SCANS */}

                <div className="bg-white rounded-xl shadow p-5">

                    <div className="flex items-center gap-3">

                        <Recycle size={28} />

                        <div>

                            <p>
                                Total Waste Scans
                            </p>

                            <h2 className="text-3xl font-bold">

                                {totalScans}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>



            {/* =================================================
                TASK STATUS CARDS
            ================================================= */}

            <div className="grid md:grid-cols-3 gap-5 mt-8">


                {/* PENDING */}

                <div className="bg-yellow-100 rounded-xl p-5">

                    <div className="flex items-center gap-2">

                        <Clock />

                        <h3 className="font-bold">
                            Pending
                        </h3>

                    </div>

                    <p className="text-4xl font-bold mt-3">

                        {pendingTasks}

                    </p>

                </div>



                {/* IN PROGRESS */}

                <div className="bg-blue-100 rounded-xl p-5">

                    <div className="flex items-center gap-2">

                        <Loader />

                        <h3 className="font-bold">
                            In Progress
                        </h3>

                    </div>

                    <p className="text-4xl font-bold mt-3">

                        {inProgressTasks}

                    </p>

                </div>



                {/* COMPLETED */}

                <div className="bg-green-100 rounded-xl p-5">

                    <div className="flex items-center gap-2">

                        <CheckCircle />

                        <h3 className="font-bold">
                            Completed
                        </h3>

                    </div>

                    <p className="text-4xl font-bold mt-3">

                        {completedTasks}

                    </p>

                </div>

            </div>



            {/* =================================================
                STAFF PERFORMANCE
            ================================================= */}

            <div className="bg-white shadow rounded-xl p-6 mt-8">

                <div className="mb-5">

                    <h2 className="text-2xl font-bold">

                        👷 Staff Performance

                    </h2>

                    <p className="text-sm text-gray-500 mt-1">

                        Monitor task assignment and completion status.

                    </p>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full border-collapse">

                        <thead className="bg-green-600 text-white">

                            <tr>

                                <th className="p-3 text-left">
                                    Staff
                                </th>

                                <th className="p-3 text-center">
                                    Assigned
                                </th>

                                <th className="p-3 text-center">
                                    Completed
                                </th>

                                <th className="p-3 text-center">
                                    Pending
                                </th>

                                <th className="p-3 text-center">
                                    In Progress
                                </th>

                                <th className="p-3 text-center">
                                    Completion %
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {staffReport.length > 0 ? (

                                staffReport.map(
                                    (staff, index) => {

                                        const stats =
                                            getStaffStats(
                                                staff
                                            );


                                        const staffName =
                                            staff.name ||
                                            staff.staff ||
                                            staff.username ||
                                            "Unknown Staff";


                                        const completionColor =
                                            getCompletionColor(
                                                stats.completionPercentage
                                            );


                                        return (

                                            <tr
                                                key={
                                                    staff.id ??
                                                    staff.staff_id ??
                                                    index
                                                }
                                                className="border-b hover:bg-gray-50 transition"
                                            >

                                                {/* STAFF */}

                                                <td className="p-3">

                                                    <div className="flex items-center gap-3">

                                                        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">

                                                            👷

                                                        </div>

                                                        <span className="font-medium text-gray-800">

                                                            {staffName}

                                                        </span>

                                                    </div>

                                                </td>


                                                {/* ASSIGNED */}

                                                <td className="p-3 text-center">

                                                    <span className="font-semibold">

                                                        {stats.assigned}

                                                    </span>

                                                </td>


                                                {/* COMPLETED */}

                                                <td className="p-3 text-center">

                                                    <span className="inline-flex min-w-[36px] justify-center px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold">

                                                        {stats.completed}

                                                    </span>

                                                </td>


                                                {/* PENDING */}

                                                <td className="p-3 text-center">

                                                    <span className="inline-flex min-w-[36px] justify-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">

                                                        {stats.pending}

                                                    </span>

                                                </td>


                                                {/* IN PROGRESS */}

                                                <td className="p-3 text-center">

                                                    <span className="inline-flex min-w-[36px] justify-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">

                                                        {stats.inProgress}

                                                    </span>

                                                </td>


                                                {/* COMPLETION */}

                                                <td className="p-3">

                                                    <div className="flex items-center justify-center gap-2">

                                                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">

                                                            <div
                                                                className="h-full bg-green-500 rounded-full transition-all"
                                                                style={{
                                                                    width:
                                                                        `${stats.completionPercentage}%`
                                                                }}
                                                            />

                                                        </div>


                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-bold ${completionColor}`}
                                                        >

                                                            {
                                                                stats.completionPercentage
                                                            }%

                                                        </span>

                                                    </div>

                                                </td>

                                            </tr>

                                        );

                                    }

                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="p-8 text-center text-gray-500"
                                    >

                                        No staff performance data available.

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>



            {/* =================================================
                WASTE CATEGORY
            ================================================= */}

            <div className="bg-white shadow rounded-xl p-6 mt-8">

                <h2 className="text-2xl font-bold mb-5">

                    ♻ Waste Category Report

                </h2>


                <div className="overflow-x-auto">

                    <table className="w-full border">

                        <thead className="bg-blue-600 text-white">

                            <tr>

                                <th className="p-3">
                                    Waste Type
                                </th>

                                <th className="p-3">
                                    Total
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {wasteReport.length > 0 ? (

                                wasteReport.map(
                                    (item, index) => (

                                        <tr
                                            key={index}
                                            className="border-b"
                                        >

                                            <td className="p-3">

                                                {item.waste_type}

                                            </td>

                                            <td className="p-3">

                                                {Number(item.total) || 0}

                                            </td>

                                        </tr>

                                    )
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="2"
                                        className="p-6 text-center text-gray-500"
                                    >

                                        No waste report available.

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>



            {/* =================================================
                AREA REPORT
            ================================================= */}

            <div className="bg-white shadow rounded-xl p-6 mt-8">

                <h2 className="text-2xl font-bold mb-5">

                    📍 Area Wise Cleaning

                </h2>


                <div className="overflow-x-auto">

                    <table className="w-full border">

                        <thead className="bg-purple-600 text-white">

                            <tr>

                                <th className="p-3">
                                    Location
                                </th>

                                <th className="p-3">
                                    Tasks
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {areaReport.length > 0 ? (

                                areaReport.map(
                                    (item, index) => (

                                        <tr
                                            key={index}
                                            className="border-b"
                                        >

                                            <td className="p-3">

                                                {item.location}

                                            </td>

                                            <td className="p-3">

                                                {Number(item.total) || 0}

                                            </td>

                                        </tr>

                                    )
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="2"
                                        className="p-6 text-center text-gray-500"
                                    >

                                        No area report available.

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>



            {/* =================================================
                CHARTS
            ================================================= */}

            <div className="grid md:grid-cols-2 gap-8 mt-8">


                {/* TASK STATUS */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-bold mb-5">

                        📊 Task Status

                    </h2>


                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <BarChart
                            data={taskStatus}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 10
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                            />

                            <YAxis
                                allowDecimals={false}
                            />

                            <Tooltip />

                            <Legend />

                            <Bar
                                dataKey="value"
                                name="Tasks"
                                fill="#16a34a"
                                radius={[
                                    6,
                                    6,
                                    0,
                                    0
                                ]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>



                {/* WASTE DISTRIBUTION */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-bold mb-5">

                        ♻ Waste Distribution

                    </h2>


                    {wasteReport.length > 0 ? (

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie
                                    data={wasteReport}
                                    dataKey="total"
                                    nameKey="waste_type"
                                    outerRadius={100}
                                    label
                                >

                                    {wasteReport.map(
                                        (entry, index) => (

                                            <Cell
                                                key={index}
                                                fill={
                                                    pieColors[
                                                        index %
                                                        pieColors.length
                                                    ]
                                                }
                                            />

                                        )
                                    )}

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    ) : (

                        <div className="h-[300px] flex items-center justify-center text-gray-500">

                            No waste data available.

                        </div>

                    )}

                </div>

            </div>



            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <div className="flex flex-wrap gap-4 mt-10">


                {/* PRINT */}

                <button
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                    onClick={() => window.print()}
                >

                    🖨 Print Report

                </button>



                {/* PDF */}

                <button
                    onClick={exportPDF}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                >

                    📄 Export PDF

                </button>



                {/* EXCEL */}

                <button
                    onClick={exportExcel}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >

                    📊 Export Excel

                </button>


            </div>


        </div>

    );

}


export default Reports;

