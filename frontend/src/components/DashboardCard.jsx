import { useEffect, useState } from "react";
import axios from "axios";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function UserDashboard() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Latest waste scan for CO2 monitoring
    const [latestScan, setLatestScan] = useState(null);


    // =========================================================
    // LOAD DASHBOARD
    // =========================================================

    useEffect(() => {

        fetchDashboard();
        fetchLatestScan();

    }, []);


    // =========================================================
    // DASHBOARD API
    // =========================================================

    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(
                "http://127.0.0.1:8000/api/dashboard/user/dashboard/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
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


    // =========================================================
    // LATEST WASTE SCAN
    // =========================================================

    const fetchLatestScan = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(
                "http://127.0.0.1:8000/api/waste/history/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            if (
                response.data &&
                response.data.length > 0
            ) {

                // API returns newest scan first
                setLatestScan(response.data[0]);

            }

        }
        catch (error) {

            console.log(
                "CO2 Impact Error",
                error
            );

        }

    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="p-6">

                Loading Dashboard...

            </div>

        );

    }


    // =========================================================
    // SAFETY CHECK
    // =========================================================

    if (!data) {

        return (

            <div className="p-6">

                Unable to load dashboard.

            </div>

        );

    }


    // =========================================================
    // DASHBOARD CARDS
    // =========================================================

    const cards = [

        {
            title: "Total Scans",
            value: data.total_scans,
            icon: "♻️"
        },

        {
            title: "Today's Scan",
            value: data.today_scans,
            icon: "📅"
        },

        {
            title: "Eco Points",
            value: data.eco_points,
            icon: "🌱"
        },

        {
            title: "Badge",
            value: data.badge,
            icon: "🏆"
        }

    ];


    // =========================================================
    // DANGER LEVEL STYLE
    // =========================================================

    const getDangerStyle = (level) => {

        switch (level) {

            case "LOW":

                return {
                    bg: "bg-green-100",
                    text: "text-green-700",
                    border: "border-green-300",
                    icon: "🟢",
                    message:
                        "Low environmental impact."
                };


            case "MODERATE":

                return {
                    bg: "bg-yellow-100",
                    text: "text-yellow-700",
                    border: "border-yellow-300",
                    icon: "🟡",
                    message:
                        "Moderate environmental impact."
                };


            case "HIGH":

                return {
                    bg: "bg-orange-100",
                    text: "text-orange-700",
                    border: "border-orange-300",
                    icon: "🟠",
                    message:
                        "High environmental impact. Consider recycling."
                };


            case "CRITICAL":

                return {
                    bg: "bg-red-100",
                    text: "text-red-700",
                    border: "border-red-300",
                    icon: "🔴",
                    message:
                        "Critical impact. Proper waste treatment is recommended."
                };


            default:

                return {
                    bg: "bg-gray-100",
                    text: "text-gray-700",
                    border: "border-gray-300",
                    icon: "⚪",
                    message:
                        "Environmental impact unavailable."
                };

        }

    };


    const dangerStyle = latestScan
        ? getDangerStyle(latestScan.danger_level)
        : getDangerStyle("UNKNOWN");


    // =========================================================
    // RETURN
    // =========================================================

    return (

        <div className="p-6 bg-gray-100 min-h-screen">


            {/* =================================================
                HEADER
            ================================================= */}

            <h1 className="text-3xl font-bold mb-2">

                Welcome Back 👋

            </h1>


            <p className="text-gray-600 mb-8">

                Track your contribution towards a cleaner environment.

            </p>


            {/* =================================================
                CARDS
            ================================================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {
                    cards.map(
                        (card, index) => (

                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow p-6 flex justify-between items-center"
                            >

                                <div>

                                    <p className="text-gray-500">

                                        {card.title}

                                    </p>

                                    <h2 className="text-2xl font-bold mt-2">

                                        {card.value}

                                    </h2>

                                </div>


                                <div className="text-4xl">

                                    {card.icon}

                                </div>

                            </div>

                        )
                    )
                }

            </div>


            {/* =================================================
                ANALYTICS
            ================================================= */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">


                {/* =================================================
                    WASTE CATEGORY CHART
                ================================================= */}

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-xl font-bold mb-4">

                        Waste Category Summary

                    </h2>


                    <div className="h-72">

                        <ResponsiveContainer>

                            <PieChart>

                                <Pie
                                    data={data.category_data}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    label
                                >

                                    {
                                        data.category_data.map(
                                            (item, index) => (

                                                <Cell
                                                    key={index}
                                                />

                                            )
                                        )
                                    }

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>


                {/* =================================================
                    CO2 IMPACT + DANGER LEVEL
                ================================================= */}

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-xl font-bold mb-5">

                        🌍 Environmental Impact

                    </h2>


                    {
                        latestScan ? (

                            <div className="space-y-4">


                                {/* CO2 VALUE */}

                                <div className="bg-green-100 p-5 rounded-xl">

                                    <p className="text-gray-600">

                                        Latest Estimated CO₂e

                                    </p>


                                    <p className="text-3xl font-bold text-green-700 mt-2">

                                        {latestScan.co2_emission} kg

                                    </p>


                                    <p className="text-sm text-gray-500 mt-1">

                                        Based on latest detected waste:

                                        {" "}

                                        <b>

                                            {latestScan.waste_type}

                                        </b>

                                    </p>

                                </div>


                                {/* DANGER LEVEL */}

                                <div
                                    className={`
                                        ${dangerStyle.bg}
                                        ${dangerStyle.border}
                                        border
                                        p-5
                                        rounded-xl
                                    `}
                                >

                                    <p className="text-gray-600">

                                        CO₂ Impact Level

                                    </p>


                                    <p
                                        className={`
                                            ${dangerStyle.text}
                                            text-2xl
                                            font-bold
                                            mt-2
                                        `}
                                    >

                                        {dangerStyle.icon}

                                        {" "}

                                        {latestScan.danger_level}

                                    </p>


                                    <p className="text-sm text-gray-600 mt-2">

                                        {dangerStyle.message}

                                    </p>

                                </div>

                            </div>

                        ) : (

                            <div className="bg-gray-100 p-6 rounded-xl">

                                <p className="text-gray-600">

                                    No waste scan available yet.

                                </p>

                                <p className="text-sm text-gray-500 mt-2">

                                    Scan waste to calculate environmental impact.

                                </p>

                            </div>

                        )
                    }

                </div>

            </div>


            {/* =================================================
                ENVIRONMENTAL SAVINGS
            ================================================= */}

            <div className="bg-white rounded-2xl shadow p-6 mt-8">

                <h2 className="text-xl font-bold mb-5">

                    🌱 Your Environmental Savings

                </h2>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                    <div className="bg-green-100 p-5 rounded-xl">

                        <h3 className="text-gray-600">

                            CO₂ Saved

                        </h3>


                        <p className="text-3xl font-bold text-green-700">

                            {data.environment.co2_saved}

                        </p>

                    </div>


                    <div className="bg-blue-100 p-5 rounded-xl">

                        <h3 className="text-gray-600">

                            Trees Equivalent

                        </h3>


                        <p className="text-3xl font-bold text-blue-700">

                            {data.environment.trees_saved}

                        </p>

                    </div>

                </div>

            </div>


            {/* =================================================
                BADGE
            ================================================= */}

            <div className="bg-white rounded-2xl shadow p-6 mt-8">

                <h2 className="text-xl font-bold">

                    🏆 Achievement

                </h2>


                <p className="mt-3 text-lg">

                    Current Badge:

                    <b className="text-green-700">

                        {" "}

                        {data.badge}

                    </b>

                </p>


                <p className="text-gray-500 mt-2">

                    Next Badge:

                    {" "}

                    {data.next_badge}

                </p>

            </div>


            {/* =================================================
                RECENT SCANS
            ================================================= */}

            <div className="bg-white rounded-2xl shadow p-6 mt-8">

                <h2 className="text-xl font-bold mb-4">

                    Recent Scans

                </h2>


                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left p-3">
                                    Waste
                                </th>

                                <th className="text-left p-3">
                                    Confidence
                                </th>

                                <th className="text-left p-3">
                                    CO₂e
                                </th>

                                <th className="text-left p-3">
                                    Danger Level
                                </th>

                                <th className="text-left p-3">
                                    Date
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                data.recent_scans.map(
                                    scan => {

                                        const scanDanger =
                                            getDangerStyle(
                                                scan.danger_level
                                            );

                                        return (

                                            <tr
                                                key={scan.id}
                                                className="border-b"
                                            >

                                                {/* WASTE */}

                                                <td className="p-3">

                                                    ♻️ {scan.waste_type}

                                                </td>


                                                {/* CONFIDENCE */}

                                                <td className="p-3">

                                                    {scan.confidence_score}%

                                                </td>


                                                {/* CO2 */}

                                                <td className="p-3">

                                                    {scan.co2_emission} kg

                                                </td>


                                                {/* DANGER */}

                                                <td className="p-3">

                                                    <span
                                                        className={`
                                                            inline-flex
                                                            items-center
                                                            gap-1
                                                            px-3
                                                            py-1
                                                            rounded-full
                                                            text-sm
                                                            font-semibold
                                                            ${scanDanger.bg}
                                                            ${scanDanger.text}
                                                        `}
                                                    >

                                                        {scanDanger.icon}

                                                        {scan.danger_level}

                                                    </span>

                                                </td>


                                                {/* DATE */}

                                                <td className="p-3">

                                                    {
                                                        new Date(
                                                            scan.created_at
                                                        ).toLocaleDateString()
                                                    }

                                                </td>

                                            </tr>

                                        );

                                    }
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}


export default UserDashboard;
