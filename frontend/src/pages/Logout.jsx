// import { useNavigate } from "react-router-dom";


// function Logout(){

//     const navigate = useNavigate();


//     const handleLogout = () => {

//         localStorage.removeItem("access");
//         localStorage.removeItem("refresh");

//         navigate("/login");

//     };


//     return (

//         <button onClick={handleLogout}>
//             Logout
//         </button>

//     );

// }


// export default Logout;


import { useNavigate } from "react-router-dom";


function Logout(){

    const navigate = useNavigate();


    const handleLogout = ()=>{


        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("role");
        localStorage.removeItem("username");


        navigate("/login");


    };


    return(

        <button
        onClick={handleLogout}
        className="text-red-600 font-semibold"
        >

            Logout

        </button>

    )

}


export default Logout;