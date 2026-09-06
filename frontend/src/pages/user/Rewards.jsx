import { useEffect, useState } from "react";
import axios from "axios";


function Rewards(){


    const [data,setData] = useState(null);

    const [loading,setLoading] = useState(true);





    useEffect(()=>{


        fetchRewards();


    },[]);






    const fetchRewards = async()=>{


        try{


            const token = localStorage.getItem("access");



            const response = await axios.get(


                "http://127.0.0.1:8000/api/accounts/rewards/",


                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }


            );



            setData(response.data);



        }


        catch(error){


            console.log(
                "Reward Error",
                error
            );


        }


        finally{


            setLoading(false);


        }


    };







    if(loading){


        return (

            <div className="p-6">

                Loading Rewards...

            </div>

        );


    }








return(


<div className="p-6">





<h1 className="text-3xl font-bold text-green-700 mb-6">

🏆 Eco Rewards

</h1>







{/* Top Cards */}


<div className="grid grid-cols-1 md:grid-cols-3 gap-6">





<div className="bg-white shadow-xl rounded-2xl p-6">


<p className="text-gray-500">

Eco Points

</p>


<h2 className="text-4xl font-bold text-green-700 mt-2">

🌱 {data.eco_points}

</h2>


</div>









<div className="bg-white shadow-xl rounded-2xl p-6">


<p className="text-gray-500">

Current Badge

</p>


<h2 className="text-2xl font-bold mt-2">

{data.badge}

</h2>


</div>









<div className="bg-white shadow-xl rounded-2xl p-6">


<p className="text-gray-500">

Total Scans

</p>


<h2 className="text-4xl font-bold mt-2">

♻️ {data.total_scans}

</h2>


</div>






</div>










{/* Progress */}


<div className="bg-white shadow-xl rounded-2xl p-6 mt-8">


<h2 className="text-xl font-bold mb-4">

Next Reward Progress

</h2>





<div className="w-full bg-gray-200 rounded-full h-4">


<div

className="bg-green-600 h-4 rounded-full"

style={{

width:`${data.progress}%`

}}


/>


</div>





<p className="mt-3 text-gray-600">


{data.progress}% completed


</p>





{
data.next_reward &&


<p className="mt-2 font-semibold">


Next:

{data.next_reward.name}


({data.next_reward.required_points} Points)


</p>


}





</div>









{/* Reward Cards */}



<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">





{

data.rewards.map((reward)=>(




<div

key={reward.id}

className={`rounded-2xl shadow-xl p-6 border-2

${

reward.unlocked

?

"bg-green-50 border-green-500"

:

"bg-gray-100 border-gray-300"

}

`}

>





<div className="flex justify-between items-center">



<h2 className="text-xl font-bold">


{reward.name}


</h2>





<span className="text-2xl">


{

reward.unlocked

?

"🔓"

:

"🔒"

}


</span>



</div>







<p className="text-gray-600 mt-3">


{reward.description}


</p>







<div className="mt-4">


Required Points:


<b>


{reward.required_points}


</b>


</div>







<div

className={`mt-4 font-bold


${

reward.unlocked

?

"text-green-700"

:

"text-gray-500"

}

`}


>


{

reward.unlocked

?

"Unlocked 🎉"

:

"Locked"

}


</div>







</div>




))


}




</div>









</div>


)


}


export default Rewards;