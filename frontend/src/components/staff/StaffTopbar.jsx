import { useEffect, useState } from "react";

import {
    Bell,
    UserCircle,
    ChevronDown,
    LayoutDashboard,
    Wallet,
    User,
    Settings,
    LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


function StaffTopbar() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("Staff");
    const [showMenu, setShowMenu] = useState(false);


    // ==========================================
    // GET USERNAME
    // ==========================================

    useEffect(() => {

        const storedUsername =
            localStorage.getItem("username");

        if (storedUsername) {
            setUsername(storedUsername);
        }

    }, []);


    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("role");
        localStorage.removeItem("username");

        navigate("/login");

    };


    return (

        <header className="
            fixed
            top-0
            left-72
            right-0
            h-20
            bg-white
            border-b
            border-gray-200
            shadow-sm
            z-40
        ">


            <div className="
                h-full
                px-8
                flex
                items-center
                justify-between
            ">


                {/* ================================= */}
                {/* LEFT SIDE */}
                {/* ================================= */}

                <div className="flex items-center gap-4">


                    {/* GREEN ICON */}

                    <div className="
                        w-11
                        h-11
                        rounded-xl
                        bg-green-100
                        flex
                        items-center
                        justify-center
                    ">

                        <LayoutDashboard
                            size={22}
                            className="text-green-700"
                        />

                    </div>


                    {/* TITLE */}

                    <div>

                        <h2 className="
                            text-xl
                            font-bold
                            text-gray-800
                        ">

                            Staff Workspace

                        </h2>


                        <p className="
                            text-sm
                            text-gray-500
                            mt-0.5
                        ">

                            Manage your cleaning tasks

                        </p>

                    </div>


                </div>


                {/* ================================= */}
                {/* RIGHT SIDE */}
                {/* ================================= */}

                <div className="
                    flex
                    items-center
                    gap-3
                ">


                    {/* ================================= */}
                    {/* NOTIFICATION */}
                    {/* ================================= */}

                    <button

                        onClick={() =>
                            navigate("/staff/notifications")
                        }

                        className="
                            relative
                            w-11
                            h-11
                            rounded-xl
                            bg-green-50
                            hover:bg-green-100
                            flex
                            items-center
                            justify-center
                            transition
                        "

                    >

                        <Bell
                            size={21}
                            className="text-green-700"
                        />


                        {/* NOTIFICATION DOT */}

                        <span className="
                            absolute
                            top-2
                            right-2
                            w-2.5
                            h-2.5
                            bg-red-500
                            rounded-full
                            border-2
                            border-white
                        "/>


                    </button>


                    {/* ================================= */}
                    {/* PROFILE DROPDOWN */}
                    {/* ================================= */}

                    <div className="relative">


                        <button

                            onClick={() =>
                                setShowMenu(!showMenu)
                            }

                            className="
                                flex
                                items-center
                                gap-3
                                px-3
                                py-2
                                rounded-xl
                                hover:bg-green-50
                                transition
                            "

                        >


                            {/* AVATAR */}

                            <div className="
                                w-10
                                h-10
                                rounded-full
                                bg-green-700
                                text-white
                                flex
                                items-center
                                justify-center
                                font-bold
                                shadow-sm
                            ">

                                {username
                                    .charAt(0)
                                    .toUpperCase()
                                }

                            </div>


                            {/* USER INFO */}

                            <div className="
                                text-left
                                hidden
                                sm:block
                            ">

                                <p className="
                                    font-semibold
                                    text-gray-800
                                    text-sm
                                ">

                                    {username}

                                </p>


                                <p className="
                                    text-xs
                                    text-green-600
                                ">

                                    Cleaning Staff

                                </p>

                            </div>


                            {/* ARROW */}

                            <ChevronDown

                                size={17}

                                className={`
                                    text-gray-500
                                    transition-transform
                                    ${
                                        showMenu
                                            ? "rotate-180"
                                            : ""
                                    }
                                `}

                            />


                        </button>


                        {/* ================================= */}
                        {/* DROPDOWN */}
                        {/* ================================= */}

                        {showMenu && (

                            <div className="
                                absolute
                                right-0
                                top-14
                                w-60
                                bg-white
                                rounded-2xl
                                shadow-2xl
                                border
                                border-gray-100
                                py-2
                                overflow-hidden
                            ">


                                {/* HEADER */}

                                <div className="
                                    px-4
                                    py-3
                                    bg-green-50
                                    border-b
                                    border-green-100
                                ">

                                    <p className="
                                        font-semibold
                                        text-gray-800
                                    ">

                                        {username}

                                    </p>

                                    <p className="
                                        text-xs
                                        text-green-600
                                        mt-0.5
                                    ">

                                        Cleaning Staff

                                    </p>

                                </div>


                                {/* DASHBOARD */}

                                <button

                                    onClick={() => {

                                        setShowMenu(false);

                                        navigate(
                                            "/staff/dashboard"
                                        );

                                    }}

                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        text-left
                                        px-4
                                        py-3
                                        hover:bg-green-50
                                        text-gray-700
                                        transition
                                    "

                                >

                                    <LayoutDashboard
                                        size={18}
                                        className="text-green-700"
                                    />

                                    Dashboard

                                </button>


                                {/* SALARY */}

                                <button

                                    onClick={() => {

                                        setShowMenu(false);

                                        navigate(
                                            "/staff/salary"
                                        );

                                    }}

                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        text-left
                                        px-4
                                        py-3
                                        hover:bg-green-50
                                        text-gray-700
                                        transition
                                    "

                                >

                                    <Wallet
                                        size={18}
                                        className="text-green-700"
                                    />

                                    My Salary

                                </button>


                                {/* PROFILE */}

                                <button

                                    onClick={() => {

                                        setShowMenu(false);

                                        navigate(
                                            "/staff/profile"
                                        );

                                    }}

                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        text-left
                                        px-4
                                        py-3
                                        hover:bg-green-50
                                        text-gray-700
                                        transition
                                    "

                                >

                                    <User
                                        size={18}
                                        className="text-green-700"
                                    />

                                    My Profile

                                </button>


                                {/* SETTINGS */}

                                <button

                                    onClick={() => {

                                        setShowMenu(false);

                                        navigate(
                                            "/staff/settings"
                                        );

                                    }}

                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        text-left
                                        px-4
                                        py-3
                                        hover:bg-green-50
                                        text-gray-700
                                        transition
                                    "

                                >

                                    <Settings
                                        size={18}
                                        className="text-green-700"
                                    />

                                    Settings

                                </button>


                                {/* DIVIDER */}

                                <div className="
                                    border-t
                                    border-gray-100
                                    my-1
                                "/>


                                {/* LOGOUT */}

                                <button

                                    onClick={handleLogout}

                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        text-left
                                        px-4
                                        py-3
                                        hover:bg-red-50
                                        text-red-600
                                        transition
                                    "

                                >

                                    <LogOut size={18} />

                                    Logout

                                </button>


                            </div>

                        )}

                    </div>


                </div>


            </div>

        </header>

    );

}


export default StaffTopbar;

