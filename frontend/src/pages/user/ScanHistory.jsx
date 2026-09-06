import { useEffect, useState } from "react";
import axios from "axios";


function ScanHistory() {


    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);





    useEffect(() => {

        fetchHistory();

    }, []);







    const fetchHistory = async () => {


        try {


            const token = localStorage.getItem("access");



            const response = await axios.get(

                "http://127.0.0.1:8000/api/waste/history/",

                {
                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );



            setHistory(response.data);



        }

        catch(error) {


            console.log(
                "History Error",
                error
            );


        }

        finally {


            setLoading(false);


        }


    };








    const getColor = (type)=>{


        if(type === "Plastic")
            return "bg-blue-100 text-blue-700";


        if(type === "Organic")
            return "bg-green-100 text-green-700";


        if(type === "Metal")
            return "bg-gray-200 text-gray-700";


        return "bg-yellow-100 text-yellow-700";


    };








    if(loading){


        return (

            <div className="p-6">

                Loading History...

            </div>

        );

    }







    return (


        <div className="p-6">


            <div className="bg-white rounded-2xl shadow-lg p-8">


                <h1 className="text-3xl font-bold text-green-700 mb-6">

                    📜 Scan History

                </h1>






                {
                    history.length === 0 ?


                    <p className="text-gray-500">

                        No scans available.

                    </p>


                    :



                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">



                        {
                            history.map((scan)=>(



                                <div

                                key={scan.id}

                                className="border rounded-xl p-5 shadow hover:shadow-lg transition"

                                >



                                    <img

                                    src={scan.image}

                                    alt="waste"

                                    className="w-full h-48 object-cover rounded-xl"

                                    />






                                    <div className="flex justify-between items-center mt-4">



                                        <h2 className="text-xl font-bold">

                                            ♻️ {scan.waste_type}

                                        </h2>





                                        <span

                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getColor(scan.waste_type)}`}

                                        >

                                            {scan.confidence_score}%

                                        </span>



                                    </div>








                                    <div className="mt-3">


                                        <p className="text-gray-600">

                                            <b>Recommendation:</b>

                                        </p>


                                        <p className="text-gray-500">

                                            {scan.recommendation}

                                        </p>



                                    </div>








                                    <p className="text-sm text-gray-400 mt-4">


                                        📅

                                        {
                                            new Date(scan.created_at)
                                            .toLocaleString()
                                        }


                                    </p>




                                </div>



                            ))
                        }



                    </div>


                }



            </div>


        </div>


    );


}



export default ScanHistory;