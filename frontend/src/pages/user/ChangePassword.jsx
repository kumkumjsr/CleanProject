// import { useState } from "react";
// import axios from "axios";


// function ChangePassword(){


// const [oldPassword,setOldPassword] = useState("");

// const [newPassword,setNewPassword] = useState("");

// const [message,setMessage] = useState("");





// const handleSubmit = async(e)=>{


// e.preventDefault();



// try{


// const token = localStorage.getItem("access");



// await axios.post(

// "http://127.0.0.1:8000/api/accounts/change-password/",


// {

// old_password:oldPassword,

// new_password:newPassword

// },


// {

// headers:{

// Authorization:`Bearer ${token}`

// }

// }

// );



// setMessage(
// "Password changed successfully"
// );



// setOldPassword("");

// setNewPassword("");



// }

// catch(error){


// console.log(error);


// setMessage(
// "Password update failed"
// );


// }


// };





// return(


// <div className="bg-white shadow rounded-2xl p-6">


// <h2 className="text-xl font-bold mb-4">

// 🔑 Change Password

// </h2>



// <form onSubmit={handleSubmit}>


// <input

// type="password"

// placeholder="Old Password"

// value={oldPassword}

// onChange={(e)=>setOldPassword(e.target.value)}

// className="border p-3 rounded-lg w-full mb-3"

// />





// <input

// type="password"

// placeholder="New Password"

// value={newPassword}

// onChange={(e)=>setNewPassword(e.target.value)}

// className="border p-3 rounded-lg w-full mb-3"

// />





// <button

// className="bg-green-700 text-white px-5 py-3 rounded-xl"

// >

// Update Password

// </button>



// </form>



// {

// message &&

// <p className="mt-4 text-green-700 font-semibold">

// {message}

// </p>

// }




// </div>


// )


// }


// export default ChangePassword;



import { useState } from "react";
import axios from "axios";


function ChangePassword(){


    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");




    const handleSubmit = async (e) => {


        e.preventDefault();


        setMessage("");

        setError("");



        if(!currentPassword || !newPassword || !confirmPassword){

            setError(
                "All fields are required"
            );

            return;

        }



        if(newPassword.length < 8){

            setError(
                "Password must be at least 8 characters"
            );

            return;

        }



        if(newPassword !== confirmPassword){

            setError(
                "New passwords do not match"
            );

            return;

        }




        try{


            const token = localStorage.getItem(
                "access"
            );



            const response = await axios.post(

                "http://127.0.0.1:8000/api/accounts/change-password/",


                {

                    current_password: currentPassword,

                    new_password: newPassword,

                    confirm_password: confirmPassword

                },


                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }


            );



            setMessage(
                response.data.message
            );



            setCurrentPassword("");

            setNewPassword("");

            setConfirmPassword("");



        }


        catch(error){


            console.log(
                error.response?.data
            );


            setError(

                error.response?.data?.error ||
                "Password update failed"

            );


        }



    };





    return(


        <div className="bg-white shadow rounded-2xl p-6">


            <h2 className="text-xl font-bold mb-5">

                🔑 Change Password

            </h2>




            <form onSubmit={handleSubmit}>



                <input

                    type="password"

                    placeholder="Current Password"

                    value={currentPassword}

                    onChange={
                        (e)=>setCurrentPassword(e.target.value)
                    }

                    className="border p-3 rounded-lg w-full mb-3"

                />





                <input

                    type="password"

                    placeholder="New Password"

                    value={newPassword}

                    onChange={
                        (e)=>setNewPassword(e.target.value)
                    }

                    className="border p-3 rounded-lg w-full mb-3"

                />





                <input

                    type="password"

                    placeholder="Confirm New Password"

                    value={confirmPassword}

                    onChange={
                        (e)=>setConfirmPassword(e.target.value)
                    }

                    className="border p-3 rounded-lg w-full mb-4"

                />





                <button

                    type="submit"

                    className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl"

                >

                    Update Password

                </button>



            </form>






            {
                message &&

                <p className="mt-4 text-green-700 font-semibold">

                    {message}

                </p>

            }





            {
                error &&

                <p className="mt-4 text-red-600 font-semibold">

                    {error}

                </p>

            }



        </div>


    )


}


export default ChangePassword;