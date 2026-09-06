import { useEffect, useState } from "react";
import axios from "axios";


function Tasks(){


    const [tasks,setTasks] = useState([]);



    const getTasks = async()=>{

        try{


            const response = await axios.get(

                "http://127.0.0.1:8000/api/tasks/admin/",

                {

                    headers:{

                        Authorization:
                        `Bearer ${localStorage.getItem("access")}`

                    }

                }

            );


            setTasks(response.data);


        }

        catch(error){

            console.log(error);

        }


    }




    useEffect(()=>{

        getTasks();

    },[]);





    const statusColor = (status)=>{


        if(status==="COMPLETED")
            return "bg-green-600";


        if(status==="IN_PROGRESS")
            return "bg-blue-600";


        return "bg-yellow-500";


    }







    return(


        <div className="p-6">


            <h1 className="text-3xl font-bold mb-6">

                All Tasks

            </h1>





            <div className="grid gap-5">


            {

                tasks.map((task)=>(


                    <div

                    key={task.id}

                    className="bg-white shadow-lg rounded-xl p-6"


                    >




                    <div className="flex justify-between items-start">


                    <h2 className="text-xl font-bold">

                        {task.title}

                    </h2>




                    <span

                    className={`text-white px-3 py-1 rounded-full text-sm ${statusColor(task.status)}`}

                    >

                        {task.status}

                    </span>


                    </div>





                    <p className="text-gray-600 mt-3">

                        {task.description}

                    </p>





                    <div className="mt-4 space-y-2">


                    <p>

                    📍 
                    <b>Location:</b>

                    {task.location}

                    </p>





                    <p>

                    👷
                    <b> Assigned To:</b>


                    {

                    task.assigned_staff

                    ?

                    task.assigned_staff.username

                    :

                    "Not Assigned"

                    }


                    </p>






                    <p>

                    📅
                    <b>Created:</b>

                    {
                    new Date(task.created_at)
                    .toLocaleDateString()
                    }

                    </p>





                    </div>







                    {

                    task.after_image &&


                    <div className="mt-4">


                    <p className="font-bold">

                    After Cleaning Image

                    </p>



                    <img

                    src={task.after_image}

                    className="w-48 rounded-lg mt-2"

                    />


                    </div>


                    }







                    {

                    task.completion_note &&


                    <div className="mt-4 bg-gray-100 p-3 rounded">


                    📝

                    <b> Note:</b>

                    {task.completion_note}


                    </div>


                    }







                    </div>



                ))

            }


            </div>



        </div>


    )


}



export default Tasks;