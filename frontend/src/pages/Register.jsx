import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // Don't send confirm_password to backend
      const dataToSend = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        password: formData.password,
      };

      await registerUser(dataToSend);

      // Account successfully created
      alert("Registration Successful! 🎉");

      // Go to login immediately
      navigate("/login", { replace: true });

    } catch (error) {
      console.error("Registration Error:", error);

      if (error.response) {
        console.error("Backend Response:", error.response.data);

        const backendError = error.response.data;

        if (typeof backendError === "object") {
          alert(
            Object.entries(backendError)
              .map(([key, value]) => `${key}: ${value}`)
              .join("\n")
          );
        } else {
          alert(String(backendError));
        }
      } else if (error.code === "ECONNABORTED") {
        alert(
          "Server response is taking too long. Please try Login once."
        );
      } else {
        alert(
          "Registration request failed. Please check your internet connection and try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-green-700">
            🌱 EcoSmart
          </h1>

          <p className="text-gray-500 mt-2">
            Create your EcoSmart Account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* First Name */}
          <div>
            <label className="block mb-2 font-semibold">
              First Name
            </label>

            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter First Name"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2 font-semibold">
              Last Name
            </label>

            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter Last Name"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block mb-2 font-semibold">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter Username"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter Email"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-semibold">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter Phone"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 font-semibold">
              Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter Address"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-semibold">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter Password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 font-semibold">
              Confirm Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Confirm Password"
              required
            />
          </div>

          {/* Show Password */}
          <div className="md:col-span-2">

            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="checkbox"
                checked={showPassword}
                onChange={() =>
                  setShowPassword((prev) => !prev)
                }
              />

              Show Password

            </label>

          </div>

          {/* Register Button */}
          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              {loading
                ? "Creating Account... Please wait"
                : "Register"}
            </button>

          </div>

          {/* Login */}
          <div className="md:col-span-2 text-center mt-2">

            <p className="text-gray-600">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-green-700 font-semibold hover:underline"
              >
                Login
              </Link>

            </p>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Register;



