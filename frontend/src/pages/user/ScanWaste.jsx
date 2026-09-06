import { useState } from "react";
import axios from "axios";


function ScanWaste(){


    const [image,setImage] = useState(null);

    const [preview,setPreview] = useState(null);

    const [loading,setLoading] = useState(false);

    const [result,setResult] = useState(null);





    // Image Select

    const handleImage = (e)=>{


        const file = e.target.files[0];


        if(file){


            setImage(file);


            setPreview(
                URL.createObjectURL(file)
            );


        }


    };








    // Points Logic

    const calculatePoints = (waste)=>{


        const points = {


            "Organic":15,


            "Plastic":10,


            "Metal":20,


            "Paper":10,


            "E-Waste":25



        };



        return points[waste] || 5;



    };









    // Submit Scan


    const handleSubmit = async(e)=>{


        e.preventDefault();



        if(!image){


            alert("Please select waste image");


            return;


        }





        try{


            setLoading(true);



            const token = localStorage.getItem("access");



            const formData = new FormData();



            formData.append(
                "image",
                image
            );







            const response = await axios.post(


                "http://127.0.0.1:8000/api/waste/scan/",


                formData,


                {


                    headers:{


                        Authorization:
                        `Bearer ${token}`,


                        "Content-Type":
                        "multipart/form-data"


                    }



                }


            );





            setResult(response.data);





        }



        catch(error){


            console.log(
                "Scan Error",
                error
            );


            alert(
                "Waste Scan Failed"
            );



        }



        finally{


            setLoading(false);


        }




    };









return(


<div className="p-6">





<h1 className="text-3xl font-bold text-green-700 mb-6">


♻️ AI Waste Scanner


</h1>









<div className="bg-white shadow-xl rounded-2xl p-6 max-w-xl">





<form onSubmit={handleSubmit}>





<input


type="file"


accept="image/*"


onChange={handleImage}


className="border p-3 rounded-xl w-full"



/>









{

preview &&


<img


src={preview}


alt="preview"


className="mt-5 rounded-xl w-full h-64 object-cover shadow"



/>


}









<button


type="submit"


disabled={loading}


className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-xl"



>



{

loading ?

"🤖 AI Analysing..."

:

"Scan Waste"


}



</button>






</form>





</div>













{

result &&



<div className="bg-green-50 shadow-xl rounded-2xl p-6 mt-8 max-w-xl">





<h2 className="text-2xl font-bold text-green-700">


🎯 Prediction Result


</h2>








<div className="mt-5 space-y-4">





<div className="bg-white p-4 rounded-xl">


<p className="text-gray-500">

Waste Type

</p>


<h3 className="text-xl font-bold">

{result.waste_type}


</h3>


</div>









<div className="bg-white p-4 rounded-xl">


<p className="text-gray-500">

AI Confidence

</p>


<h3 className="text-xl font-bold">


{result.confidence_score}%


</h3>


</div>









<div className="bg-white p-4 rounded-xl">


<p className="text-gray-500">


Recommendation


</p>


<p className="font-medium">


{result.recommendation}


</p>


</div>









<div className="bg-green-700 text-white rounded-xl p-5 text-center">


<p className="text-lg">

🌱 Eco Points Earned

</p>



<h1 className="text-4xl font-bold mt-2">


+{calculatePoints(result.waste_type)}


</h1>


<p>

Keep saving Earth 🌍

</p>


</div>






</div>







</div>



}








</div>



)



}



export default ScanWaste;