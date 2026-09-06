import { useState } from "react";
import {
    Bell,
    CheckCircle2,
    Clock,
    ClipboardList,
    Trash2,
    CheckCheck,
} from "lucide-react";

import StaffLayout from "../../layouts/StaffLayout";


function Notifications() {

    const [notifications, setNotifications] = useState([

        {
            id: 1,
            type: "task",
            title: "New Cleaning Task Assigned",
            message: "A new cleaning task has been assigned to you by Admin.",
            time: "10 minutes ago",
            unread: true,
        },

        {
            id: 2,
            type: "task",
            title: "Task Reminder",
            message: "You have a pending cleaning task waiting to be started.",
            time: "1 hour ago",
            unread: true,
        },

        {
            id: 3,
            type: "completed",
            title: "Task Completed",
            message: "Your cleaning task was successfully marked as completed.",
            time: "Yesterday",
            unread: false,
        },

        {
            id: 4,
            type: "system",
            title: "Welcome to EcoSmart",
            message: "Welcome to the EcoSmart Staff Panel.",
            time: "2 days ago",
            unread: false,
        },

    ]);


    // =========================
    // MARK ONE AS READ
    // =========================

    const markAsRead = (id) => {

        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id
                    ? { ...notification, unread: false }
                    : notification
            )
        );

    };


    // =========================
    // MARK ALL AS READ
    // =========================

    const markAllAsRead = () => {

        setNotifications((prev) =>
            prev.map((notification) => ({
                ...notification,
                unread: false,
            }))
        );

    };


    // =========================
    // DELETE NOTIFICATION
    // =========================

    const deleteNotification = (id) => {

        setNotifications((prev) =>
            prev.filter(
                (notification) => notification.id !== id
            )
        );

    };


    // =========================
    // DELETE ALL
    // =========================

    const clearAll = () => {

        setNotifications([]);

    };


    // =========================
    // ICON
    // =========================

    const getIcon = (type) => {

        if (type === "completed") {

            return (
                <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">

                    <CheckCircle2
                        size={22}
                        className="text-green-600"
                    />

                </div>
            );

        }


        if (type === "task") {

            return (
                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">

                    <ClipboardList
                        size={22}
                        className="text-blue-600"
                    />

                </div>
            );

        }


        return (
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">

                <Bell
                    size={22}
                    className="text-gray-600"
                />

            </div>
        );

    };


    const unreadCount =
        notifications.filter(
            (notification) => notification.unread
        ).length;


    return (

        <StaffLayout>

            <div className="max-w-5xl mx-auto">


                {/* =========================
                    HEADER
                ========================= */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">

                                <Bell
                                    size={25}
                                    className="text-green-700"
                                />

                            </div>


                            <div>

                                <h1 className="text-3xl font-bold text-gray-800">
                                    Notifications
                                </h1>

                                <p className="text-gray-500 mt-1">
                                    Stay updated with your tasks and activities
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ACTIONS */}

                    {notifications.length > 0 && (

                        <div className="flex gap-3">

                            {unreadCount > 0 && (

                                <button
                                    onClick={markAllAsRead}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
                                >

                                    <CheckCheck size={18} />

                                    Mark All Read

                                </button>

                            )}


                            <button
                                onClick={clearAll}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition"
                            >

                                <Trash2 size={18} />

                                Clear All

                            </button>

                        </div>

                    )}

                </div>



                {/* =========================
                    SUMMARY
                ========================= */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Notifications
                                </p>

                                <p className="text-3xl font-bold text-gray-800 mt-1">
                                    {notifications.length}
                                </p>

                            </div>


                            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">

                                <Bell
                                    size={22}
                                    className="text-gray-600"
                                />

                            </div>

                        </div>

                    </div>



                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Unread
                                </p>

                                <p className="text-3xl font-bold text-green-700 mt-1">
                                    {unreadCount}
                                </p>

                            </div>


                            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">

                                <Clock
                                    size={22}
                                    className="text-green-600"
                                />

                            </div>

                        </div>

                    </div>

                </div>



                {/* =========================
                    NOTIFICATION LIST
                ========================= */}

                {notifications.length === 0 ? (

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-14 text-center">

                        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">

                            <Bell
                                size={30}
                                className="text-green-600"
                            />

                        </div>


                        <h2 className="text-xl font-bold text-gray-700 mt-5">
                            No Notifications
                        </h2>


                        <p className="text-gray-500 mt-2">
                            You're all caught up!
                        </p>

                    </div>

                ) : (

                    <div className="space-y-4">

                        {notifications.map((notification) => (

                            <div
                                key={notification.id}
                                className={`bg-white rounded-2xl border shadow-sm p-5 transition hover:shadow-md ${
                                    notification.unread
                                        ? "border-green-200 bg-green-50/30"
                                        : "border-gray-100"
                                }`}
                            >

                                <div className="flex items-start gap-4">


                                    {/* ICON */}

                                    {getIcon(notification.type)}


                                    {/* CONTENT */}

                                    <div className="flex-1 min-w-0">

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                                            <div className="flex items-center gap-2">

                                                <h3 className="font-bold text-gray-800">

                                                    {notification.title}

                                                </h3>


                                                {notification.unread && (

                                                    <span className="w-2.5 h-2.5 bg-green-600 rounded-full" />

                                                )}

                                            </div>


                                            <div className="flex items-center gap-1 text-xs text-gray-400">

                                                <Clock size={14} />

                                                {notification.time}

                                            </div>

                                        </div>


                                        <p className="text-gray-500 text-sm mt-2">

                                            {notification.message}

                                        </p>


                                        {/* ACTIONS */}

                                        <div className="flex gap-4 mt-4">

                                            {notification.unread && (

                                                <button
                                                    onClick={() =>
                                                        markAsRead(notification.id)
                                                    }
                                                    className="text-sm font-medium text-green-700 hover:text-green-800"
                                                >

                                                    Mark as read

                                                </button>

                                            )}


                                            <button
                                                onClick={() =>
                                                    deleteNotification(
                                                        notification.id
                                                    )
                                                }
                                                className="text-sm font-medium text-red-500 hover:text-red-600"
                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </StaffLayout>

    );

}


export default Notifications;
