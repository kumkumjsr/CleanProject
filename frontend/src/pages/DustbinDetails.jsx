// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function DustbinDetails() {
//     const { binId } = useParams();

//     const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

//     const [dustbin, setDustbin] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     // Report button loading
//     const [reporting, setReporting] = useState(false);

//     useEffect(() => {
//         const fetchDustbin = async () => {
//             try {
//                 setLoading(true);
//                 setError("");

//                 const response = await axios.get(
//                     `${BASEURL}/api/dustbins/qr/${binId}/`
//                 );

//                 setDustbin(response.data);

//             } catch (err) {
//                 console.error("Dustbin fetch error:", err);

//                 if (err.response?.status === 404) {
//                     setError("Dustbin not found.");
//                 } else {
//                     setError("Unable to load dustbin details.");
//                 }

//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (binId) {
//             fetchDustbin();
//         }
//     }, [binId, BASEURL]);


//     // REPORT DUSTBIN AS FULL
//     const handleReportFull = async () => {

//         if (!dustbin) {
//             return;
//         }

//         try {

//             setReporting(true);

//             const response = await axios.post(
//                 `${BASEURL}/api/dustbins/${dustbin.id}/report/`
//             );

//             alert(
//                 response.data?.message ||
//                 "Dustbin reported as full successfully."
//             );

//             // Update UI immediately
//             setDustbin((prev) => ({
//                 ...prev,
//                 is_full: true,
//                 status: "FULL",
//                 priority_level: "HIGH",
//                 priority_score: 100,
//             }));

//         } catch (err) {

//             console.error(
//                 "Report dustbin error:",
//                 err.response?.data || err
//             );

//             alert(
//                 err.response?.data?.error ||
//                 err.response?.data?.detail ||
//                 "Unable to report dustbin."
//             );

//         } finally {

//             setReporting(false);

//         }
//     };


//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-green-50">

//                 <div className="text-center">

//                     <div className="text-4xl mb-3">
//                         ♻️
//                     </div>

//                     <p className="text-gray-600">
//                         Loading dustbin details...
//                     </p>

//                 </div>

//             </div>
//         );
//     }


//     if (error) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">

//                 <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">

//                     <div className="text-5xl mb-4">
//                         ❌
//                     </div>

//                     <h1 className="text-2xl font-bold text-red-600 mb-2">
//                         Dustbin Not Found
//                     </h1>

//                     <p className="text-gray-600">
//                         {error}
//                     </p>

//                     <p className="text-sm text-gray-400 mt-4">
//                         BIN ID: {binId}
//                     </p>

//                 </div>

//             </div>
//         );
//     }


//     return (
//         <div className="min-h-screen bg-green-50 py-10 px-4">

//             <div className="max-w-3xl mx-auto">

//                 {/* HEADER */}

//                 <div className="text-center mb-8">

//                     <div className="text-5xl mb-3">
//                         ♻️
//                     </div>

//                     <h1 className="text-3xl font-bold text-green-700">
//                         EcoSmart Dustbin
//                     </h1>

//                     <p className="text-gray-500 mt-2">
//                         Smart Dustbin Information
//                     </p>

//                 </div>


//                 {/* MAIN CARD */}

//                 <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

//                     {/* STATUS */}

//                     <div
//                         className={`p-6 text-center ${
//                             dustbin.status === "FULL"
//                                 ? "bg-red-100"
//                                 : "bg-green-100"
//                         }`}
//                     >

//                         <div className="text-4xl mb-2">
//                             {dustbin.status === "FULL"
//                                 ? "🔴"
//                                 : "🟢"}
//                         </div>

//                         <h2
//                             className={`text-xl font-bold ${
//                                 dustbin.status === "FULL"
//                                     ? "text-red-700"
//                                     : "text-green-700"
//                             }`}
//                         >
//                             {dustbin.status === "FULL"
//                                 ? "Dustbin is FULL"
//                                 : "Dustbin is AVAILABLE"}
//                         </h2>

//                     </div>


//                     {/* DETAILS */}

//                     <div className="p-6 md:p-8">

//                         <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                             {dustbin.name}
//                         </h2>


//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                             {/* BIN ID */}

//                             <div className="bg-gray-50 rounded-xl p-4">

//                                 <p className="text-sm text-gray-500">
//                                     BIN ID
//                                 </p>

//                                 <p className="font-bold text-green-700 mt-1">
//                                     {dustbin.bin_id}
//                                 </p>

//                             </div>


//                             {/* TYPE */}

//                             <div className="bg-gray-50 rounded-xl p-4">

//                                 <p className="text-sm text-gray-500">
//                                     Waste Type
//                                 </p>

//                                 <p className="font-semibold text-gray-800 mt-1">
//                                     {dustbin.dustbin_type}
//                                 </p>

//                             </div>


//                             {/* ADDRESS */}

//                             <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">

//                                 <p className="text-sm text-gray-500">
//                                     Address
//                                 </p>

//                                 <p className="font-semibold text-gray-800 mt-1">
//                                     📍 {dustbin.address}
//                                 </p>

//                             </div>


//                             {/* LATITUDE */}

//                             <div className="bg-gray-50 rounded-xl p-4">

//                                 <p className="text-sm text-gray-500">
//                                     Latitude
//                                 </p>

//                                 <p className="font-semibold text-gray-800 mt-1">
//                                     {dustbin.latitude}
//                                 </p>

//                             </div>


//                             {/* LONGITUDE */}

//                             <div className="bg-gray-50 rounded-xl p-4">

//                                 <p className="text-sm text-gray-500">
//                                     Longitude
//                                 </p>

//                                 <p className="font-semibold text-gray-800 mt-1">
//                                     {dustbin.longitude}
//                                 </p>

//                             </div>


//                             {/* PRIORITY */}

//                             <div className="bg-gray-50 rounded-xl p-4">

//                                 <p className="text-sm text-gray-500">
//                                     Priority Level
//                                 </p>

//                                 <p
//                                     className={`font-bold mt-1 ${
//                                         dustbin.priority_level === "HIGH"
//                                             ? "text-red-600"
//                                             : "text-gray-800"
//                                     }`}
//                                 >
//                                     {dustbin.priority_level}
//                                 </p>

//                             </div>


//                             {/* PRIORITY SCORE */}

//                             <div className="bg-gray-50 rounded-xl p-4">

//                                 <p className="text-sm text-gray-500">
//                                     Priority Score
//                                 </p>

//                                 <p
//                                     className={`font-bold mt-1 ${
//                                         dustbin.priority_score >= 100
//                                             ? "text-red-600"
//                                             : "text-gray-800"
//                                     }`}
//                                 >
//                                     {dustbin.priority_score}
//                                 </p>

//                             </div>

//                         </div>


//                         {/* REPORT FULL BUTTON */}

//                         {dustbin.status !== "FULL" ? (

//                             <div className="mt-8 border-t pt-8">

//                                 <div className="
//                                     bg-yellow-50
//                                     border
//                                     border-yellow-200
//                                     rounded-2xl
//                                     p-5
//                                     text-center
//                                 ">

//                                     <div className="text-3xl mb-2">
//                                         🚨
//                                     </div>

//                                     <h3 className="text-lg font-bold text-gray-800">
//                                         Dustbin is Full?
//                                     </h3>

//                                     <p className="text-sm text-gray-600 mt-2 mb-4">
//                                         If this dustbin is full, report it
//                                         to EcoSmart for quick collection.
//                                     </p>

//                                     <button
//                                         onClick={handleReportFull}
//                                         disabled={reporting}
//                                         className="
//                                             w-full
//                                             md:w-auto
//                                             px-8
//                                             py-3
//                                             bg-red-600
//                                             hover:bg-red-700
//                                             disabled:bg-red-300
//                                             disabled:cursor-not-allowed
//                                             text-white
//                                             rounded-xl
//                                             font-bold
//                                             transition
//                                         "
//                                     >
//                                         {reporting
//                                             ? "Reporting..."
//                                             : "🚨 Report as FULL"}
//                                     </button>

//                                 </div>

//                             </div>

//                         ) : (

//                             <div className="mt-8 border-t pt-8">

//                                 <div className="
//                                     bg-red-50
//                                     border
//                                     border-red-200
//                                     rounded-2xl
//                                     p-5
//                                     text-center
//                                 ">

//                                     <div className="text-3xl mb-2">
//                                         ✅
//                                     </div>

//                                     <h3 className="text-lg font-bold text-red-700">
//                                         Full Dustbin Reported
//                                     </h3>

//                                     <p className="text-sm text-gray-600 mt-2">
//                                         This dustbin has been marked as FULL.
//                                         Collection has been prioritized.
//                                     </p>

//                                     <div className="
//                                         mt-4
//                                         inline-block
//                                         bg-red-600
//                                         text-white
//                                         px-4
//                                         py-2
//                                         rounded-full
//                                         text-sm
//                                         font-bold
//                                     ">
//                                         HIGH PRIORITY
//                                     </div>

//                                 </div>

//                             </div>

//                         )}


//                         {/* QR IMAGE */}

//                         {dustbin.qr_code && (
//                             <div className="mt-8 text-center border-t pt-8">

//                                 <h3 className="text-lg font-bold text-gray-700 mb-4">
//                                     Dustbin QR Code
//                                 </h3>

//                                 <img
//                                     src={dustbin.qr_code}
//                                     alt={`QR Code for ${dustbin.bin_id}`}
//                                     className="w-48 h-48 mx-auto border rounded-xl p-2"
//                                 />

//                             </div>
//                         )}

//                     </div>

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default DustbinDetails;




import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DustbinDetails() {
    const { binId } = useParams();

    // ================================
    // RENDER BACKEND URL
    // ================================
    const BASEURL = "https://cleanproject-b0mh.onrender.com";

    const [dustbin, setDustbin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Report Full
    const [reporting, setReporting] = useState(false);

    // Complaint
    const [showComplaint, setShowComplaint] = useState(false);
    const [submittingComplaint, setSubmittingComplaint] = useState(false);

    const [complaintTitle, setComplaintTitle] = useState("");
    const [complaintDescription, setComplaintDescription] = useState("");
    const [complaintImage, setComplaintImage] = useState(null);

    // ==========================================
    // FETCH DUSTBIN
    // ==========================================

    useEffect(() => {
        const fetchDustbin = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get(
                    `${BASEURL}/api/dustbins/qr/${binId}/`
                );

                setDustbin(response.data);

            } catch (err) {
                console.error(
                    "Dustbin fetch error:",
                    err.response?.data || err
                );

                if (err.response?.status === 404) {
                    setError("Dustbin not found.");
                } else {
                    setError("Unable to load dustbin details.");
                }

            } finally {
                setLoading(false);
            }
        };

        if (binId) {
            fetchDustbin();
        }

    }, [binId]);

    // ==========================================
    // REPORT DUSTBIN AS FULL
    // ==========================================

    const handleReportFull = async () => {
        if (!dustbin) {
            return;
        }

        try {
            setReporting(true);

            const response = await axios.post(
                `${BASEURL}/api/dustbins/${dustbin.id}/report/`
            );

            alert(
                response.data?.message ||
                "Dustbin reported as full successfully."
            );

            setDustbin((prev) => ({
                ...prev,
                is_full: true,
                status: "FULL",
                priority_level: "HIGH",
                priority_score: 100,
            }));

        } catch (err) {
            console.error(
                "Report dustbin error:",
                err.response?.data || err
            );

            alert(
                err.response?.data?.error ||
                err.response?.data?.detail ||
                "Unable to report dustbin."
            );

        } finally {
            setReporting(false);
        }
    };

    // ==========================================
    // OPEN COMPLAINT FORM
    // ==========================================

    const openComplaintForm = () => {
        setComplaintTitle("");
        setComplaintDescription("");
        setComplaintImage(null);

        setShowComplaint(true);
    };

    // ==========================================
    // CLOSE COMPLAINT FORM
    // ==========================================

    const closeComplaintForm = () => {
        if (submittingComplaint) {
            return;
        }

        setShowComplaint(false);

        setComplaintTitle("");
        setComplaintDescription("");
        setComplaintImage(null);
    };

    // ==========================================
    // SUBMIT COMPLAINT
    // ==========================================

    const handleComplaintSubmit = async (e) => {
        e.preventDefault();

        if (!dustbin) {
            return;
        }

        if (!complaintTitle.trim()) {
            alert("Please select complaint type.");
            return;
        }

        if (!complaintDescription.trim()) {
            alert("Please describe the problem.");
            return;
        }

        try {
            setSubmittingComplaint(true);

            const formData = new FormData();

            formData.append(
                "dustbin",
                dustbin.id
            );

            formData.append(
                "title",
                complaintTitle
            );

            formData.append(
                "description",
                complaintDescription
            );

            if (complaintImage) {
                formData.append(
                    "image",
                    complaintImage
                );
            }

            const response = await axios.post(
                `${BASEURL}/api/complaints/create/`,
                formData
            );

            alert(
                response.data?.message ||
                "Complaint submitted successfully."
            );

            setShowComplaint(false);

            setComplaintTitle("");
            setComplaintDescription("");
            setComplaintImage(null);

        } catch (err) {
            console.error(
                "Complaint submit error:",
                err.response?.data || err
            );

            const errorData = err.response?.data;

            if (
                errorData &&
                typeof errorData === "object"
            ) {
                const messages = Object.values(
                    errorData
                ).flat();

                alert(
                    messages.length
                        ? messages.join("\n")
                        : "Unable to submit complaint."
                );

            } else {
                alert("Unable to submit complaint.");
            }

        } finally {
            setSubmittingComplaint(false);
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-50">
                <div className="text-center">
                    <div className="text-4xl mb-3">
                        ♻️
                    </div>

                    <p className="text-gray-600">
                        Loading dustbin details...
                    </p>
                </div>
            </div>
        );
    }

    // ==========================================
    // ERROR
    // ==========================================

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
                <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">

                    <div className="text-5xl mb-4">
                        ❌
                    </div>

                    <h1 className="text-2xl font-bold text-red-600 mb-2">
                        Dustbin Not Found
                    </h1>

                    <p className="text-gray-600">
                        {error}
                    </p>

                    <p className="text-sm text-gray-400 mt-4">
                        BIN ID: {binId}
                    </p>

                </div>
            </div>
        );
    }

    // ==========================================
    // MAIN PAGE
    // ==========================================

    return (
        <div className="min-h-screen bg-green-50 py-10 px-4">

            <div className="max-w-3xl mx-auto">

                {/* HEADER */}

                <div className="text-center mb-8">

                    <div className="text-5xl mb-3">
                        ♻️
                    </div>

                    <h1 className="text-3xl font-bold text-green-700">
                        EcoSmart Dustbin
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Smart Dustbin Information
                    </p>

                </div>

                {/* MAIN CARD */}

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                    {/* STATUS */}

                    <div
                        className={`p-6 text-center ${
                            dustbin.status === "FULL"
                                ? "bg-red-100"
                                : "bg-green-100"
                        }`}
                    >

                        <div className="text-4xl mb-2">
                            {dustbin.status === "FULL"
                                ? "🔴"
                                : "🟢"}
                        </div>

                        <h2
                            className={`text-xl font-bold ${
                                dustbin.status === "FULL"
                                    ? "text-red-700"
                                    : "text-green-700"
                            }`}
                        >
                            {dustbin.status === "FULL"
                                ? "Dustbin is FULL"
                                : "Dustbin is AVAILABLE"}
                        </h2>

                    </div>

                    {/* DETAILS */}

                    <div className="p-6 md:p-8">

                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            {dustbin.name}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* BIN ID */}

                            <div className="bg-gray-50 rounded-xl p-4">

                                <p className="text-sm text-gray-500">
                                    BIN ID
                                </p>

                                <p className="font-bold text-green-700 mt-1">
                                    {dustbin.bin_id}
                                </p>

                            </div>

                            {/* TYPE */}

                            <div className="bg-gray-50 rounded-xl p-4">

                                <p className="text-sm text-gray-500">
                                    Waste Type
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    {dustbin.dustbin_type}
                                </p>

                            </div>

                            {/* ADDRESS */}

                            <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">

                                <p className="text-sm text-gray-500">
                                    Address
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    📍 {dustbin.address}
                                </p>

                            </div>

                            {/* LATITUDE */}

                            <div className="bg-gray-50 rounded-xl p-4">

                                <p className="text-sm text-gray-500">
                                    Latitude
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    {dustbin.latitude}
                                </p>

                            </div>

                            {/* LONGITUDE */}

                            <div className="bg-gray-50 rounded-xl p-4">

                                <p className="text-sm text-gray-500">
                                    Longitude
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    {dustbin.longitude}
                                </p>

                            </div>

                            {/* PRIORITY */}

                            <div className="bg-gray-50 rounded-xl p-4">

                                <p className="text-sm text-gray-500">
                                    Priority Level
                                </p>

                                <p
                                    className={`font-bold mt-1 ${
                                        dustbin.priority_level === "HIGH"
                                            ? "text-red-600"
                                            : "text-gray-800"
                                    }`}
                                >
                                    {dustbin.priority_level}
                                </p>

                            </div>

                            {/* PRIORITY SCORE */}

                            <div className="bg-gray-50 rounded-xl p-4">

                                <p className="text-sm text-gray-500">
                                    Priority Score
                                </p>

                                <p
                                    className={`font-bold mt-1 ${
                                        dustbin.priority_score >= 100
                                            ? "text-red-600"
                                            : "text-gray-800"
                                    }`}
                                >
                                    {dustbin.priority_score}
                                </p>

                            </div>

                        </div>

                        {/* REPORT FULL */}

                        {dustbin.status !== "FULL" ? (

                            <div className="mt-8 border-t pt-8">

                                <div className="
                                    bg-yellow-50
                                    border
                                    border-yellow-200
                                    rounded-2xl
                                    p-5
                                    text-center
                                ">

                                    <div className="text-3xl mb-2">
                                        🚨
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-800">
                                        Dustbin is Full?
                                    </h3>

                                    <p className="text-sm text-gray-600 mt-2 mb-4">
                                        If this dustbin is full, report it
                                        to EcoSmart for quick collection.
                                    </p>

                                    <button
                                        onClick={handleReportFull}
                                        disabled={reporting}
                                        className="
                                            w-full
                                            md:w-auto
                                            px-8
                                            py-3
                                            bg-red-600
                                            hover:bg-red-700
                                            disabled:bg-red-300
                                            disabled:cursor-not-allowed
                                            text-white
                                            rounded-xl
                                            font-bold
                                            transition
                                        "
                                    >
                                        {reporting
                                            ? "Reporting..."
                                            : "🚨 Report as FULL"}
                                    </button>

                                </div>

                            </div>

                        ) : (

                            <div className="mt-8 border-t pt-8">

                                <div className="
                                    bg-red-50
                                    border
                                    border-red-200
                                    rounded-2xl
                                    p-5
                                    text-center
                                ">

                                    <div className="text-3xl mb-2">
                                        ✅
                                    </div>

                                    <h3 className="text-lg font-bold text-red-700">
                                        Full Dustbin Reported
                                    </h3>

                                    <p className="text-sm text-gray-600 mt-2">
                                        This dustbin has been marked as FULL.
                                        Collection has been prioritized.
                                    </p>

                                    <div className="
                                        mt-4
                                        inline-block
                                        bg-red-600
                                        text-white
                                        px-4
                                        py-2
                                        rounded-full
                                        text-sm
                                        font-bold
                                    ">
                                        HIGH PRIORITY
                                    </div>

                                </div>

                            </div>
                        )}

                        {/* REPORT COMPLAINT */}

                        <div className="mt-6">

                            <div className="
                                bg-blue-50
                                border
                                border-blue-200
                                rounded-2xl
                                p-5
                                text-center
                            ">

                                <div className="text-3xl mb-2">
                                    📝
                                </div>

                                <h3 className="text-lg font-bold text-gray-800">
                                    Having a Problem?
                                </h3>

                                <p className="text-sm text-gray-600 mt-2 mb-4">
                                    Report any issue related to this dustbin
                                    and help us improve waste management.
                                </p>

                                <button
                                    onClick={openComplaintForm}
                                    className="
                                        w-full
                                        md:w-auto
                                        px-8
                                        py-3
                                        bg-blue-600
                                        hover:bg-blue-700
                                        text-white
                                        rounded-xl
                                        font-bold
                                        transition
                                    "
                                >
                                    📝 Report a Complaint
                                </button>

                            </div>

                        </div>

                        {/* QR IMAGE */}

                        {dustbin.qr_code && (

                            <div className="mt-8 text-center border-t pt-8">

                                <h3 className="text-lg font-bold text-gray-700 mb-4">
                                    Dustbin QR Code
                                </h3>

                                <img
                                    src={dustbin.qr_code}
                                    alt={`QR Code for ${dustbin.bin_id}`}
                                    className="w-48 h-48 mx-auto border rounded-xl p-2"
                                />

                            </div>

                        )}

                    </div>

                </div>

            </div>

            {/* ==========================================
                COMPLAINT MODAL
            ========================================== */}

            {showComplaint && (

                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        bg-black/50
                        flex
                        items-center
                        justify-center
                        p-4
                    "
                >

                    <div className="
                        bg-white
                        rounded-2xl
                        shadow-2xl
                        w-full
                        max-w-lg
                        max-h-[90vh]
                        overflow-y-auto
                        p-6
                        md:p-8
                    ">

                        {/* MODAL HEADER */}

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-2xl font-bold text-gray-800">
                                    📝 Report a Problem
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    {dustbin.name}
                                </p>

                                <p className="text-xs text-green-700 font-semibold mt-1">
                                    {dustbin.bin_id}
                                </p>

                            </div>

                            <button
                                onClick={closeComplaintForm}
                                disabled={submittingComplaint}
                                className="
                                    text-gray-500
                                    hover:text-gray-800
                                    text-2xl
                                    disabled:opacity-50
                                "
                            >
                                ✕
                            </button>

                        </div>

                        {/* COMPLAINT FORM */}

                        <form
                            onSubmit={handleComplaintSubmit}
                            className="space-y-5"
                        >

                            {/* TITLE */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mb-2
                                ">
                                    Complaint Type
                                </label>

                                <select
                                    value={complaintTitle}
                                    onChange={(e) =>
                                        setComplaintTitle(
                                            e.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        border
                                        border-gray-300
                                        rounded-xl
                                        p-3
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                    "
                                >

                                    <option value="">
                                        Select Complaint Type
                                    </option>

                                    <option value="Dustbin Overflowing">
                                        Dustbin Overflowing
                                    </option>

                                    <option value="Dustbin Damaged">
                                        Dustbin Damaged / Broken
                                    </option>

                                    <option value="Bad Smell">
                                        Bad Smell
                                    </option>

                                    <option value="Waste Scattered">
                                        Waste Scattered Around
                                    </option>

                                    <option value="Wrong Waste Category">
                                        Wrong Waste Category
                                    </option>

                                    <option value="Dustbin Missing">
                                        Dustbin Missing
                                    </option>

                                    <option value="QR Code Problem">
                                        QR Code Problem
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>

                            {/* DESCRIPTION */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mb-2
                                ">
                                    Description
                                </label>

                                <textarea
                                    value={complaintDescription}
                                    onChange={(e) =>
                                        setComplaintDescription(
                                            e.target.value
                                        )
                                    }
                                    rows="5"
                                    placeholder="Describe the problem..."
                                    className="
                                        w-full
                                        border
                                        border-gray-300
                                        rounded-xl
                                        p-3
                                        resize-none
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                    "
                                />

                            </div>

                            {/* IMAGE */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mb-2
                                ">
                                    Upload Photo
                                    <span className="text-gray-400 font-normal">
                                        {" "}
                                        (Optional)
                                    </span>
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setComplaintImage(
                                            e.target.files?.[0] || null
                                        )
                                    }
                                    className="
                                        w-full
                                        border
                                        border-gray-300
                                        rounded-xl
                                        p-3
                                        text-sm
                                    "
                                />

                                {complaintImage && (
                                    <p className="
                                        text-xs
                                        text-green-600
                                        mt-2
                                    ">
                                        ✅ {complaintImage.name}
                                    </p>
                                )}

                            </div>

                            {/* DUSTBIN INFO */}

                            <div className="
                                bg-gray-50
                                rounded-xl
                                p-4
                            ">

                                <p className="text-xs text-gray-500">
                                    COMPLAINT FOR
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    🗑️ {dustbin.name}
                                </p>

                                <p className="text-xs text-green-700 font-semibold mt-1">
                                    {dustbin.bin_id}
                                </p>

                                <p className="text-sm text-gray-600 mt-1">
                                    📍 {dustbin.address}
                                </p>

                            </div>

                            {/* BUTTONS */}

                            <div className="
                                flex
                                flex-col
                                md:flex-row
                                gap-3
                            ">

                                <button
                                    type="button"
                                    onClick={closeComplaintForm}
                                    disabled={submittingComplaint}
                                    className="
                                        flex-1
                                        bg-gray-200
                                        hover:bg-gray-300
                                        disabled:opacity-50
                                        text-gray-700
                                        py-3
                                        rounded-xl
                                        font-semibold
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={submittingComplaint}
                                    className="
                                        flex-1
                                        bg-blue-600
                                        hover:bg-blue-700
                                        disabled:bg-blue-300
                                        disabled:cursor-not-allowed
                                        text-white
                                        py-3
                                        rounded-xl
                                        font-bold
                                    "
                                >
                                    {submittingComplaint
                                        ? "Submitting..."
                                        : "📝 Submit Complaint"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

export default DustbinDetails;
