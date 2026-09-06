import StaffSidebar from "../components/staff/StaffSidebar";
import StaffTopbar from "../components/staff/StaffTopbar";

function StaffLayout({ children }) {

    return (

        <div className="min-h-screen bg-gray-50">

            {/* SIDEBAR */}

            <StaffSidebar />


            {/* RIGHT SIDE */}

            <div className="ml-64 min-h-screen">

                {/* TOPBAR */}

                <StaffTopbar />


                {/* PAGE CONTENT */}

                <main className="p-6 md:p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default StaffLayout;