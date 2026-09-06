import { useState } from "react";
import axios from "axios";


function ReportIssue() {


    const [title,setTitle] = useState("");

    const [description,setDescription] = useState("");

    const [location,setLocation] = useState("");

    const [image,setImage] = useState(null);


    const [message,setMessage] = useState("");

    const [error,setError] = useState("");




    const handleSubmit = async(e)=>{


        e.preventDefault();


        setMessage("");

        setError("");



        try{


            const token = localStorage.getItem(
                "access"
            );



            const formData = new FormData();


            formData.append(
                "title",
                title
            );


            formData.append(
                "description",
                description
            );


            formData.append(
                "location",
                location
            );



            if(image){

                formData.append(
                    "image",
                    image
                );

            }





            const response = await axios.post(


                "http://127.0.0.1:8000/api/complaints/create/",


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



            setMessage(
                "Issue reported successfully ✅"
            );


            setTitle("");

            setDescription("");

            setLocation("");

            setImage(null);



        }


        catch(error){


            console.log(
                error.response?.data
            );


            setError(
                "Failed to submit report"
            );


        }



    };





    return(


        <div className="bg-white rounded-2xl shadow-lg p-8">


            <h1 className="text-3xl font-bold text-red-600">

                🚨 Report Issue

            </h1>



            <p className="text-gray-500 mt-3">

                Report overflowing dustbins or illegal dumping here.

            </p>






            <form 
            onSubmit={handleSubmit}
            className="mt-8 space-y-4"
            >



                <input

                type="text"

                placeholder="Issue Title"

                value={title}

                onChange={
                    (e)=>setTitle(e.target.value)
                }

                className="w-full border rounded-xl p-3"

                />





                <textarea

                placeholder="Describe the issue"

                value={description}

                onChange={
                    (e)=>setDescription(e.target.value)
                }

                className="w-full border rounded-xl p-3 h-32"

                />





                <input

                type="text"

                placeholder="Location"

                value={location}

                onChange={
                    (e)=>setLocation(e.target.value)
                }

                className="w-full border rounded-xl p-3"

                />





                <input

                type="file"

                accept="image/*"

                onChange={
                    (e)=>setImage(e.target.files[0])
                }

                className="w-full"

                />





                <button

                type="submit"

                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"

                >

                    Submit Report

                </button>



            </form>





            {
                message &&

                <p className="mt-4 text-green-600 font-semibold">

                    {message}

                </p>

            }





            {
                error &&

                <p className="mt-4 text-red-600 font-semibold">

                    {error}

                </p>

            }



        </div>


    )


}


export default ReportIssue;