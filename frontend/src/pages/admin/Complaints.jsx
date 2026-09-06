import { useEffect, useState } from "react";
import axios from "axios";


function Complaints() {


    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        fetchComplaints();

    }, []);





    const fetchComplaints = async () => {


        try {


            const token = localStorage.getItem("access");


            const response = await axios.get(

                "http://127.0.0.1:8000/api/complaints/admin/",

                {

                    headers: {

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );


            setComplaints(response.data);



        } catch(error) {


            console.log(
                "Complaint Error",
                error
            );


        } finally {


            setLoading(false);

        }

    };







    const updateStatus = async(id,status)=>{


        try{


            const token = localStorage.getItem("access");


            await axios.patch(

                `http://127.0.0.1:8000/api/complaints/admin/${id}/status/`,

                {
                    status:status
                },

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );



            alert(
                "Status Updated Successfully ✅"
            );


            fetchComplaints();



        }catch(error){


            console.log(
                error
            );


            alert(
                "Update Failed"
            );

        }


    };







    if(loading){


        return (

            <div className="p-6">

                <h2 className="text-xl font-bold">
                    Loading Complaints...
                </h2>

            </div>

        )

    }






    return (

        <div className="p-6">


            <h1 className="text-3xl font-bold mb-6">

                📢 User Complaints

            </h1>





            <div className="bg-white rounded-xl shadow p-6">



                {

                complaints.length === 0 ?


                (

                    <p className="text-gray-500">

                        No complaints found

                    </p>

                )


                :


                (

                <div className="space-y-6">


                {
                complaints.map((item)=>(


                    <div

                    key={item.id}

                    className="border rounded-xl p-5"

                    >



                        <div className="flex justify-between">


                            <h2 className="text-xl font-bold">

                                {item.title}

                            </h2>



                            <span className={

                                item.status==="RESOLVED"

                                ?

                                "bg-green-100 text-green-700 px-3 py-1 rounded-full"

                                :

                                item.status==="PROCESSING"

                                ?

                                "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"

                                :

                                "bg-red-100 text-red-700 px-3 py-1 rounded-full"

                            }>


                                {item.status}


                            </span>


                        </div>





                        <p className="mt-3 text-gray-700">

                            {item.description}

                        </p>




                        <p className="mt-2">

                            📍 {item.location}

                        </p>




                        <p className="mt-2 text-gray-500">

                            User ID :
                            {item.user}

                        </p>





                        {
                        item.image &&

                        <img

                            src={
                            `http://127.0.0.1:8000${item.image}`
                            }

                            className="mt-4 w-52 h-40 object-cover rounded-lg"

                            alt="complaint"

                        />

                        }







                        <div className="mt-5 flex gap-3">


                            <select

                            className="border rounded-lg px-3 py-2"

                            defaultValue={item.status}


                            onChange={(e)=>

                                updateStatus(

                                    item.id,

                                    e.target.value

                                )

                            }


                            >


                                <option value="PENDING">

                                    Pending

                                </option>


                                <option value="PROCESSING">

                                    Processing

                                </option>


                                <option value="RESOLVED">

                                    Resolved

                                </option>


                            </select>



                        </div>



                    </div>



                ))

                }


                </div>

                )

                }




            </div>


        </div>

    );

}



export default Complaints;