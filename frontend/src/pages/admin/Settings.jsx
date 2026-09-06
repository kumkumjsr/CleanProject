import { useEffect, useState } from "react";
import axios from "axios";
import {
    Bell,
    Mail,
    ClipboardList,
    Settings as SettingsIcon,
    Moon,
    Sun,
    Save,
    Loader2,
} from "lucide-react";

function Settings() {

    const [settings, setSettings] = useState({
        email_notifications: true,
        task_notifications: true,
        system_notifications: true,
        dark_mode: false,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const token = localStorage.getItem("access");

    const headers = {
        Authorization: `Bearer ${token}`,
    };


    // ==========================================
    // APPLY DARK MODE
    // ==========================================

    const applyDarkMode = (enabled) => {

        if (enabled) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

    };


    // ==========================================
    // LOAD SETTINGS
    // ==========================================

    const loadSettings = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/accounts/settings/",
                {
                    headers,
                }
            );

            const data = response.data;

            const loadedSettings = {
                email_notifications:
                    data.email_notifications ?? true,

                task_notifications:
                    data.task_notifications ?? true,

                system_notifications:
                    data.system_notifications ?? true,

                dark_mode:
                    data.dark_mode ?? false,
            };

            setSettings(loadedSettings);

            // Apply saved theme
            applyDarkMode(
                loadedSettings.dark_mode
            );

        } catch (err) {

            console.log(
                "Settings loading error:",
                err
            );

            setError(
                "Unable to load settings."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadSettings();

    }, []);


    // ==========================================
    // TOGGLE
    // ==========================================

    const handleToggle = (name) => {

        setSettings((previous) => {

            const updatedSettings = {
                ...previous,
                [name]: !previous[name],
            };


            // Apply dark mode immediately
            if (name === "dark_mode") {

                applyDarkMode(
                    updatedSettings.dark_mode
                );

            }

            return updatedSettings;

        });

    };


    // ==========================================
    // SAVE SETTINGS
    // ==========================================

    const saveSettings = async () => {

        setSaving(true);
        setMessage("");
        setError("");

        try {

            const response = await axios.put(
                "http://127.0.0.1:8000/api/accounts/settings/",
                settings,
                {
                    headers,
                }
            );

            console.log(
                "Settings saved:",
                response.data
            );


            // Make sure dark mode remains applied
            applyDarkMode(
                settings.dark_mode
            );


            setMessage(
                "Settings saved successfully!"
            );


        } catch (err) {

            console.log(
                "Settings save error:",
                err
            );

            console.log(
                "Status:",
                err.response?.status
            );

            console.log(
                "Data:",
                err.response?.data
            );

            setError(
                "Failed to save settings."
            );

        } finally {

            setSaving(false);


            setTimeout(() => {

                setMessage("");
                setError("");

            }, 3000);

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div
                className="
                    min-h-screen
                    bg-gray-100
                    dark:bg-gray-900
                    flex
                    items-center
                    justify-center
                    transition-colors
                    duration-300
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        text-gray-700
                        dark:text-gray-200
                    "
                >

                    <Loader2
                        size={25}
                        className="animate-spin"
                    />

                    <span>
                        Loading Settings...
                    </span>

                </div>

            </div>

        );

    }


    return (

        <div
            className="
                min-h-screen
                bg-gray-100
                dark:bg-gray-900
                p-6
                transition-colors
                duration-300
            "
        >


            {/* =====================================
                HEADER
            ====================================== */}

            <div className="mb-8">

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    <div
                        className="
                            w-12
                            h-12
                            rounded-xl
                            bg-green-100
                            dark:bg-green-900/40
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <SettingsIcon
                            size={26}
                            className="
                                text-green-700
                                dark:text-green-400
                            "
                        />

                    </div>


                    <div>

                        <h1
                            className="
                                text-3xl
                                font-bold
                                text-gray-900
                                dark:text-white
                            "
                        >
                            Admin Settings
                        </h1>

                        <p
                            className="
                                text-gray-500
                                dark:text-gray-400
                                mt-1
                            "
                        >
                            Manage your EcoSmart preferences
                        </p>

                    </div>

                </div>

            </div>



            {/* =====================================
                SUCCESS MESSAGE
            ====================================== */}

            {message && (

                <div
                    className="
                        mb-6
                        px-5
                        py-3
                        rounded-xl
                        border
                        bg-green-100
                        dark:bg-green-900/40
                        border-green-300
                        dark:border-green-700
                        text-green-800
                        dark:text-green-300
                    "
                >
                    {message}
                </div>

            )}



            {/* =====================================
                ERROR MESSAGE
            ====================================== */}

            {error && (

                <div
                    className="
                        mb-6
                        px-5
                        py-3
                        rounded-xl
                        border
                        bg-red-100
                        dark:bg-red-900/40
                        border-red-300
                        dark:border-red-700
                        text-red-800
                        dark:text-red-300
                    "
                >
                    {error}
                </div>

            )}



            {/* =====================================
                MAIN SETTINGS CARD
            ====================================== */}

            <div
                className="
                    max-w-4xl
                    bg-white
                    dark:bg-gray-800
                    rounded-2xl
                    shadow-lg
                    overflow-hidden
                    transition-colors
                    duration-300
                "
            >


                {/* =================================
                    NOTIFICATIONS
                ================================== */}

                <div
                    className="
                        p-6
                        border-b
                        border-gray-200
                        dark:border-gray-700
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            mb-5
                        "
                    >

                        <Bell
                            size={24}
                            className="
                                text-green-600
                                dark:text-green-400
                            "
                        />

                        <div>

                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    text-gray-900
                                    dark:text-white
                                "
                            >
                                Notifications
                            </h2>

                            <p
                                className="
                                    text-sm
                                    text-gray-500
                                    dark:text-gray-400
                                "
                            >
                                Manage notification preferences
                            </p>

                        </div>

                    </div>



                    {/* EMAIL */}

                    <SettingRow
                        icon={<Mail size={21} />}
                        title="Email Notifications"
                        description="Receive important updates through email"
                        enabled={
                            settings.email_notifications
                        }
                        onToggle={() =>
                            handleToggle(
                                "email_notifications"
                            )
                        }
                    />



                    {/* TASK */}

                    <SettingRow
                        icon={
                            <ClipboardList size={21} />
                        }
                        title="Task Notifications"
                        description="Get notified when tasks are assigned or updated"
                        enabled={
                            settings.task_notifications
                        }
                        onToggle={() =>
                            handleToggle(
                                "task_notifications"
                            )
                        }
                    />



                    {/* SYSTEM */}

                    <SettingRow
                        icon={<Bell size={21} />}
                        title="System Notifications"
                        description="Receive important EcoSmart system notifications"
                        enabled={
                            settings.system_notifications
                        }
                        onToggle={() =>
                            handleToggle(
                                "system_notifications"
                            )
                        }
                    />

                </div>



                {/* =================================
                    APPEARANCE
                ================================== */}

                <div
                    className="
                        p-6
                        border-b
                        border-gray-200
                        dark:border-gray-700
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            mb-5
                        "
                    >

                        {settings.dark_mode ? (

                            <Moon
                                size={24}
                                className="
                                    text-purple-600
                                    dark:text-purple-400
                                "
                            />

                        ) : (

                            <Sun
                                size={24}
                                className="
                                    text-yellow-500
                                "
                            />

                        )}


                        <div>

                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    text-gray-900
                                    dark:text-white
                                "
                            >
                                Appearance
                            </h2>

                            <p
                                className="
                                    text-sm
                                    text-gray-500
                                    dark:text-gray-400
                                "
                            >
                                Customize Admin Panel appearance
                            </p>

                        </div>

                    </div>



                    {/* DARK MODE */}

                    <SettingRow
                        icon={
                            settings.dark_mode
                                ? <Moon size={21} />
                                : <Sun size={21} />
                        }
                        title="Dark Mode"
                        description={
                            settings.dark_mode
                                ? "Dark theme is enabled"
                                : "Use light theme"
                        }
                        enabled={
                            settings.dark_mode
                        }
                        onToggle={() =>
                            handleToggle(
                                "dark_mode"
                            )
                        }
                    />

                </div>



                {/* =================================
                    SAVE
                ================================== */}

                <div
                    className="
                        p-6
                        flex
                        items-center
                        justify-between
                        gap-4
                    "
                >

                    <p
                        className="
                            text-sm
                            text-gray-500
                            dark:text-gray-400
                        "
                    >
                        Save your EcoSmart preferences.
                    </p>


                    <button
                        onClick={saveSettings}
                        disabled={saving}
                        className="
                            flex
                            items-center
                            gap-2
                            bg-green-600
                            hover:bg-green-700
                            disabled:bg-green-400
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            font-semibold
                            transition
                        "
                    >

                        {saving ? (

                            <Loader2
                                size={20}
                                className="animate-spin"
                            />

                        ) : (

                            <Save size={20} />

                        )}

                        {saving
                            ? "Saving..."
                            : "Save Settings"
                        }

                    </button>

                </div>

            </div>

        </div>

    );

}


// ==========================================
// SETTING ROW
// ==========================================

function SettingRow({
    icon,
    title,
    description,
    enabled,
    onToggle,
}) {

    return (

        <div
            className="
                flex
                items-center
                justify-between
                gap-4
                py-4
                border-b
                last:border-b-0
                border-gray-100
                dark:border-gray-700
            "
        >

            <div
                className="
                    flex
                    items-center
                    gap-4
                "
            >

                <div
                    className="
                        w-10
                        h-10
                        rounded-lg
                        bg-gray-100
                        dark:bg-gray-700
                        flex
                        items-center
                        justify-center
                        text-gray-600
                        dark:text-gray-300
                    "
                >

                    {icon}

                </div>


                <div>

                    <h3
                        className="
                            font-semibold
                            text-gray-900
                            dark:text-white
                        "
                    >
                        {title}
                    </h3>

                    <p
                        className="
                            text-sm
                            text-gray-500
                            dark:text-gray-400
                            mt-1
                        "
                    >
                        {description}
                    </p>

                </div>

            </div>



            {/* TOGGLE BUTTON */}

            <button
                type="button"
                onClick={onToggle}
                aria-label={`Toggle ${title}`}
                className={`
                    relative
                    w-14
                    h-7
                    rounded-full
                    flex-shrink-0
                    transition-colors
                    duration-300
                    ${
                        enabled
                            ? "bg-green-600"
                            : "bg-gray-300 dark:bg-gray-600"
                    }
                `}
            >

                <span
                    className={`
                        absolute
                        top-1
                        left-0
                        w-5
                        h-5
                        bg-white
                        rounded-full
                        shadow
                        transition-transform
                        duration-300
                        ${
                            enabled
                                ? "translate-x-8"
                                : "translate-x-1"
                        }
                    `}
                />

            </button>

        </div>

    );

}


export default Settings;