// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


// // ================= USER / COMMON =================

// import WasteScanner from "./pages/WasteScanner";
// import History from "./pages/History";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Logout from "./pages/Logout";

// import ProtectedRoute from "./components/ProtectedRoute";


// // ================= ADMIN =================

// import AdminDashboard from "./pages/admin/Dashboard";

// import CreateStaff from "./pages/CreateStaff";
// import EditStaff from "./pages/EditStaff";
// import EditUser from "./pages/EditUser";

// import StaffList from "./pages/StaffList";
// import UserList from "./pages/UserList";

// import Tasks from "./pages/admin/Tasks";
// import CreateTask from "./pages/admin/CreateTask";
// import TaskList from "./pages/admin/TaskList";
// import TaskDetails from "./pages/admin/TaskDetails";
// import EditTask from "./pages/admin/EditTask";

// import Reports from "./pages/admin/Reports";
// import Notifications from "./pages/admin/Notifications";
// import Settings from "./pages/admin/Settings";
// import Salary from "./pages/admin/Salary";

// import ReportedDustbins from "./pages/admin/ReportedDustbins";

// // ⭐ IMPORTANT
// import Dustbins from "./pages/admin/Dustbins";

// import Complaints from "./pages/admin/Complaints";


// // ================= STAFF =================

// import StaffDashboard from "./pages/staff/Dashboard";
// import StaffTasks from "./pages/staff/StaffTasks";
// import CompleteTask from "./pages/staff/CompleteTask";

// import StaffSalary from "./pages/staff/Salary";
// import StaffNotifications from "./pages/staff/Notifications";
// import StaffProfile from "./pages/staff/Profile";
// import StaffSettings from "./pages/staff/Settings";


// // ================= USER =================

// import UserRoutes from "./routes/UserRoutes";


// // ================= LAYOUT =================

// import DashboardLayout from "./layouts/DashboardLayout";


// function App() {

//     return (

//         <BrowserRouter>

//             <div className="p-5">


//                 {/* ================================================= */}
//                 {/* TOP NAVIGATION */}
//                 {/* ================================================= */}

//                 <nav
//                     className="
//                         bg-white
//                         shadow-lg
//                         rounded-2xl
//                         px-6
//                         py-4
//                         mb-6
//                         flex
//                         flex-wrap
//                         items-center
//                         gap-4
//                         border
//                         border-green-100
//                     "
//                 >


//                     {/* LOGO */}

//                     <div
//                         className="
//                             flex
//                             items-center
//                             gap-2
//                             mr-5
//                             text-green-700
//                             font-bold
//                             text-xl
//                         "
//                     >

//                         🌱 EcoSmart

//                     </div>


//                     {/* LOGIN */}

//                     <Link
//                         to="/login"
//                         className="
//                             px-4
//                             py-2
//                             rounded-xl
//                             text-gray-700
//                             hover:bg-green-100
//                             hover:text-green-700
//                             transition
//                             font-medium
//                         "
//                     >

//                         🔐 Login

//                     </Link>


//                     {/* REGISTER */}

//                     <Link
//                         to="/register"
//                         className="
//                             px-4
//                             py-2
//                             rounded-xl
//                             text-gray-700
//                             hover:bg-green-100
//                             hover:text-green-700
//                             transition
//                             font-medium
//                         "
//                     >

//                         📝 Register

//                     </Link>


//                     {/* LOGOUT */}

//                     <div className="ml-auto">

//                         <Logout />

//                     </div>


//                 </nav>


//                 {/* ================================================= */}
//                 {/* ROUTES */}
//                 {/* ================================================= */}

//                 <Routes>


//                     {/* ================================================= */}
//                     {/* AUTH */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/login"
//                         element={<Login />}
//                     />


//                     <Route
//                         path="/register"
//                         element={<Register />}
//                     />



//                     {/* ================================================= */}
//                     {/* USER COMMON SCANNER */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/"
//                         element={

//                             <ProtectedRoute>

//                                 <WasteScanner />

//                             </ProtectedRoute>

//                         }
//                     />


//                     <Route
//                         path="/history"
//                         element={

//                             <ProtectedRoute>

//                                 <History />

//                             </ProtectedRoute>

//                         }
//                     />



//                     {/* ================================================= */}
//                     {/* ADMIN DASHBOARD */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/admin"
//                         element={

//                             <ProtectedRoute>

//                                 <AdminDashboard />

//                             </ProtectedRoute>

//                         }
//                     />


//                     {/* ================================================= */}
//                     {/* ADMIN STAFF */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/admin/staff"
//                         element={

//                             <ProtectedRoute>

//                                 <StaffList />

//                             </ProtectedRoute>

//                         }
//                     />


//                     <Route
//                         path="/admin/staff/create"
//                         element={

//                             <ProtectedRoute>

//                                 <CreateStaff />

//                             </ProtectedRoute>

//                         }
//                     />


//                     <Route
//                         path="/admin/staff/edit/:id"
//                         element={

//                             <ProtectedRoute>

//                                 <EditStaff />

//                             </ProtectedRoute>

//                         }
//                     />



//                     {/* ================================================= */}
//                     {/* ADMIN USERS */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/admin/users"
//                         element={

//                             <ProtectedRoute>

//                                 <UserList />

//                             </ProtectedRoute>

//                         }
//                     />


//                     <Route
//                         path="/admin/users/edit/:id"
//                         element={

//                             <ProtectedRoute>

//                                 <EditUser />

//                             </ProtectedRoute>

//                         }
//                     />



//                     {/* ================================================= */}
//                     {/* ADMIN TASKS */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/admin/tasks"
//                         element={

//                             <ProtectedRoute>

//                                 <TaskList />

//                             </ProtectedRoute>

//                         }
//                     />


//                     <Route
//                         path="/admin/tasks/create"
//                         element={

//                             <ProtectedRoute>

//                                 <CreateTask />

//                             </ProtectedRoute>

//                         }
//                     />


//                     <Route
//                         path="/admin/tasks/:id"
//                         element={

//                             <ProtectedRoute>

//                                 <TaskDetails />

//                             </ProtectedRoute>

//                         }
//                     />


//                     <Route
//                         path="/admin/tasks/edit/:id"
//                         element={

//                             <ProtectedRoute>

//                                 <EditTask />

//                             </ProtectedRoute>

//                         }
//                     />



//                     {/* ================================================= */}
//                     {/* ADMIN REPORTS */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/admin/reports"
//                         element={

//                             <ProtectedRoute>

//                                 <Reports />

//                             </ProtectedRoute>

//                         }
//                     />



//                     {/* ================================================= */}
//                     {/* ADMIN NOTIFICATIONS */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/admin/notifications"
//                         element={

//                             <ProtectedRoute>

//                                 <Notifications />

//                             </ProtectedRoute>

//                         }
//                     />



//                     {/* ================================================= */}
//                     {/* ADMIN SETTINGS */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/admin/settings"
//                         element={

//                             <ProtectedRoute>

//                                 <DashboardLayout>

//                                     <Settings />

//                                 </DashboardLayout>

//                             </ProtectedRoute>

//                         }
//                     />



//                     {/* ================================================= */}
//                     {/* ADMIN SALARY */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/admin/salary"
//                         element={

//                             <ProtectedRoute>

//                                 <Salary />

//                             </ProtectedRoute>

//                         }
//                     />



//                     {/* ================================================= */}
//                     {/* ADMIN REPORTED DUSTBINS */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/admin/reported-dustbins"
//                         element={

//                             <ProtectedRoute>

//                                 <ReportedDustbins />

//                             </ProtectedRoute>

//                         }
//                     />



//                     {/* ================================================= */}
//                     {/* ⭐ ADMIN DUSTBINS */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/admin/dustbins"
//                         element={

//                             <ProtectedRoute>

//                                 <Dustbins />

//                             </ProtectedRoute>

//                         }
//                     />



//                     {/* ================================================= */}
//                     {/* ADMIN COMPLAINTS */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/admin/complaints"
//                         element={

//                             <ProtectedRoute>

//                                 <Complaints />

//                             </ProtectedRoute>

//                         }
//                     />



//                     {/* ================================================= */}
//                     {/* STAFF */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/staff"
//                         element={

//                             <ProtectedRoute>

//                                 <StaffDashboard />

//                             </ProtectedRoute>

//                         }
//                     />


//                     <Route
//                         path="/staff/dashboard"
//                         element={

//                             <ProtectedRoute>

//                                 <StaffDashboard />

//                             </ProtectedRoute>

//                         }
//                     />


//                     <Route
//                         path="/staff/tasks"
//                         element={

//                             <ProtectedRoute>

//                                 <StaffTasks />

//                             </ProtectedRoute>

//                         }
//                     />


//                     <Route
//                         path="/staff/tasks/:id/complete"
//                         element={

//                             <ProtectedRoute>

//                                 <CompleteTask />

//                             </ProtectedRoute>

//                         }
//                     />


//                     <Route
//                         path="/staff/salary"
//                         element={

//                             <ProtectedRoute>

//                                 <StaffSalary />

//                             </ProtectedRoute>

//                         }
//                     />


//                     <Route
//                         path="/staff/profile"
//                         element={

//                             <ProtectedRoute>

//                                 <StaffProfile />

//                             </ProtectedRoute>

//                         }
//                     />


//                     <Route
//                         path="/staff/settings"
//                         element={

//                             <ProtectedRoute>

//                                 <StaffSettings />

//                             </ProtectedRoute>

//                         }
//                     />


//                     <Route
//                         path="/staff/notifications"
//                         element={

//                             <ProtectedRoute>

//                                 <StaffNotifications />

//                             </ProtectedRoute>

//                         }
//                     />



//                     {/* ================================================= */}
//                     {/* USER PANEL */}
//                     {/* ================================================= */}


//                     <Route
//                         path="/user/*"
//                         element={

//                             <ProtectedRoute>

//                                 <UserRoutes />

//                             </ProtectedRoute>

//                         }
//                     />


//                 </Routes>

//             </div>

//         </BrowserRouter>

//     );
// }


// export default App;

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


// ================= COMMON =================

import WasteScanner from "./pages/WasteScanner";
import History from "./pages/History";
import DustbinDetails from "./pages/DustbinDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";

import ProtectedRoute from "./components/ProtectedRoute";


// ================= ADMIN =================

import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/admin/Dashboard";

import CreateStaff from "./pages/CreateStaff";
import EditStaff from "./pages/EditStaff";
import EditUser from "./pages/EditUser";

import StaffList from "./pages/StaffList";
import UserList from "./pages/UserList";

import TaskList from "./pages/admin/TaskList";
import TaskDetails from "./pages/admin/TaskDetails";
import CreateTask from "./pages/admin/CreateTask";
import EditTask from "./pages/admin/EditTask";

import Reports from "./pages/admin/Reports";
import Notifications from "./pages/admin/Notifications";
import Settings from "./pages/admin/Settings";
import Salary from "./pages/admin/Salary";

import ReportedDustbins from "./pages/admin/ReportedDustbins";
import Dustbins from "./pages/admin/Dustbins";
import Complaints from "./pages/admin/Complaints";


// ================= STAFF =================

import StaffDashboard from "./pages/staff/Dashboard";
import StaffTasks from "./pages/staff/StaffTasks";
import CompleteTask from "./pages/staff/CompleteTask";

import StaffSalary from "./pages/staff/Salary";
import StaffNotifications from "./pages/staff/Notifications";
import StaffProfile from "./pages/staff/Profile";
import StaffSettings from "./pages/staff/Settings";


// ================= USER =================

import UserRoutes from "./routes/UserRoutes";


// ================= OTHER LAYOUT =================

import DashboardLayout from "./layouts/DashboardLayout";


function App() {

    return (

        <BrowserRouter>

            {/* ================================================= */}
            {/* COMMON NAVIGATION */}
            {/* ================================================= */}

            <div className="p-5">

                <nav
                    className="
                        bg-white
                        shadow-lg
                        rounded-2xl
                        px-6
                        py-4
                        flex
                        flex-wrap
                        items-center
                        gap-4
                        border
                        border-green-100
                    "
                >

                    {/* LOGO */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            mr-5
                            text-green-700
                            font-bold
                            text-xl
                        "
                    >

                        🌱 EcoSmart

                    </div>


                    {/* LOGIN */}

                    <Link
                        to="/login"
                        className="
                            px-4
                            py-2
                            rounded-xl
                            text-gray-700
                            hover:bg-green-100
                            hover:text-green-700
                            transition
                            font-medium
                        "
                    >

                        🔐 Login

                    </Link>


                    {/* REGISTER */}

                    <Link
                        to="/register"
                        className="
                            px-4
                            py-2
                            rounded-xl
                            text-gray-700
                            hover:bg-green-100
                            hover:text-green-700
                            transition
                            font-medium
                        "
                    >

                        📝 Register

                    </Link>


                    {/* LOGOUT */}

                    <div className="ml-auto">

                        <Logout />

                    </div>

                </nav>


                {/* ================================================= */}
                {/* ROUTES */}
                {/* ================================================= */}

                <Routes>


                    {/* ================================================= */}
                    {/* AUTH */}
                    {/* ================================================= */}

                    <Route
                        path="/login"
                        element={<Login />}
                    />


                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/dustbin/:binId"
                        element={<DustbinDetails />}
                    />

                    {/* ================================================= */}
                    {/* COMMON USER SCANNER */}
                    {/* ================================================= */}

                    <Route
                        path="/"
                        element={

                            <ProtectedRoute>

                                <WasteScanner />

                            </ProtectedRoute>

                        }
                    />


                    <Route
                        path="/history"
                        element={

                            <ProtectedRoute>

                                <History />

                            </ProtectedRoute>

                        }
                    />



                    {/* ================================================= */}
                    {/* ADMIN PANEL */}
                    {/* ================================================= */}

                    <Route
                        path="/admin"
                        element={

                            <ProtectedRoute>

                                <AdminLayout />

                            </ProtectedRoute>

                        }
                    >

                        {/* DASHBOARD */}

                        <Route
                            index
                            element={<AdminDashboard />}
                        />


                        {/* USERS */}

                        <Route
                            path="users"
                            element={<UserList />}
                        />


                        <Route
                            path="users/edit/:id"
                            element={<EditUser />}
                        />


                        {/* STAFF */}

                        <Route
                            path="staff"
                            element={<StaffList />}
                        />


                        <Route
                            path="staff/create"
                            element={<CreateStaff />}
                        />


                        <Route
                            path="staff/edit/:id"
                            element={<EditStaff />}
                        />


                        {/* TASKS */}

                        <Route
                            path="tasks"
                            element={<TaskList />}
                        />


                        <Route
                            path="tasks/create"
                            element={<CreateTask />}
                        />


                        <Route
                            path="tasks/:id"
                            element={<TaskDetails />}
                        />


                        <Route
                            path="tasks/edit/:id"
                            element={<EditTask />}
                        />


                        {/* REPORTS */}

                        <Route
                            path="reports"
                            element={<Reports />}
                        />


                        {/* NOTIFICATIONS */}

                        <Route
                            path="notifications"
                            element={<Notifications />}
                        />


                        {/* SETTINGS */}

                        <Route
                            path="settings"
                            element={<Settings />}
                        />


                        {/* SALARY */}

                        <Route
                            path="salary"
                            element={<Salary />}
                        />


                        {/* REPORTED DUSTBINS */}

                        <Route
                            path="reported-dustbins"
                            element={<ReportedDustbins />}
                        />


                        {/* DUSTBINS */}

                        <Route
                            path="dustbins"
                            element={<Dustbins />}
                        />


                        {/* COMPLAINTS */}

                        <Route
                            path="complaints"
                            element={<Complaints />}
                        />

                    </Route>



                    {/* ================================================= */}
                    {/* STAFF */}
                    {/* ================================================= */}

                    <Route
                        path="/staff"
                        element={

                            <ProtectedRoute>

                                <StaffDashboard />

                            </ProtectedRoute>

                        }
                    />


                    <Route
                        path="/staff/dashboard"
                        element={

                            <ProtectedRoute>

                                <StaffDashboard />

                            </ProtectedRoute>

                        }
                    />


                    <Route
                        path="/staff/tasks"
                        element={

                            <ProtectedRoute>

                                <StaffTasks />

                            </ProtectedRoute>

                        }
                    />


                    <Route
                        path="/staff/tasks/:id/complete"
                        element={

                            <ProtectedRoute>

                                <CompleteTask />

                            </ProtectedRoute>

                        }
                    />


                    <Route
                        path="/staff/salary"
                        element={

                            <ProtectedRoute>

                                <StaffSalary />

                            </ProtectedRoute>

                        }
                    />


                    <Route
                        path="/staff/profile"
                        element={

                            <ProtectedRoute>

                                <StaffProfile />

                            </ProtectedRoute>

                        }
                    />


                    <Route
                        path="/staff/settings"
                        element={

                            <ProtectedRoute>

                                <StaffSettings />

                            </ProtectedRoute>

                        }
                    />


                    <Route
                        path="/staff/notifications"
                        element={

                            <ProtectedRoute>

                                <StaffNotifications />

                            </ProtectedRoute>

                        }
                    />



                    {/* ================================================= */}
                    {/* USER PANEL */}
                    {/* ================================================= */}

                    <Route
                        path="/user/*"
                        element={

                            <ProtectedRoute>

                                <UserRoutes />

                            </ProtectedRoute>

                        }
                    />


                </Routes>

            </div>

        </BrowserRouter>

    );

}


export default App;