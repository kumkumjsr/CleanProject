// import { Routes, Route, Navigate } from "react-router-dom";

// import AdminLayout from "../layouts/AdminLayout";

// import Dashboard from "../pages/admin/Dashboard";
// import TaskList from "../pages/admin/TaskList";
// import TaskDetails from "../pages/admin/TaskDetails";
// import ReportedDustbins from "../pages/admin/ReportedDustbins";
// import Dustbins from "../pages/admin/Dustbins";


// function AdminRoutes() {

//     return (

//         <Routes>

//             <Route element={<AdminLayout />}>

//                 {/* =========================
//                     DEFAULT ADMIN PAGE
//                 ========================= */}

//                 <Route
//                     index
//                     element={
//                         <Navigate
//                             to="dashboard"
//                             replace
//                         />
//                     }
//                 />


//                 {/* =========================
//                     DASHBOARD
//                 ========================= */}

//                 <Route
//                     path="dashboard"
//                     element={<Dashboard />}
//                 />


//                 {/* =========================
//                     TASKS
//                 ========================= */}

//                 <Route
//                     path="tasks"
//                     element={<TaskList />}
//                 />


//                 <Route
//                     path="tasks/:id"
//                     element={<TaskDetails />}
//                 />


//                 {/* =========================
//                     REPORTED DUSTBINS
//                 ========================= */}

//                 <Route
//                     path="reported-dustbins"
//                     element={<ReportedDustbins />}
//                 />


//                 {/* =========================
//                     DUSTBINS
//                 ========================= */}

//                 <Route
//                     path="dustbins"
//                     element={<Dustbins />}
//                 />

//             </Route>

//         </Routes>

//     );

// }


// export default AdminRoutes;

import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";
import TaskList from "../pages/admin/TaskList";
import TaskDetails from "../pages/admin/TaskDetails";
import ReportedDustbins from "../pages/admin/ReportedDustbins";
import Dustbins from "../pages/admin/Dustbins";


function AdminRoutes() {

    return (

        <Routes>

            <Route element={<AdminLayout />}>

                <Route
                    index
                    element={
                        <Navigate
                            to="dashboard"
                            replace
                        />
                    }
                />

                <Route
                    path="dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="tasks"
                    element={<TaskList />}
                />

                <Route
                    path="tasks/:id"
                    element={<TaskDetails />}
                />

                <Route
                    path="reported-dustbins"
                    element={<ReportedDustbins />}
                />

                <Route
                    path="dustbins"
                    element={<Dustbins />}
                />

            </Route>

        </Routes>

    );

}


export default AdminRoutes;