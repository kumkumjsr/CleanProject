import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";


function StaffList() {

  const [staff, setStaff] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {

    fetchStaff();

  }, []);



  const fetchStaff = async () => {

    try {

      const token = localStorage.getItem("access");


      const response = await axios.get(

        "http://127.0.0.1:8000/api/accounts/staff/",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );


      setStaff(response.data);


    } catch(error) {

      console.log(error);

    }

  };




  const deleteStaff = async (id) => {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete staff?"
    );


    if(!confirmDelete)
      return;



    try {


      const token = localStorage.getItem("access");



      await axios.delete(

        `http://127.0.0.1:8000/api/accounts/staff/${id}/delete/`,

        {

          headers:{
            Authorization:`Bearer ${token}`
          }

        }

      );



      alert("Staff Deleted Successfully");


      fetchStaff();



    } catch(error){

      console.log(error);

      alert("Delete Failed");

    }


  };





  return (

    <DashboardLayout>


      <div className="bg-white shadow-xl rounded-2xl p-6">


        <h2 className="text-3xl font-bold text-green-700 mb-6">
          👷 Staff List
        </h2>



        <table className="w-full border">


          <thead className="bg-green-600 text-white">

            <tr>

              <th className="p-3">
                Name
              </th>


              <th className="p-3">
                Username
              </th>


              <th className="p-3">
                Email
              </th>


              <th className="p-3">
                Phone
              </th>


              <th className="p-3">
                Role
              </th>


              <th className="p-3">
                Action
              </th>


            </tr>


          </thead>



          <tbody>


          {
            staff.map((item)=>(


              <tr
                key={item.id}
                className="border-b hover:bg-gray-100"
              >


                <td className="p-3">

                  {item.first_name} {item.last_name}

                </td>


                <td className="p-3">

                  {item.username}

                </td>


                <td className="p-3">

                  {item.email}

                </td>


                <td className="p-3">

                  {item.phone}

                </td>



                <td className="p-3">

                  {item.role}

                </td>



                <td className="p-3 space-x-2">


                  <button

                    onClick={()=>navigate(`/edit-staff/${item.id}`)}

                    className="bg-blue-600 text-white px-3 py-2 rounded"

                  >

                    Edit

                  </button>



                  <button

                    onClick={()=>deleteStaff(item.id)}

                    className="bg-red-600 text-white px-3 py-2 rounded"

                  >

                    Delete

                  </button>


                </td>



              </tr>


            ))
          }


          </tbody>


        </table>


      </div>


    </DashboardLayout>


  );

}


export default StaffList;