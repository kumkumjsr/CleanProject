import { useState } from "react";
import {
    Bell,
    Search,
    Sun,
    Moon,
    User,
    ChevronDown
} from "lucide-react";

function Topbar() {

    const [darkMode, setDarkMode] = useState(false);

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const username = localStorage.getItem("username") || "User";

    return (

        <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">

            {/* Left */}

            <div>

                <h1 className="text-2xl font-bold text-gray-800">
                    User Dashboard
                </h1>

                <p className="text-sm text-gray-500">
                    {today}
                </p>

            </div>

            {/* Search */}

            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-96">

                <Search size={18} className="text-gray-500" />

                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none ml-2 w-full"
                />

            </div>

            {/* Right */}

            <div className="flex items-center gap-5">

                {/* Dark Mode */}

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="hover:text-green-700"
                >
                    {
                        darkMode
                            ? <Sun size={22} />
                            : <Moon size={22} />
                    }

                </button>

                {/* Notification */}

                <div className="relative cursor-pointer">

                    <Bell size={22} />

                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                        3
                    </span>

                </div>

                {/* Profile */}

                <div className="flex items-center gap-3 cursor-pointer">

                    <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center">

                        <User size={20} />

                    </div>

                    <div className="hidden md:block">

                        <h4 className="font-semibold">
                            {username}
                        </h4>

                        <p className="text-xs text-gray-500">
                            Eco User
                        </p>

                    </div>

                    <ChevronDown size={18} />

                </div>

            </div>

        </header>

    );

}

export default Topbar;