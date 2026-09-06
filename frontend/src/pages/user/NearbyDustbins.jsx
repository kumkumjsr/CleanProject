import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function NearbyDustbins() {

    const [dustbins, setDustbins] = useState([]);

    const [loading, setLoading] = useState(true);

    const [location, setLocation] = useState(null);

    const [locationError, setLocationError] = useState(false);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");

    const [reportingId, setReportingId] = useState(null);


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {

        getUserLocation();

    }, []);


    // ==========================================
    // GET USER LOCATION
    // ==========================================

    const getUserLocation = () => {

        if (!navigator.geolocation) {

            console.log("Geolocation not supported");

            setLocationError(true);

            fetchDustbinsWithoutLocation();

            return;
        }


        setLoading(true);

        setLocationError(false);


        navigator.geolocation.getCurrentPosition(

            (position) => {

                const current = {

                    lat: position.coords.latitude,

                    lng: position.coords.longitude,

                };


                console.log("User Location:", current);


                setLocation(current);

                setLocationError(false);


                fetchDustbins(current);

            },


            (error) => {

                console.log("Location Error:", error);


                setLocationError(true);

                setLocation(null);


                // Location permission deny hone par
                // bhi dustbins load karo

                fetchDustbinsWithoutLocation();

            },


            {

                enableHighAccuracy: true,

                timeout: 10000,

                maximumAge: 0,

            }

        );

    };


    // ==========================================
    // FETCH DUSTBINS WITH LOCATION
    // ==========================================

    const fetchDustbins = async (current) => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/dustbins/"
            );


            const data = response.data.map((item) => {

                const distance = calculateDistance(

                    current.lat,

                    current.lng,

                    Number(item.latitude),

                    Number(item.longitude)

                );


                return {

                    ...item,

                    distance,

                };

            });


            // Nearest first

            data.sort(
                (a, b) => a.distance - b.distance
            );


            setDustbins(data);


        } catch (error) {

            console.log(
                "Dustbin Error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // FETCH WITHOUT USER LOCATION
    // ==========================================

    const fetchDustbinsWithoutLocation = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/dustbins/"
            );


            const data = response.data.map((item) => ({

                ...item,

                distance: null,

            }));


            setDustbins(data);


        } catch (error) {

            console.log(
                "Dustbin Error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // DISTANCE CALCULATOR
    // ==========================================

    const calculateDistance = (
        lat1,
        lon1,
        lat2,
        lon2
    ) => {

        const R = 6371;


        const dLat =
            (lat2 - lat1) * Math.PI / 180;


        const dLon =
            (lon2 - lon1) * Math.PI / 180;


        const a =

            Math.sin(dLat / 2) ** 2 +

            Math.cos(lat1 * Math.PI / 180) *

            Math.cos(lat2 * Math.PI / 180) *

            Math.sin(dLon / 2) ** 2;


        const c =

            2 *

            Math.atan2(

                Math.sqrt(a),

                Math.sqrt(1 - a)

            );


        return Number(
            (R * c).toFixed(2)
        );

    };


    // ==========================================
    // REPORT DUSTBIN FULL
    // ==========================================

    const reportDustbin = async (id) => {

        try {

            setReportingId(id);


            const token =
                localStorage.getItem("access");


            await axios.post(

                `http://127.0.0.1:8000/api/dustbins/${id}/report/`,

                {
                    status: "FULL",
                },

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`,

                    },

                }

            );


            alert(
                "Dustbin reported as full successfully ✅"
            );


            // Dustbin ko local state mein full mark karo

            setDustbins((previous) =>

                previous.map((item) =>

                    item.id === id

                        ? {
                            ...item,
                            is_full: true,
                        }

                        : item

                )

            );


        } catch (error) {

            console.log(
                "Report Error:",
                error
            );


            alert(
                error?.response?.data?.error ||
                "Report failed"
            );

        } finally {

            setReportingId(null);

        }

    };


    // ==========================================
    // FILTER DUSTBINS
    // ==========================================

    const filteredDustbins = useMemo(() => {

        return dustbins.filter((item) => {


            const itemName =
                item.name?.toLowerCase() || "";


            const itemAddress =
                item.address?.toLowerCase() || "";


            const searchText =
                search.toLowerCase();


            const searchMatch =

                itemName.includes(searchText) ||

                itemAddress.includes(searchText);


            const filterMatch =

                filter === "All" ||

                item.dustbin_type === filter;


            return (
                searchMatch &&
                filterMatch
            );

        });

    }, [
        dustbins,
        search,
        filter
    ]);


    // ==========================================
    // TYPE COLOR
    // ==========================================

    const getColor = (type) => {

        switch (type) {

            case "Organic":

                return "bg-green-100 text-green-700";


            case "Plastic":

                return "bg-blue-100 text-blue-700";


            case "Paper":

                return "bg-yellow-100 text-yellow-700";


            case "Metal":

                return "bg-gray-200 text-gray-700";


            case "E-Waste":

                return "bg-red-100 text-red-700";


            default:

                return "bg-gray-100 text-gray-700";

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="min-h-[70vh] flex items-center justify-center">

                <div className="text-center">

                    <div className="text-5xl mb-4">
                        🗑️
                    </div>

                    <p className="text-xl font-semibold text-gray-700">
                        Finding nearby dustbins...
                    </p>

                    <p className="text-gray-500 mt-2">
                        Please wait a moment
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="p-6 md:p-8">


            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">


                <div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">

                        📍 Nearby Smart Dustbins

                    </h1>


                    <p className="text-gray-500 mt-2">

                        Find the nearest recycling point around you.

                    </p>


                    {/* USER LOCATION */}

                    {location && (

                        <div className="mt-3 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm">

                            📍

                            <span>
                                Your location:
                            </span>

                            <strong>

                                {location.lat.toFixed(4)},

                                {" "}

                                {location.lng.toFixed(4)}

                            </strong>

                        </div>

                    )}


                    {/* LOCATION ERROR */}

                    {locationError && !location && (

                        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4">

                            <p className="text-yellow-800 font-medium">

                                📍 Location access is unavailable.

                            </p>


                            <p className="text-yellow-700 text-sm mt-1">

                                You can still view all dustbins.
                                Enable location to calculate distance.

                            </p>


                            <button

                                onClick={getUserLocation}

                                className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"

                            >

                                📍 Try Again

                            </button>

                        </div>

                    )}

                </div>


                {/* TOTAL DUSTBINS */}

                <div className="bg-white shadow-md rounded-2xl px-6 py-4 border">

                    <p className="text-gray-500 text-sm">
                        Available Dustbins
                    </p>

                    <p className="text-3xl font-bold text-green-700">
                        {dustbins.length}
                    </p>

                </div>


            </div>


            {/* ================================= */}
            {/* SEARCH + FILTER */}
            {/* ================================= */}

            <div className="bg-white rounded-2xl shadow-md p-5 mb-8">

                <div className="grid md:grid-cols-2 gap-4">


                    {/* SEARCH */}

                    <div className="relative">

                        <span className="absolute left-4 top-3.5 text-gray-400">
                            🔎
                        </span>


                        <input

                            type="text"

                            placeholder="Search by area or dustbin name..."

                            value={search}

                            onChange={(e) =>
                                setSearch(e.target.value)
                            }

                            className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"

                        />

                    </div>


                    {/* FILTER */}

                    <select

                        value={filter}

                        onChange={(e) =>
                            setFilter(e.target.value)
                        }

                        className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"

                    >

                        <option value="All">
                            All Types
                        </option>

                        <option value="Organic">
                            🌱 Organic
                        </option>

                        <option value="Plastic">
                            ♻️ Plastic
                        </option>

                        <option value="Paper">
                            📄 Paper
                        </option>

                        <option value="Metal">
                            🔩 Metal
                        </option>

                        <option value="E-Waste">
                            💻 E-Waste
                        </option>

                        <option value="General">
                            🗑️ General
                        </option>

                    </select>


                </div>

            </div>


            {/* ================================= */}
            {/* DUSTBIN GRID */}
            {/* ================================= */}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">


                {/* NO RESULTS */}

                {filteredDustbins.length === 0 && (

                    <div className="md:col-span-2 xl:col-span-3 bg-white rounded-2xl shadow-md p-12 text-center">

                        <div className="text-6xl mb-4">
                            🗑️
                        </div>

                        <h2 className="text-xl font-bold text-gray-700">
                            No Dustbins Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try changing your search or filter.
                        </p>

                    </div>

                )}


                {/* DUSTBIN CARDS */}

                {filteredDustbins.map((dustbin, index) => (

                    <div

                        key={dustbin.id}

                        className="bg-white rounded-2xl shadow-lg p-6 relative border border-gray-100 hover:shadow-xl transition duration-300"

                    >


                        {/* NEAREST */}

                        {location && index === 0 && (

                            <div className="absolute right-4 top-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">

                                ⭐ Nearest

                            </div>

                        )}


                        {/* TYPE */}

                        <div

                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getColor(
                                dustbin.dustbin_type
                            )}`}

                        >

                            {dustbin.dustbin_type}

                        </div>


                        {/* NAME */}

                        <h2 className="text-xl font-bold text-gray-800 mt-4">

                            🗑️ {dustbin.name}

                        </h2>


                        {/* ADDRESS */}

                        <p className="text-gray-500 mt-2 min-h-[48px]">

                            📍 {dustbin.address}

                        </p>


                        {/* DISTANCE */}

                        <div className="mt-4">

                            {dustbin.distance !== null ? (

                                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-semibold">

                                    📏

                                    {dustbin.distance} km away

                                </div>

                            ) : (

                                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm">

                                    📏 Distance unavailable

                                </div>

                            )}

                        </div>


                        {/* STATUS */}

                        <div className="mt-4">

                            {dustbin.is_full ? (

                                <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">

                                    🔴 Reported Full

                                </span>

                            ) : (

                                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">

                                    🟢 Available

                                </span>

                            )}

                        </div>


                        {/* BUTTONS */}

                        <div className="flex gap-3 mt-6">


                            {/* GOOGLE MAPS */}

                            <a

                                href={`https://www.google.com/maps?q=${dustbin.latitude},${dustbin.longitude}`}

                                target="_blank"

                                rel="noreferrer"

                                className="flex-1 bg-green-700 hover:bg-green-800 text-center text-white rounded-xl py-3 font-medium transition"

                            >

                                🗺️ Navigate

                            </a>


                            {/* REPORT */}

                            <button

                                onClick={() =>
                                    reportDustbin(dustbin.id)
                                }

                                disabled={
                                    reportingId === dustbin.id ||
                                    dustbin.is_full
                                }

                                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"

                            >

                                {reportingId === dustbin.id

                                    ? "Reporting..."

                                    : dustbin.is_full

                                        ? "✓ Reported"

                                        : "🚨 Report Full"

                                }

                            </button>


                        </div>


                    </div>

                ))}


            </div>


            {/* ================================= */}
            {/* FOOTER INFO */}
            {/* ================================= */}

            <div className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-5">

                <div className="flex gap-3">

                    <div className="text-2xl">
                        💡
                    </div>

                    <div>

                        <h3 className="font-bold text-green-800">

                            Smart Waste Tip

                        </h3>

                        <p className="text-green-700 text-sm mt-1">

                            Please report a dustbin when it is full.
                            This helps the administration team arrange
                            timely cleaning.

                        </p>

                    </div>

                </div>

            </div>


        </div>

    );

}


export default NearbyDustbins;
