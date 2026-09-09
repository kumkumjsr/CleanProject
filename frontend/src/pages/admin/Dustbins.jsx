import { useEffect, useState } from "react";
import axios from "axios";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents
} from "react-leaflet";

import L from "leaflet";

import {
    Download,
    RefreshCw,
    QrCode
} from "lucide-react";

import "leaflet/dist/leaflet.css";

// ======================================================
// FIX LEAFLET MARKER ICON
// ======================================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ======================================================
// MAP LOCATION PICKER
// ======================================================

function LocationPicker({ position, setPosition }) {
    useMapEvents({
        click(e) {
            setPosition([
                e.latlng.lat,
                e.latlng.lng
            ]);
        }
    });

    return position ? (
        <Marker position={position}>
            <Popup>
                Selected Dustbin Location
            </Popup>
        </Marker>
    ) : null;
}

// ======================================================
// MAIN COMPONENT
// ======================================================

function Dustbins() {

    // Production Django backend
    const BASEURL = "https://cleanproject-b0mh.onrender.com";

    const [dustbins, setDustbins] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [position, setPosition] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        dustbin_type: "General",
        latitude: "",
        longitude: "",
        address: "",
        is_active: true,
        is_full: false
    });

    // ==================================================
    // FETCH DUSTBINS
    // ==================================================

    const fetchDustbins = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("access");

            const response = await axios.get(
                `${BASEURL}/api/dustbins/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDustbins(response.data);

        } catch (error) {
            console.log(
                "Dustbin Fetch Error:",
                error.response?.data || error
            );

            if (error.response?.status === 401) {
                alert("Session expired. Please login again.");
            } else if (error.response?.status === 403) {
                alert("Only admin can manage dustbins.");
            } else {
                alert("Failed to load dustbins.");
            }

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDustbins();
    }, []);

    // ==================================================
    // HANDLE INPUT
    // ==================================================

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    };

    // ==================================================
    // HANDLE MAP LOCATION
    // ==================================================

    const handleMapLocation = (location) => {

        setPosition(location);

        setFormData((previous) => ({
            ...previous,

            latitude:
                location[0].toFixed(6),

            longitude:
                location[1].toFixed(6)
        }));
    };

    // ==================================================
    // CREATE DUSTBIN
    // ==================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!position) {
            alert(
                "Please select dustbin location on map 📍"
            );
            return;
        }

        setSaving(true);

        try {

            const token =
                localStorage.getItem("access");

            await axios.post(
                `${BASEURL}/api/dustbins/create/`,
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json"
                    }
                }
            );

            alert(
                "Dustbin added successfully! ✅"
            );

            setFormData({
                name: "",
                dustbin_type: "General",
                latitude: "",
                longitude: "",
                address: "",
                is_active: true,
                is_full: false
            });

            setPosition(null);

            setShowForm(false);

            await fetchDustbins();

        } catch (error) {

            console.log(
                "Create Dustbin Error:",
                error
            );

            console.log(
                "Backend:",
                error.response?.data
            );

            alert(
                error.response?.data?.detail ||
                error.response?.data?.error ||
                "Failed to add dustbin"
            );

        } finally {

            setSaving(false);

        }
    };

    // ==================================================
    // REGENERATE QR CODE
    // ==================================================

    const handleRegenerateQR = async (id) => {

        try {

            const token =
                localStorage.getItem("access");

            await axios.post(
                `${BASEURL}/api/dustbins/${id}/generate-qr/`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "QR code generated successfully! ✅"
            );

            await fetchDustbins();

        } catch (error) {

            console.log(
                "QR Generate Error:",
                error
            );

            console.log(
                "Backend:",
                error.response?.data
            );

            alert(
                error.response?.data?.detail ||
                error.response?.data?.error ||
                "Failed to generate QR code"
            );
        }
    };

    // ==================================================
    // DOWNLOAD QR CODE
    // ==================================================

    const handleDownloadQR = async (dustbin) => {

        if (!dustbin.qr_code_url) {

            alert(
                "QR code not available."
            );

            return;
        }

        try {

            const response = await fetch(
                dustbin.qr_code_url
            );

            if (!response.ok) {
                throw new Error(
                    "QR image download failed"
                );
            }

            const blob =
                await response.blob();

            const url =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                `${dustbin.bin_id}.png`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.log(
                "QR Download Error:",
                error
            );

            alert(
                "Failed to download QR code."
            );
        }
    };

    // ==================================================
    // LOADING
    // ==================================================

    if (loading) {

        return (
            <div className="p-8">

                <div className="
                    bg-white
                    rounded-2xl
                    shadow
                    p-10
                    text-center
                ">

                    <p className="
                        text-gray-500
                        text-lg
                    ">
                        Loading dustbins...
                    </p>

                </div>

            </div>
        );
    }

    // ==================================================
    // UI
    // ==================================================

    return (

        <div className="
            p-6
            md:p-8
            bg-gray-50
            min-h-screen
        ">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
                mb-8
            ">

                <div>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-800
                    ">
                        🗑️ Dustbins
                    </h1>

                    <p className="
                        text-gray-500
                        mt-1
                    ">
                        Manage dustbins, locations and QR codes
                    </p>

                </div>

                <button
                    onClick={() =>
                        setShowForm(!showForm)
                    }
                    className="
                        bg-green-700
                        hover:bg-green-800
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                        shadow-lg
                        transition
                    "
                >
                    {showForm
                        ? "✕ Close"
                        : "＋ Add Dustbin"
                    }
                </button>

            </div>

            {/* ==========================================
                ADD DUSTBIN FORM
            ========================================== */}

            {showForm && (

                <div className="
                    bg-white
                    rounded-2xl
                    shadow-xl
                    p-6
                    mb-8
                    border
                    border-green-100
                ">

                    <h2 className="
                        text-xl
                        font-bold
                        text-gray-800
                        mb-6
                    ">
                        ➕ Add New Dustbin
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="
                            grid
                            grid-cols-1
                            lg:grid-cols-2
                            gap-6
                        "
                    >

                        {/* NAME */}

                        <div>

                            <label className="
                                block
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                Dustbin Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Sakchi Main Dustbin"
                                required
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-xl
                                    px-4
                                    py-3
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-green-500
                                "
                            />

                        </div>

                        {/* TYPE */}

                        <div>

                            <label className="
                                block
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                Dustbin Type
                            </label>

                            <select
                                name="dustbin_type"
                                value={
                                    formData.dustbin_type
                                }
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-xl
                                    px-4
                                    py-3
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-green-500
                                "
                            >

                                <option value="General">
                                    General
                                </option>

                                <option value="Organic">
                                    Organic
                                </option>

                                <option value="Plastic">
                                    Plastic
                                </option>

                                <option value="Paper">
                                    Paper
                                </option>

                                <option value="Metal">
                                    Metal
                                </option>

                                <option value="E-Waste">
                                    E-Waste
                                </option>

                            </select>

                        </div>

                        {/* ADDRESS */}

                        <div className="lg:col-span-2">

                            <label className="
                                block
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter dustbin address"
                                rows="3"
                                required
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-xl
                                    px-4
                                    py-3
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-green-500
                                "
                            />

                        </div>

                        {/* MAP */}

                        <div className="lg:col-span-2">

                            <label className="
                                block
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                📍 Select Location on Map
                            </label>

                            <p className="
                                text-sm
                                text-gray-500
                                mb-3
                            ">
                                Click anywhere on the map to select
                                the exact dustbin location.
                            </p>

                            <div className="
                                rounded-2xl
                                overflow-hidden
                                border
                                border-gray-300
                                shadow
                            ">

                                <MapContainer
                                    center={[
                                        22.8046,
                                        86.2029
                                    ]}
                                    zoom={13}
                                    style={{
                                        height: "400px",
                                        width: "100%"
                                    }}
                                >

                                    <TileLayer
                                        attribution='&copy; OpenStreetMap contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    <LocationPicker
                                        position={position}
                                        setPosition={
                                            handleMapLocation
                                        }
                                    />

                                </MapContainer>

                            </div>

                        </div>

                        {/* LATITUDE */}

                        <div>

                            <label className="
                                block
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                Latitude
                            </label>

                            <input
                                type="text"
                                name="latitude"
                                value={
                                    formData.latitude
                                }
                                readOnly
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-xl
                                    px-4
                                    py-3
                                    bg-gray-100
                                    text-gray-600
                                "
                            />

                        </div>

                        {/* LONGITUDE */}

                        <div>

                            <label className="
                                block
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                Longitude
                            </label>

                            <input
                                type="text"
                                name="longitude"
                                value={
                                    formData.longitude
                                }
                                readOnly
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-xl
                                    px-4
                                    py-3
                                    bg-gray-100
                                    text-gray-600
                                "
                            />

                        </div>

                        {/* ACTIVE */}

                        <div className="
                            flex
                            items-center
                            gap-3
                        ">

                            <input
                                type="checkbox"
                                name="is_active"
                                checked={
                                    formData.is_active
                                }
                                onChange={handleChange}
                                className="
                                    w-5
                                    h-5
                                "
                            />

                            <label className="
                                font-medium
                                text-gray-700
                            ">
                                Active Dustbin
                            </label>

                        </div>

                        {/* BUTTONS */}

                        <div className="
                            lg:col-span-2
                            flex
                            gap-4
                            pt-2
                        ">

                            <button
                                type="submit"
                                disabled={saving}
                                className="
                                    bg-green-700
                                    hover:bg-green-800
                                    disabled:opacity-50
                                    text-white
                                    px-7
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    transition
                                "
                            >
                                {saving
                                    ? "Adding..."
                                    : "💾 Add Dustbin"
                                }
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setPosition(null);
                                }}
                                className="
                                    bg-gray-200
                                    hover:bg-gray-300
                                    text-gray-700
                                    px-7
                                    py-3
                                    rounded-xl
                                    font-semibold
                                "
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}

            {/* ==========================================
                DUSTBIN LIST
            ========================================== */}

            <div className="
                bg-white
                rounded-2xl
                shadow-xl
                overflow-hidden
            ">

                <div className="
                    px-6
                    py-5
                    border-b
                    flex
                    items-center
                    justify-between
                ">

                    <div>

                        <h2 className="
                            text-xl
                            font-bold
                            text-gray-800
                        ">
                            All Dustbins
                        </h2>

                        <p className="
                            text-gray-500
                            text-sm
                        ">
                            {dustbins.length} dustbins added
                        </p>

                    </div>

                </div>

                {dustbins.length === 0 ? (

                    <div className="
                        p-10
                        text-center
                        text-gray-500
                    ">
                        No dustbins found.
                    </div>

                ) : (

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-5
                        p-6
                    ">

                        {dustbins.map((dustbin) => (

                            <div
                                key={dustbin.id}
                                className="
                                    border
                                    rounded-2xl
                                    p-5
                                    hover:shadow-lg
                                    transition
                                    bg-white
                                "
                            >

                                {/* DUSTBIN HEADER */}

                                <div className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-3
                                ">

                                    <div>

                                        <h3 className="
                                            text-lg
                                            font-bold
                                            text-gray-800
                                        ">
                                            🗑️ {dustbin.name}
                                        </h3>

                                        <span className="
                                            inline-block
                                            mt-2
                                            bg-green-100
                                            text-green-700
                                            px-3
                                            py-1
                                            rounded-full
                                            text-xs
                                            font-semibold
                                        ">
                                            {dustbin.dustbin_type}
                                        </span>

                                    </div>

                                    <span
                                        className={`
                                            px-3
                                            py-1
                                            rounded-full
                                            text-xs
                                            font-semibold
                                            ${
                                                dustbin.is_full
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-green-100 text-green-700"
                                            }
                                        `}
                                    >
                                        {dustbin.is_full
                                            ? "FULL"
                                            : "AVAILABLE"
                                        }
                                    </span>

                                </div>

                                {/* ADDRESS */}

                                <p className="
                                    text-gray-600
                                    text-sm
                                    mt-4
                                ">
                                    📍 {dustbin.address}
                                </p>

                                {/* LOCATION */}

                                <div className="
                                    mt-4
                                    bg-gray-50
                                    rounded-xl
                                    p-3
                                    text-sm
                                ">

                                    <p>
                                        <b>Latitude:</b>{" "}
                                        {dustbin.latitude}
                                    </p>

                                    <p>
                                        <b>Longitude:</b>{" "}
                                        {dustbin.longitude}
                                    </p>

                                </div>

                                {/* BIN ID */}

                                <div className="
                                    mt-4
                                    bg-green-50
                                    rounded-xl
                                    p-3
                                    text-sm
                                    border
                                    border-green-100
                                ">

                                    <p className="
                                        text-gray-500
                                        text-xs
                                        mb-1
                                    ">
                                        BIN ID
                                    </p>

                                    <p className="
                                        font-bold
                                        text-green-700
                                    ">
                                        {dustbin.bin_id}
                                    </p>

                                </div>

                                {/* QR CODE */}

                                <div className="
                                    mt-5
                                    border-t
                                    pt-5
                                    text-center
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        mb-4
                                    ">

                                        <QrCode
                                            size={20}
                                            className="
                                                text-green-700
                                            "
                                        />

                                        <h4 className="
                                            font-bold
                                            text-gray-700
                                        ">
                                            Dustbin QR Code
                                        </h4>

                                    </div>

                                    {dustbin.qr_code_url ? (

                                        <img
                                            src={
                                                dustbin.qr_code_url
                                            }
                                            alt={
                                                `QR Code for ${dustbin.bin_id}`
                                            }
                                            className="
                                                w-40
                                                h-40
                                                mx-auto
                                                border
                                                rounded-xl
                                                p-2
                                                bg-white
                                            "
                                        />

                                    ) : (

                                        <div className="
                                            bg-gray-100
                                            rounded-xl
                                            p-8
                                            text-gray-500
                                            text-sm
                                        ">
                                            QR code not available
                                        </div>

                                    )}

                                    <p className="
                                        text-xs
                                        text-green-700
                                        font-semibold
                                        mt-3
                                    ">
                                        Scan to view dustbin details
                                    </p>

                                    {/* QR BUTTONS */}

                                    <div className="
                                        flex
                                        flex-col
                                        sm:flex-row
                                        gap-2
                                        mt-4
                                        justify-center
                                    ">

                                        {dustbin.qr_code_url && (

                                            <button
                                                onClick={() =>
                                                    handleDownloadQR(
                                                        dustbin
                                                    )
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    bg-green-700
                                                    hover:bg-green-800
                                                    text-white
                                                    px-4
                                                    py-2
                                                    rounded-lg
                                                    text-sm
                                                    font-semibold
                                                    transition
                                                "
                                            >

                                                <Download
                                                    size={16}
                                                />

                                                Download

                                            </button>

                                        )}

                                        <button
                                            onClick={() =>
                                                handleRegenerateQR(
                                                    dustbin.id
                                                )
                                            }
                                            className="
                                                flex
                                                items-center
                                                justify-center
                                                gap-2
                                                bg-gray-700
                                                hover:bg-gray-800
                                                text-white
                                                px-4
                                                py-2
                                                rounded-lg
                                                text-sm
                                                font-semibold
                                                transition
                                            "
                                        >

                                            <RefreshCw
                                                size={16}
                                            />

                                            Regenerate

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Dustbins;