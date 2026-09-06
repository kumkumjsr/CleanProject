import { Routes, Route, Navigate } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";

import Dashboard from "../pages/user/Dashboard";
import ScanWaste from "../pages/user/ScanWaste";
import ScanHistory from "../pages/user/ScanHistory";
import NearbyDustbins from "../pages/user/NearbyDustbins";
import Rewards from "../pages/user/Rewards";
import ReportIssue from "../pages/user/ReportIssue";
import Notifications from "../pages/user/Notifications";
import Profile from "../pages/user/Profile";
import Settings from "../pages/user/Settings";


function UserRoutes(){


return(

<Routes>


<Route element={<UserLayout/>}>


<Route
path="/"
element={<Navigate to="dashboard" replace/>}
/>


<Route
path="dashboard"
element={<Dashboard/>}
/>


<Route
path="scan"
element={<ScanWaste/>}
/>


<Route
path="history"
element={<ScanHistory/>}
/>


<Route
path="dustbins"
element={<NearbyDustbins/>}
/>


<Route
path="rewards"
element={<Rewards/>}
/>


<Route
path="report"
element={<ReportIssue/>}
/>


<Route
path="notifications"
element={<Notifications/>}
/>


<Route
path="profile"
element={<Profile/>}
/>


<Route
path="settings"
element={<Settings/>}
/>


</Route>


</Routes>

)

}


export default UserRoutes;