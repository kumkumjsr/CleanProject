import { NavLink, useNavigate } from "react-router-dom";


function UserSidebar() {


  const navigate = useNavigate();



  const handleLogout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    navigate("/login");

  };




  const menuItems = [

    {
      name:"Dashboard",
      path:"/user/dashboard",
      icon:"🏠"
    },


    {
      name:"Scan Waste",
      path:"/user/scan",
      icon:"📷"
    },


    {
      name:"Scan History",
      path:"/user/history",
      icon:"📜"
    },


    {
      name:"Nearby Dustbins",
      path:"/user/dustbins",
      icon:"📍"
    },


    {
      name:"Rewards",
      path:"/user/rewards",
      icon:"🏆"
    },


    {
      name:"Report Issue",
      path:"/user/report",
      icon:"📝"
    },


    {
      name:"Notifications",
      path:"/user/notifications",
      icon:"🔔"
    },


    {
      name:"Profile",
      path:"/user/profile",
      icon:"👤"
    },


    {
      name:"Settings",
      path:"/user/settings",
      icon:"⚙️"
    },


  ];





return(


<aside className="w-72 h-screen bg-green-700 text-white flex flex-col shadow-xl">



{/* Logo */}


<div className="p-6 border-b border-green-500">


<h1 className="text-3xl font-bold">

🌱 EcoSmart

</h1>


<p className="text-green-100 text-sm mt-1">

User Panel

</p>


</div>







<nav className="flex-1 overflow-y-auto mt-4">


{
menuItems.map((item)=>(


<NavLink

key={item.path}

to={item.path}

className={({isActive})=>

`flex items-center gap-3 px-6 py-4 transition-all ${
isActive
?
"bg-green-900"
:
"hover:bg-green-600"
}`

}

>


<span className="text-xl">

{item.icon}

</span>


<span className="font-medium">

{item.name}

</span>



</NavLink>


))

}



</nav>







<div className="p-5 border-t border-green-500">


<button

onClick={handleLogout}

className="flex items-center gap-3 hover:text-red-300"

>


<span>

🚪

</span>


Logout


</button>


</div>






</aside>


)



}


export default UserSidebar;