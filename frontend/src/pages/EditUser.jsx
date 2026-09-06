import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";


function EditUser() {


  const { id } = useParams();

  const navigate = useNavigate();



  const [user, setUser] = useState({

    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: ""

  });





  useEffect(() => {

    fetchUser();

  }, []);






  const fetchUser = async () => {


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



      const selectedUser = response.data.find(

        (item) => item.id === Number(id)

      );



      setUser(selectedUser);



    } catch (error) {


      console.log(error);


    }


  };







  const handleChange = (e) => {


    setUser({

      ...user,

      [e.target.name]: e.target.value

    });


  };







  const updateUser = async (e) => {


    e.preventDefault();



    try {


      const token = localStorage.getItem("access");



      await axios.put(


        `http://127.0.0.1:8000/api/accounts/users/${id}/update/`,


        user,


        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }


      );



      alert("User Updated Successfully");



      navigate("/users");




    } catch (error) {



      console.log(error.response?.data);


      alert("Update Failed");



    }



  };







  return (



    <DashboardLayout>



      <div className="bg-white shadow-xl rounded-2xl p-6">



        <h2 className="text-3xl font-bold text-green-700 mb-6">

          ✏ Edit User

        </h2>






        <form

          onSubmit={updateUser}

          className="space-y-4"

        >





          <input

            className="border p-3 w-full rounded"

            name="username"

            value={user?.username || ""}

            onChange={handleChange}

            placeholder="Username"

          />





          <input

            className="border p-3 w-full rounded"

            name="email"

            value={user?.email || ""}

            onChange={handleChange}

            placeholder="Email"

          />





          <input

            className="border p-3 w-full rounded"

            name="first_name"

            value={user?.first_name || ""}

            onChange={handleChange}

            placeholder="First Name"

          />





          <input

            className="border p-3 w-full rounded"

            name="last_name"

            value={user?.last_name || ""}

            onChange={handleChange}

            placeholder="Last Name"

          />





          <input

            className="border p-3 w-full rounded"

            name="phone"

            value={user?.phone || ""}

            onChange={handleChange}

            placeholder="Phone"

          />





          <input

            className="border p-3 w-full rounded"

            name="address"

            value={user?.address || ""}

            onChange={handleChange}

            placeholder="Address"

          />







          <div className="flex gap-4">



            <button

              type="submit"

              className="bg-green-600 text-white px-6 py-3 rounded"

            >

              Update User

            </button>





            <button

              type="button"

              onClick={() => navigate("/users")}

              className="bg-gray-600 text-white px-6 py-3 rounded"

            >

              Back

            </button>



          </div>






        </form>




      </div>





    </DashboardLayout>



  );

}



export default EditUser;