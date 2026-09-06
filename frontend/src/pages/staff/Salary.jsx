import { useEffect, useState } from "react";
import axios from "axios";
import StaffLayout from "../../layouts/StaffLayout";


function Salary() {


    const [salary,setSalary] = useState([]);

    const [loading,setLoading] = useState(true);



    const getSalary = async()=>{


        try{


            const token = localStorage.getItem("access");


            const res = await axios.get(

                "http://127.0.0.1:8000/api/accounts/staff/salary/",

                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

            );


            console.log("SALARY DATA:",res.data);


            setSalary(res.data);


        }
        catch(error){

            console.log(
                "Salary Error:",
                error
            );

        }
        finally{

            setLoading(false);

        }


    };





    useEffect(()=>{

        getSalary();

    },[]);





    if(loading){

        return(

            <StaffLayout>

                <div className="p-6">
                    Loading salary...
                </div>

            </StaffLayout>

        );

    }





    const currentSalary = salary.length
        ? salary[0]
        : null;





    return(


        <StaffLayout>


            <div>


                <div className="mb-8">


                    <h1 className="text-3xl font-bold text-gray-800">

                        💰 My Salary

                    </h1>


                    <p className="text-gray-500 mt-2">

                        View your salary and payment information.

                    </p>


                </div>







                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">



                    <div className="bg-white rounded-2xl shadow-sm border p-6">


                        <p className="text-sm text-gray-500">
                            Current Salary
                        </p>


                        <h2 className="text-3xl font-bold text-green-700 mt-2">

                            ₹
                            {
                                currentSalary
                                ?
                                currentSalary.net_salary
                                :
                                "0"
                            }

                        </h2>


                    </div>







                    <div className="bg-white rounded-2xl shadow-sm border p-6">


                        <p className="text-sm text-gray-500">
                            Payment Status
                        </p>


                        <h2 className={

                            currentSalary?.payment_status==="PAID"

                            ?

                            "text-xl font-bold text-green-600 mt-3"

                            :

                            "text-xl font-bold text-yellow-600 mt-3"

                        }>


                            {
                                currentSalary
                                ?
                                currentSalary.payment_status
                                :
                                "Pending"
                            }


                        </h2>


                    </div>








                    <div className="bg-white rounded-2xl shadow-sm border p-6">


                        <p className="text-sm text-gray-500">
                            Payment Date
                        </p>


                        <h2 className="text-xl font-bold text-gray-800 mt-3">


                            {
                                currentSalary?.payment_date
                                ||
                                "Not Available"
                            }


                        </h2>


                    </div>



                </div>








                <div className="mt-8 bg-white rounded-2xl shadow-sm border p-6">


                    <h2 className="text-xl font-bold">

                        Salary History

                    </h2>





                    {
                        salary.length===0

                        ?

                        <p className="mt-6 text-gray-400 text-center">

                            No salary records available.

                        </p>


                        :


                        <div className="mt-6 space-y-4">


                            {
                                salary.map((item)=>(


                                    <div
                                    key={item.id}
                                    className="border rounded-xl p-4 flex justify-between"
                                    >


                                        <div>


                                            <h3 className="font-bold">

                                                {item.month} {item.year}

                                            </h3>


                                            <p className="text-gray-500">

                                                Net Salary: ₹{item.net_salary}

                                            </p>


                                        </div>




                                        <div>


                                            <span className="font-semibold">

                                                {item.payment_status}

                                            </span>


                                        </div>



                                    </div>


                                ))

                            }


                        </div>


                    }


                </div>



            </div>



        </StaffLayout>


    );


}


export default Salary;