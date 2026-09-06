import { Outlet } from "react-router-dom";

import UserSidebar from "../components/user/UserSidebar";
import UserTopbar from "../components/user/UserTopbar";


function UserLayout(){

return(

<div className="flex h-screen bg-gray-100">


<UserSidebar />


<div className="flex flex-col flex-1 overflow-hidden">


<UserTopbar />


<main className="flex-1 overflow-y-auto p-6">

<Outlet />

</main>


</div>


</div>

)

}


export default UserLayout;