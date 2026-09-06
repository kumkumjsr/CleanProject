import { useState, useEffect } from "react";

import {
    Bell,
    Search,
    UserCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import axios from "axios";


function AdminTopbar() {

    const navigate = useNavigate();


    const [search, setSearch] = useState("");

    const [results, setResults] = useState([]);

    const [notificationCount, setNotificationCount] = useState(0);


    // ==========================================
    // NOTIFICATION COUNT
    // ==========================================

    const getNotificationCount = async () => {

        try {

            const response = await axios.get(

                "http://127.0.0.1:8000/api/notifications/",

                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("access")}`,
                    },
                }

            );


            const unread = response.data.filter(

                (item) =>
                    item.is_read === false

            );


            setNotificationCount(
                unread.length
            );

        }

        catch (error) {

            console.log(
                "Notification Error:",
                error
            );

        }

    };


    // ==========================================
    // LOAD NOTIFICATIONS
    // ==========================================

    useEffect(() => {

        getNotificationCount();


        const interval = setInterval(() => {

            getNotificationCount();

        }, 10000);


        return () => {

            clearInterval(interval);

        };

    }, []);


    // ==========================================
    // SEARCH
    // ==========================================

    const searchData = async (value) => {

        setSearch(value);


        if (value.length < 2) {

            setResults([]);

            return;

        }


        try {

            const response = await axios.get(

                `http://127.0.0.1:8000/api/accounts/search/?q=${value}`,

                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("access")}`,
                    },
                }

            );


            setResults(
                response.data
            );

        }

        catch (error) {

            console.log(
                "Search Error:",
                error
            );

        }

    };


    // ==========================================
    // SEARCH RESULT CLICK
    // ==========================================

    const handleResultClick = (item) => {

        setResults([]);

        setSearch("");


        if (item.type === "USER") {

            navigate(
                `/admin/users/edit/${item.id}`
            );

        }


        if (item.type === "TASK") {

            navigate(
                `/admin/tasks/${item.id}`
            );

        }

    };


    return (

        <header
            className="
                fixed
                top-0
                left-[274px]
                right-0
                z-40
                h-20
                bg-white
                border-b
                border-gray-200
                shadow-sm
            "
        >

            <div
                className="
                    h-full
                    px-6
                    flex
                    items-center
                    justify-between
                "
            >


                {/* ================================= */}
                {/* LEFT */}
                {/* ================================= */}

                <div>

                    <h1 className="text-xl font-bold text-green-700">

                        Admin Dashboard

                    </h1>


                    <p className="text-xs text-gray-500 mt-0.5">

                        Manage EcoSmart operations

                    </p>

                </div>



                {/* ================================= */}
                {/* RIGHT */}
                {/* ================================= */}

                <div className="flex items-center gap-4">


                    {/* ================================= */}
                    {/* SEARCH */}
                    {/* ================================= */}

                    <div className="relative">

                        <Search
                            size={18}

                            className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                text-gray-400
                            "
                        />


                        <input

                            type="text"

                            value={search}

                            onChange={(e) =>
                                searchData(
                                    e.target.value
                                )
                            }

                            placeholder="
                                Search users, staff, tasks...
                            "

                            className="
                                pl-10
                                pr-4
                                py-2
                                w-64
                                border
                                border-gray-200
                                rounded-xl
                                outline-none
                                focus:border-green-500
                                focus:ring-2
                                focus:ring-green-100
                                transition
                            "

                        />


                        {/* ================================= */}
                        {/* SEARCH RESULTS */}
                        {/* ================================= */}

                        {results.length > 0 && (

                            <div
                                className="
                                    absolute
                                    top-12
                                    left-0
                                    w-full
                                    bg-white
                                    rounded-xl
                                    shadow-xl
                                    border
                                    border-gray-100
                                    overflow-hidden
                                    z-50
                                "
                            >

                                {results.map((item) => (

                                    <div
                                        key={item.id}

                                        onClick={() =>
                                            handleResultClick(
                                                item
                                            )
                                        }

                                        className="
                                            px-4
                                            py-3
                                            border-b
                                            border-gray-100
                                            hover:bg-green-50
                                            cursor-pointer
                                            transition
                                        "
                                    >

                                        <p className="
                                            font-semibold
                                            text-gray-800
                                        ">

                                            {item.title}

                                        </p>


                                        <p className="
                                            text-xs
                                            text-gray-500
                                            mt-1
                                        ">

                                            {item.type}

                                        </p>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>



                    {/* ================================= */}
                    {/* NOTIFICATION */}
                    {/* ================================= */}

                    <button

                        onClick={() =>
                            navigate(
                                "/admin/notifications"
                            )
                        }

                        className="
                            relative
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            hover:bg-green-50
                            transition
                        "
                    >

                        <Bell
                            size={22}
                            className="text-gray-600"
                        />


                        {notificationCount > 0 && (

                            <span
                                className="
                                    absolute
                                    -top-1
                                    -right-1
                                    bg-red-500
                                    text-white
                                    text-[10px]
                                    font-bold
                                    rounded-full
                                    min-w-5
                                    h-5
                                    px-1
                                    flex
                                    items-center
                                    justify-center
                                    border-2
                                    border-white
                                "
                            >

                                {notificationCount}

                            </span>

                        )}

                    </button>



                    {/* ================================= */}
                    {/* PROFILE */}
                    {/* ================================= */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            pl-3
                            border-l
                            border-gray-200
                        "
                    >

                        <div
                            className="
                                w-9
                                h-9
                                rounded-full
                                bg-green-100
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <UserCircle
                                size={25}
                                className="text-green-700"
                            />

                        </div>


                        <div>

                            <p className="
                                font-semibold
                                text-sm
                                text-gray-800
                            ">

                                Admin

                            </p>


                            <p className="
                                text-xs
                                text-gray-500
                            ">

                                EcoSmart

                            </p>

                        </div>

                    </div>


                </div>

            </div>

        </header>

    );

}


export default AdminTopbar;