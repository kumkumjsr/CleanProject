import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


function EditTask(){


    const {id} = useParams();

    const navigate = useNavigate();



    const [task,setTask] = useState({

        title:"",
        description:"",
        location:"",
        status:"PENDING"

    });




    const getTask = async()=>{


        try{


            const response = await axios.get(

                `http://127.0.0.1:8000/api/tasks/admin/${id}/`,

                {

                    headers:{

                        Authorization:
                        `Bearer ${localStorage.getItem("access")}`

                    }

                }

            );


            setTask(response.data);


        }

        catch(error){

            console.log(
                "Get Task Error",
                error
            );

        }


    };






    useEffect(()=>{


        getTask();


    },[]);







    const handleChange=(e)=>{


        setTask({

            ...task,

            [e.target.name]:e.target.value

        });


    };









    // const updateTask = async(e)=>{


    //     e.preventDefault();



    //     try{


    //         await axios.patch(

    //             `http://127.0.0.1:8000/api/tasks/${id}/status/`,

    //             {

    //                 status:task.status

    //             },

    //             {

    //                 headers:{

    //                     Authorization:
    //                     `Bearer ${localStorage.getItem("access")}`

    //                 }

    //             }

    //         );



    //         alert(
    //             "Task Updated Successfully"
    //         );



    //         navigate("/admin/tasks");



    //     }

    //     catch(error){


    //         console.log(
    //             "Update Error",
    //             error
    //         );


    //     }


    // };

    const updateTask = async (e) => {

    e.preventDefault();

    try {

        await axios.put(

            `http://127.0.0.1:8000/api/tasks/admin/${id}/update/`,

            {

                title: task.title,
                description: task.description,
                location: task.location,
                status: task.status,
                assigned_to: task.assigned_to

            },

            {

                headers: {

                    Authorization: `Bearer ${localStorage.getItem("access")}`

                }

            }

        );

        alert("Task Updated Successfully");

        navigate("/admin/tasks");

    }

    catch (error) {

        console.log(error.response?.data);

    }

};






return(


<div className="p-6">



<h1 className="text-3xl font-bold mb-6">

Edit Task

</h1>






<form

onSubmit={updateTask}

className="bg-white shadow-xl rounded-xl p-6 space-y-5"

>



<div>


<label className="font-semibold">

Task Title

</label>


<input

type="text"

name="title"

value={task.title}

onChange={handleChange}

className="border w-full p-3 rounded mt-2"

/>


</div>







<div>


<label className="font-semibold">

Description

</label>


<textarea

name="description"

value={task.description}

onChange={handleChange}

className="border w-full p-3 rounded mt-2"

rows="4"

/>


</div>







<div>


<label className="font-semibold">

Location

</label>


<input

type="text"

name="location"

value={task.location}

onChange={handleChange}

className="border w-full p-3 rounded mt-2"

/>


</div>








<div>


<label className="font-semibold">

Status

</label>



<select

name="status"

value={task.status}

onChange={handleChange}

className="border w-full p-3 rounded mt-2"

>



<option value="PENDING">

PENDING

</option>



<option value="IN_PROGRESS">

IN_PROGRESS

</option>



<option value="COMPLETED">

COMPLETED

</option>



</select>


</div>









<button

type="submit"

className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"

>


Update Task


</button>





</form>





</div>


)


}


export default EditTask;