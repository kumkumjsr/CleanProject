import { useEffect, useState } from "react";
import axios from "axios";
import {
    Bell,
    Check,
    Trash2
} from "lucide-react";


function Notifications(){


const [notifications,setNotifications] = useState([]);



const token = localStorage.getItem("access");


const headers = {

    Authorization:
    `Bearer ${token}`

};





const fetchNotifications = async()=>{


try{


const response = await axios.get(

"http://127.0.0.1:8000/api/notifications/",

{
    headers
}

);


setNotifications(response.data);



}

catch(error){

console.log(error);

}


};






useEffect(()=>{


fetchNotifications();


},[]);







const markRead = async(id)=>{


try{


await axios.patch(

`http://127.0.0.1:8000/api/notifications/${id}/read/`,

{},

{
    headers
}

);


fetchNotifications();


}

catch(error){

console.log(error);

}


};








const markAllRead = async()=>{


try{


await axios.patch(

"http://127.0.0.1:8000/api/notifications/read-all/",

{},

{
    headers
}

);


fetchNotifications();


}

catch(error){

console.log(error);

}


};









const deleteNotification = async(id)=>{


try{


await axios.delete(

`http://127.0.0.1:8000/api/notifications/${id}/delete/`,

{
    headers
}

);


fetchNotifications();


}

catch(error){

console.log(error);

}


};









return(


<div className="p-6">


<div className="flex justify-between items-center mb-6">


<h1 className="text-3xl font-bold flex items-center gap-2">


<Bell/>

Notifications


</h1>



<button

onClick={markAllRead}

className="bg-green-600 text-white px-5 py-2 rounded-lg"

>

Mark All Read

</button>



</div>







{

notifications.length===0 ?


<p className="text-gray-500">

No Notifications

</p>



:

notifications.map((item)=>(



<div

key={item.id}

className={`p-5 mb-4 rounded-xl shadow bg-white border-l-4

${

item.is_read

?

"border-gray-400"

:

"border-green-600"

}

`}

>



<div className="flex justify-between">


<div>


<h2 className="text-xl font-bold">

{item.title}

</h2>



<p className="mt-2 text-gray-600">

{item.message}

</p>



<p className="text-sm text-gray-500 mt-2">

{item.notification_type}

&nbsp; |

&nbsp;

{
new Date(item.created_at)
.toLocaleString()
}


</p>


</div>





<div className="flex gap-2">



{

!item.is_read &&

<button

onClick={()=>markRead(item.id)}

className="bg-blue-600 text-white p-2 rounded"

>

<Check size={18}/>

</button>

}





<button

onClick={()=>deleteNotification(item.id)}

className="bg-red-600 text-white p-2 rounded"

>

<Trash2 size={18}/>

</button>




</div>



</div>



</div>



))


}



</div>


)


}


export default Notifications;