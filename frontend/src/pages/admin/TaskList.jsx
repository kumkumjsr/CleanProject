import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


function TaskList(){


const [tasks,setTasks] = useState([]);

const navigate = useNavigate();



const fetchTasks = async()=>{


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

fetchTasks();

},[]);






const deleteTask = async(id)=>{


const confirmDelete = window.confirm(
"Are you sure you want to delete this task?"
);


if(!confirmDelete)
return;



try{


await axios.delete(

`http://127.0.0.1:8000/api/tasks/admin/${id}/delete/`,

{

headers:{

Authorization:
`Bearer ${localStorage.getItem("access")}`

}

}

);



fetchTasks();


}

catch(error){

console.log(error);

}


}






const statusStyle=(status)=>{


if(status==="COMPLETED")
return "bg-green-600";


if(status==="IN_PROGRESS")
return "bg-blue-600";


return "bg-yellow-500";


}







return(


<div className="p-6">


<h1 className="text-3xl font-bold mb-6">

All Assigned Tasks

</h1>





{

tasks.length===0 ?


<p className="text-gray-500">

No Tasks Available

</p>



:


<div className="grid gap-6">



{

tasks.map(task=>(


<div

key={task.id}

className="bg-white shadow-lg rounded-xl p-6"

>




<div className="flex justify-between items-start">


<h2 className="text-xl font-bold">

{task.title}

</h2>




<span

className={`px-3 py-1 rounded-full text-white text-sm ${statusStyle(task.status)}`}

>

{task.status}

</span>



</div>






<p className="text-gray-600 mt-3">

{task.description}

</p>






<p className="mt-3">

📍

<b> Location:</b>

{task.location}

</p>






<p className="mt-2">

👷


<b> Assigned To:</b>


<span className="ml-2">

{

task.assigned_staff

?

task.assigned_staff.username

:

"Not Assigned"

}


</span>


</p>







<p className="mt-2">

📅

<b> Created:</b>

{

new Date(task.created_at)
.toLocaleString()

}


</p>







{

task.after_image &&


<div className="mt-4">


<p className="font-bold">

After Cleaning Image

</p>


<img

src={task.after_image}

className="w-52 rounded-lg mt-2"

/>


</div>


}







{

task.completion_note &&


<div className="mt-4 bg-gray-100 p-3 rounded">


📝

<b> Completion Note:</b>

<br/>

{task.completion_note}


</div>


}







<div className="flex gap-3 mt-5">



<button

onClick={()=>navigate(`/admin/tasks/${task.id}`)}

className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg"

>

<Eye size={18}/>

View

</button>






<button

onClick={()=>navigate(`/admin/tasks/edit/${task.id}`)}

className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"

>

<Edit size={18}/>

Edit

</button>







<button

onClick={()=>deleteTask(task.id)}

className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg"

>

<Trash2 size={18}/>

Delete

</button>




</div>







</div>


))


}



</div>



}



</div>


)


}



export default TaskList;