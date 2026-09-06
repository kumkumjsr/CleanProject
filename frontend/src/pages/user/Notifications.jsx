import { useEffect, useState } from "react";
import axios from "axios";


function Notifications() {


    const [history,setHistory] = useState([]);

    const [profile,setProfile] = useState(null);

    const [loading,setLoading] = useState(true);





    useEffect(()=>{

        fetchData();

    },[]);





    const fetchData = async()=>{


        try{


            const token = localStorage.getItem("access");



            const historyResponse = await axios.get(

                "http://127.0.0.1:8000/api/waste/history/",

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );



            setHistory(historyResponse.data);




            const profileResponse = await axios.get(

                "http://127.0.0.1:8000/api/accounts/profile/",

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );



            setProfile(profileResponse.data);



        }

        catch(error){

            console.log(
                "Notification Error",
                error
            );

        }


        finally{

            setLoading(false);

        }


    };





    if(loading){

        return(

            <div className="p-6">

                Loading Notifications...

            </div>

        )

    }






return(


<div className="p-6">



<h1 className="text-3xl font-bold mb-6">

🔔 Notifications

</h1>







{/* Scan Notifications */}



<div className="bg-white shadow rounded-xl p-6 mb-6">



<h2 className="text-xl font-bold mb-4">

♻️ Scan Activity

</h2>




{

history.length === 0 ?


<p className="text-gray-500">

No scan activity yet

</p>


:


history.map((scan)=>(


<div

key={scan.id}

className="border-b py-3 flex justify-between"

>



<div>


<p className="font-semibold">

✅ Waste Scan Successful

</p>


<p className="text-gray-600">

{scan.waste_type} detected by AI

</p>


</div>




<div className="text-right">


<p className="text-green-700 font-bold">

+10 Points

</p>


<p className="text-sm text-gray-400">

{
new Date(scan.created_at)
.toLocaleDateString()
}

</p>


</div>



</div>



))


}




</div>









{/* Reward Notification */}



<div className="bg-white shadow rounded-xl p-6 mb-6">


<h2 className="text-xl font-bold mb-4">

🏆 Reward Updates

</h2>




{

profile && profile.eco_points >= 100 ?



<div className="bg-green-50 p-4 rounded-lg">


🎉 Congratulations!


<p className="mt-2">

You unlocked your first reward!

</p>


</div>



:


<div className="bg-yellow-50 p-4 rounded-lg">


🔒 Keep scanning waste to unlock rewards


</div>



}



</div>









{/* Points History */}




<div className="bg-white shadow rounded-xl p-6">



<h2 className="text-xl font-bold mb-4">

🌱 Eco Points History

</h2>




{

history.length === 0 ?


<p className="text-gray-500">

No points earned yet

</p>



:


history.map((scan)=>(



<div

key={scan.id}

className="flex justify-between border-b py-3"

>


<div>


<p>

Waste Scan Reward

</p>


<p className="text-gray-500">

{scan.waste_type}

</p>


</div>




<p className="font-bold text-green-700">

+10 🌱

</p>



</div>



))


}



</div>







</div>


)


}


export default Notifications;