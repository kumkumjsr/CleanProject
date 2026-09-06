import { useState } from "react";
import axios from "axios";
import StaffLayout from "../../layouts/StaffLayout";
import { Save, Lock } from "lucide-react";


function StaffSettings(){

    const [passwordData,setPasswordData] = useState({

        current_password:"",
        new_password:"",
        confirm_password:""

    });


    const [loading,setLoading] = useState(false);



    const handleChange=(e)=>{

        setPasswordData({

            ...passwordData,

            [e.target.name]:e.target.value

        });

    };




    const updatePassword = async()=>{


        try{


            setLoading(true);


            const token = localStorage.getItem("access");



            const res = await axios.post(

                "http://127.0.0.1:8000/api/accounts/change-password/",

                passwordData,

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );



            alert(res.data.message);



            setPasswordData({

                current_password:"",
                new_password:"",
                confirm_password:""

            });



        }

        catch(error){


            console.log(error);


            alert(

                error.response?.data?.error ||

                "Password update failed"

            );


        }


        finally{

            setLoading(false);

        }


    };






    return(


        <StaffLayout>


            <div className="max-w-3xl">


                <h1 className="text-3xl font-bold text-gray-800">

                    ⚙️ Staff Settings

                </h1>


                <p className="text-gray-500 mt-2 mb-8">

                    Manage your account settings

                </p>






                {/* PASSWORD CARD */}


                <div className="bg-white rounded-2xl shadow-sm border p-6">


                    <div className="flex items-center gap-3 mb-6">


                        <div className="bg-green-100 p-3 rounded-xl">

                            <Lock
                                className="text-green-700"
                            />

                        </div>


                        <div>

                            <h2 className="text-xl font-bold">

                                Change Password

                            </h2>


                            <p className="text-gray-500 text-sm">

                                Update your account password

                            </p>

                        </div>


                    </div>







                    <div className="space-y-4">



                        <input

                        type="password"

                        name="current_password"

                        value={
                            passwordData.current_password
                        }

                        onChange={handleChange}

                        placeholder="Current Password"

                        className="w-full border p-3 rounded-xl"

                        />






                        <input

                        type="password"

                        name="new_password"

                        value={
                            passwordData.new_password
                        }

                        onChange={handleChange}

                        placeholder="New Password"

                        className="w-full border p-3 rounded-xl"

                        />







                        <input

                        type="password"

                        name="confirm_password"

                        value={
                            passwordData.confirm_password
                        }

                        onChange={handleChange}

                        placeholder="Confirm New Password"

                        className="w-full border p-3 rounded-xl"

                        />








                        <button

                        onClick={updatePassword}

                        disabled={loading}

                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"

                        >


                            <Save size={18}/>


                            {
                                loading
                                ?
                                "Updating..."
                                :
                                "Update Password"
                            }


                        </button>



                    </div>



                </div>






            </div>


        </StaffLayout>


    );

}


export default StaffSettings;
