import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";


function DashboardLayout({children}){


    return(

        <div className="flex min-h-screen">


            <AdminSidebar />


            <div className="flex-1 bg-gray-100">


                <AdminTopbar />


                <main>

                    {children}

                </main>


            </div>


        </div>

    )

}


export default DashboardLayout;