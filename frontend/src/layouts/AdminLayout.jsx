// import AdminSidebar from "../components/admin/AdminSidebar";
// import AdminTopbar from "../components/admin/AdminTopbar";


// function AdminLayout({children}){

//     return(

//         <div className="flex">

//             <AdminSidebar/>

//             <div className="flex-1">

//                 <AdminTopbar/>

//                 {children}

//             </div>

//         </div>

//     )

// }


// export default AdminLayout;

import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";


function AdminLayout() {

    return (

        <div className="min-h-screen bg-gray-100">


            {/* ================= SIDEBAR ================= */}

            <AdminSidebar />


            {/* ================= MAIN AREA ================= */}

            <div className="ml-[274px] min-h-screen">


                {/* ================= TOPBAR ================= */}

                <AdminTopbar />


                {/* ================= CONTENT ================= */}

                <main className="pt-20">

                    <div className="p-6">

                        <Outlet />

                    </div>

                </main>


            </div>


        </div>

    );

}


export default AdminLayout;