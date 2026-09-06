import { useEffect, useState } from "react";
import axios from "axios";
import StaffSidebar from "../../components/StaffSidebar";
import { Save, Camera } from "lucide-react";


function StaffProfile() {


    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState(null);



    const [formData, setFormData] = useState({

        first_name: "",
        last_name: "",
        phone: "",
        address: ""

    });





    const getProfile = async () => {


        try {


            const token = localStorage.getItem("access");


            const res = await axios.get(

                "http://127.0.0.1:8000/api/accounts/profile/",

                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

            );


            setProfile(res.data);


            setFormData({

                first_name: res.data.first_name || "",

                last_name: res.data.last_name || "",

                phone: res.data.phone || "",

                address: res.data.address || ""

            });


        }

        catch(error){

            console.log(error);

        }

        finally{

            setLoading(false);

        }


    };






    useEffect(()=>{

        getProfile();

    },[]);








    const handleChange=(e)=>{


        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });


    };








    const handleImageChange=(e)=>{


        const file=e.target.files[0];


        if(file){

            setImage(file);

            setPreview(
                URL.createObjectURL(file)
            );

        }


    };








    const handleSave=async()=>{


        try{


            const token=localStorage.getItem("access");


            const data=new FormData();



            data.append(
                "first_name",
                formData.first_name
            );


            data.append(
                "last_name",
                formData.last_name
            );


            data.append(
                "phone",
                formData.phone
            );


            data.append(
                "address",
                formData.address
            );



            if(image){

                data.append(
                    "profile_image",
                    image
                );

            }




            await axios.patch(

                "http://127.0.0.1:8000/api/accounts/profile/",

                data,

                {
                    headers:{

                        Authorization:`Bearer ${token}`,

                        "Content-Type":"multipart/form-data"

                    }

                }

            );



            alert("Profile Updated Successfully");


            setImage(null);

            setPreview(null);


            getProfile();



        }

        catch(error){

            console.log(error);

        }


    };









    if(loading){

        return(

            <div className="flex">

                <StaffSidebar/>

                <div className="ml-64 p-6">

                    Loading...

                </div>

            </div>

        );

    }









    return(


        <div className="flex">


            <StaffSidebar/>




            <main className="ml-64 w-full p-6">



                <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl">





                    <h1 className="text-2xl font-bold">

                        My Profile

                    </h1>


                    <p className="text-gray-500 mb-6">

                        Manage your personal information

                    </p>







                    {/* PROFILE IMAGE */}


                    <div className="flex items-center gap-5 mb-8">


                        <div className="relative">


                            <img

                            src={

                                preview

                                ?

                                preview

                                :

                                profile?.profile_image

                                ?

                                `http://127.0.0.1:8000${profile.profile_image}`

                                :

                                `https://ui-avatars.com/api/?name=${profile?.username}`

                            }

                            className="w-24 h-24 rounded-full object-cover border"

                            />





                            <label

                            className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer"

                            >

                                <Camera size={16}/>


                                <input

                                type="file"

                                accept="image/*"

                                className="hidden"

                                onChange={handleImageChange}

                                />


                            </label>



                        </div>






                        <div>

                            <h2 className="text-xl font-bold">

                                {profile?.first_name} {profile?.last_name}

                            </h2>


                            <p className="text-gray-500">

                                Cleaning Staff

                            </p>

                        </div>


                    </div>









                    <h2 className="text-xl font-bold mb-1">

                        Staff Account

                    </h2>









                    <h2 className="text-xl font-bold mt-6">

                        Personal Information

                    </h2>


                    <p className="text-gray-500 mb-5">

                        Update your account details

                    </p>








                    <div className="space-y-4">





                        <input

                        value={profile?.username || ""}

                        disabled

                        placeholder="Username"

                        className="w-full border p-3 rounded-xl bg-gray-100"

                        />








                        <input

                        name="first_name"

                        value={formData.first_name}

                        onChange={handleChange}

                        placeholder="First Name"

                        className="w-full border p-3 rounded-xl"

                        />








                        <input

                        name="last_name"

                        value={formData.last_name}

                        onChange={handleChange}

                        placeholder="Last Name"

                        className="w-full border p-3 rounded-xl"

                        />








                        <input

                        value={profile?.email || ""}

                        disabled

                        placeholder="Email"

                        className="w-full border p-3 rounded-xl bg-gray-100"

                        />








                        <input

                        name="phone"

                        value={formData.phone}

                        onChange={handleChange}

                        placeholder="Phone"

                        className="w-full border p-3 rounded-xl"

                        />








                        <textarea

                        name="address"

                        value={formData.address}

                        onChange={handleChange}

                        placeholder="Address"

                        className="w-full border p-3 rounded-xl"

                        />








                        <button

                        onClick={handleSave}

                        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl"

                        >

                            <Save size={18}/>

                            Save Changes


                        </button>





                    </div>





                </div>



            </main>



        </div>


    );


}



export default StaffProfile;