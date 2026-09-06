import { useNavigate } from "react-router-dom";

import ChangePassword from "./ChangePassword";
import AccountSecurity from "./AccountSecurity";


function Settings(){


    const navigate = useNavigate();



    const handleLogout = ()=>{


        localStorage.removeItem("access");

        localStorage.removeItem("refresh");

        localStorage.removeItem("role");

        localStorage.removeItem("username");


        navigate("/login");


    };





return(

<div className="p-6">


<h1 className="text-3xl font-bold mb-6">

⚙️ Settings

</h1>





{/* Account Security */}


<AccountSecurity />







{/* Change Password */}


<div className="mt-6">

<ChangePassword />

</div>








{/* Logout */}



<div className="bg-white shadow rounded-2xl p-6 mt-6">


<h2 className="text-xl font-bold mb-4">

🚪 Logout

</h2>



<p className="text-gray-600 mb-4">

Logout from your EcoSmart account.

</p>




<button

onClick={handleLogout}

className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"

>

Logout

</button>



</div>







</div>


)

}


export default Settings;