import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";


function UserList() {


  const [users, setUsers] = useState([]);

  const navigate = useNavigate();



  useEffect(() => {

    fetchUsers();

  }, []);





  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("access");


      const response = await axios.get(

        "http://127.0.0.1:8000/api/accounts/users/",

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );


      setUsers(response.data);



    } catch (error) {

      console.log(error);

    }

  };







  const deleteUser = async (id) => {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );


    if (!confirmDelete) return;



    try {


      const token = localStorage.getItem("access");



      await axios.delete(

        `http://127.0.0.1:8000/api/accounts/users/${id}/delete/`,

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );



      alert("User deleted successfully");



      fetchUsers();



    } catch (error) {


      console.log(error);


      alert("Delete failed");


    }


  };







  return (


    <DashboardLayout>


      <div className="bg-white shadow-xl rounded-2xl p-6">


        <h2 className="text-3xl font-bold text-green-700 mb-6">

          👥 User List

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

            users.map((user)=>(


              <tr

              key={user.id}

              className="border-b hover:bg-gray-100"

              >




                <td className="p-3">

                  {user.first_name} {user.last_name}

                </td>





                <td className="p-3">

                  {user.username}

                </td>





                <td className="p-3">

                  {user.email}

                </td>





                <td className="p-3">

                  {user.phone}

                </td>





                <td className="p-3">

                  {user.role || "CITIZEN"}

                </td>





                <td className="p-3 flex gap-2">



                  <button

                  onClick={() =>
                    navigate(`/edit-user/${user.id}`)
                  }

                  className="bg-blue-600 text-white px-3 py-1 rounded"

                  >

                    Edit

                  </button>






                  <button

                  onClick={() =>
                    deleteUser(user.id)
                  }

                  className="bg-red-600 text-white px-3 py-1 rounded"

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


export default UserList;