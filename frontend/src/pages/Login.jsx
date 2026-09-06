// import { useState } from "react";
// import { loginUser } from "../services/authService";
// import { useNavigate } from "react-router-dom";


// function Login() {

//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const navigate = useNavigate();


//     const handleLogin = async (e) => {

//         e.preventDefault();

//         try {

//             const data = await loginUser(
//                 username,
//                 password
//             );


//             console.log(
//                 "Login Response:",
//                 data
//             );


//             if(data.role === "ADMIN"){

//                 navigate("/admin");

//             }
//             else if(data.role === "WORKER"){

//                 navigate("/staff");

//             }
//             else{

//                 navigate("/user/dashboard");

//             }


//         }
//         catch(err){

//             console.error(err);

//             alert("Login Failed");

//         }

//     };



//     return (

//         <div className="
//             min-h-screen
//             flex
//             items-center
//             justify-center
//             bg-gradient-to-br
//             from-green-100
//             to-green-50
//             px-4
//         ">


//             <div className="
//                 bg-white
//                 w-full
//                 max-w-md
//                 p-8
//                 rounded-3xl
//                 shadow-xl
//             ">


//                 {/* Logo */}

//                 <div className="
//                     text-center
//                     text-5xl
//                     mb-4
//                 ">
//                     🌱
//                 </div>



//                 {/* Heading */}

//                 <h2 className="
//                     text-3xl
//                     font-bold
//                     text-center
//                     text-green-700
//                 ">
//                     EcoSmart Login
//                 </h2>



//                 <p className="
//                     text-center
//                     text-gray-500
//                     mt-2
//                     mb-8
//                 ">
//                     Welcome back! Manage your eco journey
//                 </p>




//                 <form 
//                     onSubmit={handleLogin}
//                     className="space-y-5"
//                 >



//                     <input

//                         type="text"

//                         placeholder="Username"

//                         value={username}

//                         onChange={(e)=>
//                             setUsername(e.target.value)
//                         }

//                         className="
//                             w-full
//                             px-4
//                             py-3
//                             border
//                             rounded-xl
//                             outline-none
//                             focus:ring-2
//                             focus:ring-green-500
//                         "

//                     />





//                     <input

//                         type="password"

//                         placeholder="Password"

//                         value={password}

//                         onChange={(e)=>
//                             setPassword(e.target.value)
//                         }

//                         className="
//                             w-full
//                             px-4
//                             py-3
//                             border
//                             rounded-xl
//                             outline-none
//                             focus:ring-2
//                             focus:ring-green-500
//                         "

//                     />





//                     <button

//                         type="submit"

//                         className="
//                             w-full
//                             bg-green-700
//                             text-white
//                             py-3
//                             rounded-xl
//                             font-semibold
//                             text-lg
//                             hover:bg-green-800
//                             transition
//                             duration-300
//                         "

//                     >

//                         Login

//                     </button>



//                 </form>


//             </div>


//         </div>

//     );

// }


// export default Login;



import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser(
                username,
                password
            );


            console.log(
                "Login Response:",
                data
            );


            if (data.role === "ADMIN") {

                navigate("/admin");

            }
            else if (data.role === "WORKER") {

                navigate("/staff");

            }
            else {

                navigate("/user/dashboard");

            }


        }
        catch (err) {

            console.error(err);

            alert("Login Failed");

        }

    };


    return (

        <div className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-gradient-to-br
            from-green-100
            to-green-50
            px-4
        ">


            <div className="
                bg-white
                w-full
                max-w-md
                p-8
                rounded-3xl
                shadow-xl
            ">


                {/* Logo */}

                <div className="
                    text-center
                    text-5xl
                    mb-4
                ">
                    🌱
                </div>


                {/* Heading */}

                <h2 className="
                    text-3xl
                    font-bold
                    text-center
                    text-green-700
                ">
                    EcoSmart Login
                </h2>


                <p className="
                    text-center
                    text-gray-500
                    mt-2
                    mb-8
                ">
                    Welcome back! Manage your eco journey
                </p>


                {/* Login Form */}

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >


                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        className="
                            w-full
                            px-4
                            py-3
                            border
                            rounded-xl
                            outline-none
                            focus:ring-2
                            focus:ring-green-500
                        "
                    />


                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="
                            w-full
                            px-4
                            py-3
                            border
                            rounded-xl
                            outline-none
                            focus:ring-2
                            focus:ring-green-500
                        "
                    />


                    <button
                        type="submit"
                        className="
                            w-full
                            bg-green-700
                            text-white
                            py-3
                            rounded-xl
                            font-semibold
                            text-lg
                            hover:bg-green-800
                            transition
                            duration-300
                        "
                    >
                        Login
                    </button>


                </form>


                {/* Register Section */}

                <div className="
                    text-center
                    mt-6
                    pt-5
                    border-t
                    border-gray-200
                ">

                    <p className="text-gray-500 text-sm">

                        Don't have an account?

                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                            className="
                                ml-2
                                text-green-700
                                font-semibold
                                hover:text-green-800
                                hover:underline
                                transition
                            "
                        >
                            Register
                        </button>

                    </p>

                </div>


            </div>


        </div>

    );

}


export default Login;