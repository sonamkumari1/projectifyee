import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  registerFail,
  registerStart,
  registerSuccess,
} from "../../redux/slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default is user

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      dispatch(registerStart());
      const response = await axios.post("https://projectifyee.onrender.com/api/auth/register", {
        name,
        email,
        password,
        role, // send role to backend
      });
      dispatch(registerSuccess());
      toast.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      dispatch(registerFail(error.response?.data?.error || "Register failed"));
      toast.error(error.response?.data?.error || "Register failed");
    }
  };

  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-gray-900 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-white mb-4">Register</h1>

            <div className="flex flex-col space-y-4">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="rounded-md px-4 py-2 bg-zinc-800 text-white focus:outline-none"
              />
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="rounded-md px-4 py-2 bg-zinc-800 text-white focus:outline-none"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="rounded-md px-4 py-2 bg-zinc-800 text-white focus:outline-none"
              />

              <div className="flex gap-4 items-center text-gray-300">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={() => setRole("user")}
                    className="mr-1"
                  />
                  User
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={role === "seller"}
                    onChange={() => setRole("seller")}
                    className="mr-1"
                  />
                  Seller
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-md px-4 py-2 w-full"
              >
                Register
              </button>
            </div>

            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-400 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
