import { NavLink, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    ClipboardList,
    Wallet,
    Bell,
    Settings,
    LogOut,
    Leaf,
    User,
} from "lucide-react";


function StaffSidebar() {

    const navigate = useNavigate();


    const menuItems = [

        {
            name: "Dashboard",
            path: "/staff/dashboard",
            icon: LayoutDashboard,
        },

        {
            name: "My Tasks",
            path: "/staff/tasks",
            icon: ClipboardList,
        },

        {
            name: "Salary",
            path: "/staff/salary",
            icon: Wallet,
        },

        {
            name: "Notifications",
            path: "/staff/notifications",
            icon: Bell,
        },

        {
            name: "My Profile",
            path: "/staff/profile",
            icon: User,
        },

        {
            name: "Settings",
            path: "/staff/settings",
            icon: Settings,
        },

    ];


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

        <aside className="fixed left-0 top-0 h-screen w-72 bg-green-700 text-white flex flex-col shadow-2xl z-40">


            {/* ================================= */}
            {/* LOGO */}
            {/* ================================= */}

            <div className="p-6 border-b border-green-600">


                <div className="flex items-center gap-3">


                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-md">

                        <Leaf
                            size={25}
                            className="text-green-700"
                        />

                    </div>


                    <div>

                        <h1 className="text-2xl font-bold">

                            EcoSmart

                        </h1>


                        <p className="text-green-200 text-sm">

                            Staff Panel

                        </p>

                    </div>


                </div>


            </div>


            {/* ================================= */}
            {/* MENU */}
            {/* ================================= */}

            <nav className="flex-1 overflow-y-auto py-5 px-3">


                {menuItems.map((item) => {


                    const Icon = item.icon;


                    return (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({ isActive }) =>

                                `flex items-center gap-3 mx-2 mb-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                                    
                                    isActive

                                    ?

                                    "bg-green-900 text-white shadow-lg"

                                    :

                                    "text-green-50 hover:bg-green-600 hover:text-white"

                                }`

                            }

                        >


                            <Icon size={20} />


                            <span className="font-medium">

                                {item.name}

                            </span>


                        </NavLink>

                    );

                })}


            </nav>


            {/* ================================= */}
            {/* STAFF PROFILE */}
            {/* ================================= */}

            <div className="px-4 pb-4">


                <div

                    onClick={() =>
                        navigate("/staff/profile")
                    }

                    className="bg-green-600 rounded-2xl p-4 cursor-pointer hover:bg-green-500 transition border border-green-500"

                >


                    <div className="flex items-center gap-3">


                        {/* AVATAR */}

                        <div className="w-11 h-11 rounded-full bg-white text-green-700 flex items-center justify-center font-bold text-lg shadow">


                            {(
                                localStorage.getItem("username") ||
                                "S"
                            )
                                .charAt(0)
                                .toUpperCase()}


                        </div>


                        {/* INFO */}

                        <div className="min-w-0">


                            <p className="font-semibold text-white truncate">


                                {
                                    localStorage.getItem("username") ||
                                    "Staff"
                                }


                            </p>


                            <p className="text-xs text-green-200">

                                Cleaning Staff

                            </p>


                        </div>


                    </div>


                </div>


            </div>


            {/* ================================= */}
            {/* LOGOUT */}
            {/* ================================= */}

            <div className="border-t border-green-600 p-4">


                <button

                    onClick={handleLogout}

                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-red-600 transition-all duration-200"

                >


                    <LogOut size={20} />


                    <span className="font-medium">

                        Logout

                    </span>


                </button>


            </div>


        </aside>

    );

}


export default StaffSidebar;
