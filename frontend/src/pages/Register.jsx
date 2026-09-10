// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../services/authService";

// function Register() {
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     username: "",
//     email: "",
//     phone: "",
//     address: "",
//     password: "",
//     confirm_password: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Password validation
//     if (formData.password !== formData.confirm_password) {
//       alert("Passwords do not match.");
//       return;
//     }

//     if (formData.password.length < 6) {
//       alert("Password must be at least 6 characters.");
//       return;
//     }

//     // Data for backend
//     const dataToSend = {
//       first_name: formData.first_name.trim(),
//       last_name: formData.last_name.trim(),
//       username: formData.username.trim(),
//       email: formData.email.trim(),
//       phone: formData.phone.trim(),
//       address: formData.address.trim(),
//       password: formData.password,
//     };

//     // Open Login page immediately
//     navigate("/login", { replace: true });

//     // Create account in background
//     registerUser(dataToSend)
//       .then((response) => {
//         console.log("Account created successfully:", response);
//       })
//       .catch((error) => {
//         console.error("Registration Error:", error);
//       });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center p-6">

//       <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8">

//         {/* Header */}
//         <div className="text-center mb-8">

//           <h1 className="text-4xl font-bold text-green-700">
//             🌱 EcoSmart
//           </h1>

//           <p className="text-gray-500 mt-2">
//             Create your EcoSmart Account
//           </p>

//         </div>

//         {/* Registration Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-5"
//         >

//           {/* First Name */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               First Name
//             </label>

//             <input
//               type="text"
//               name="first_name"
//               value={formData.first_name}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3"
//               placeholder="Enter First Name"
//               required
//             />
//           </div>

//           {/* Last Name */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Last Name
//             </label>

//             <input
//               type="text"
//               name="last_name"
//               value={formData.last_name}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3"
//               placeholder="Enter Last Name"
//             />
//           </div>

//           {/* Username */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Username
//             </label>

//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3"
//               placeholder="Enter Username"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3"
//               placeholder="Enter Email"
//               required
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Phone
//             </label>

//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3"
//               placeholder="Enter Phone"
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Address
//             </label>

//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3"
//               placeholder="Enter Address"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Password
//             </label>

//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3"
//               placeholder="Enter Password"
//               required
//             />
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Confirm Password
//             </label>

//             <input
//               type={showPassword ? "text" : "password"}
//               name="confirm_password"
//               value={formData.confirm_password}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3"
//               placeholder="Confirm Password"
//               required
//             />
//           </div>

//           {/* Show Password */}
//           <div className="md:col-span-2">

//             <label className="flex items-center gap-2 cursor-pointer">

//               <input
//                 type="checkbox"
//                 checked={showPassword}
//                 onChange={() =>
//                   setShowPassword((prev) => !prev)
//                 }
//               />

//               Show Password

//             </label>

//           </div>

//           {/* Create Account Button */}
//           <div className="md:col-span-2">

//             <button
//               type="submit"
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300"
//             >
//               Create Account
//             </button>

//           </div>

//           {/* Login */}
//           <div className="md:col-span-2 text-center mt-2">

//             <p className="text-gray-600">

//               Already have an account?{" "}

//               <Link
//                 to="/login"
//                 className="text-green-700 font-semibold hover:underline"
//               >
//                 Login
//               </Link>

//             </p>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// }

// export default Register;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const dataToSend = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      password: formData.password,
      confirm_password: formData.confirm_password,
    };

    /*
      Registration background mein chalegi.
      User ko wait nahi karna padega.
    */
    registerUser(dataToSend)
      .then((response) => {
        console.log("Registration Response:", response);
      })
      .catch((error) => {
        console.error("Registration Error:", error);

        if (error.response) {
          console.error(
            "Backend Response:",
            error.response.data
          );
        }
      });

    /*
      Immediately Login page par jao.
    */
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join EcoSmart and help keep your city clean 🌱
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* First Name + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>

              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows="3"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                minLength={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-20 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-green-600 font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                minLength={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-20 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-green-600 font-medium"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>

            </div>
          </div>

          {/* CREATE ACCOUNT */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Create Account
          </button>

        </form>

        {/* Login Link */}
        <div className="text-center mt-6">

          <p className="text-gray-600">
            Already have an account?{" "}

            <Link
              to="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;