import { NavLink, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    UserCog,
    UserPlus,
    ClipboardList,
    BarChart3,
    Bell,
    Settings,
    LogOut,
    IndianRupee,
    Trash2,
} from "lucide-react";


function AdminSidebar() {

    const navigate = useNavigate();


    // ==============================
    // LOGOUT
    // ==============================

    const handleLogout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("role");
        localStorage.removeItem("username");

        navigate("/login");

    };


    // ==============================
    // MENU
    // ==============================

    const menus = [

        {
            name: "Dashboard",
            path: "/admin",
            icon: <LayoutDashboard size={20} />,
        },

        {
            name: "Users",
            path: "/admin/users",
            icon: <Users size={20} />,
        },

        {
            name: "Staff",
            path: "/admin/staff",
            icon: <UserCog size={20} />,
        },

        {
            name: "Tasks",
            path: "/admin/tasks",
            icon: <ClipboardList size={20} />,
        },

        {
            name: "Create Task",
            path: "/admin/tasks/create",
            icon: <ClipboardList size={20} />,
        },

        {
            name: "Reports",
            path: "/admin/reports",
            icon: <BarChart3 size={20} />,
        },

        {
            name: "Create Staff",
            path: "/admin/staff/create",
            icon: <UserPlus size={20} />,
        },

        {
            name: "Salary",
            path: "/admin/salary",
            icon: <IndianRupee size={20} />,
        },

        {
            name: "Notifications",
            path: "/admin/notifications",
            icon: <Bell size={20} />,
        },

        {
            name: "Reported Dustbins",
            path: "/admin/reported-dustbins",
            icon: <Trash2 size={20} />,
        },

        {
            name: "Complaints",
            path: "/admin/complaints",
            icon: <ClipboardList size={20} />,
        },

        {
            name: "Dustbins",
            path: "/admin/dustbins",
            icon: <Trash2 size={20} />,
        },

        {
            name: "Settings",
            path: "/admin/settings",
            icon: <Settings size={20} />,
        },

    ];


    return (

        <aside
            className="
                fixed
                left-0
                top-0
                z-50
                w-[274px]
                h-screen
                bg-green-700
                text-white
                flex
                flex-col
                shadow-2xl
            "
        >

            {/* LOGO */}

            <div className="px-5 py-5 border-b border-green-600">

                <h1 className="text-2xl font-bold">
                    🌱 EcoSmart
                </h1>

                <p className="text-green-200 text-sm mt-1">
                    Admin Panel
                </p>

            </div>


            {/* MENU */}

            <nav
                className="
                    flex-1
                    overflow-y-auto
                    py-4
                    scrollbar-hide
                "
            >

                {menus.map((item) => (

                    <NavLink
                        key={item.path}
                        to={item.path}

                        className={({ isActive }) =>

                            `
                            flex
                            items-center
                            gap-3
                            mx-3
                            mb-1
                            px-4
                            py-2.5
                            rounded-xl
                            transition-all
                            duration-200
                            ${
                                isActive
                                    ? "bg-green-900 shadow-lg"
                                    : "hover:bg-green-600"
                            }
                            `
                        }
                    >

                        {item.icon}

                        <span className="text-sm font-medium">
                            {item.name}
                        </span>

                    </NavLink>

                ))}

            </nav>


            {/* LOGOUT */}

            <div className="border-t border-green-600 p-3">

                <button
                    onClick={handleLogout}

                    className="
                        flex
                        items-center
                        gap-3
                        w-full
                        px-4
                        py-2.5
                        rounded-xl
                        hover:bg-red-600
                        transition
                    "
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


export default AdminSidebar;    