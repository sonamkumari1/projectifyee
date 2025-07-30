import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFail, loginStart, loginSuccess } from "../../redux/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      dispatch(loginStart());
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(loginSuccess(response.data));
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      dispatch(loginFail(error.response?.data?.error || "Login failed"));
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-gray-900 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-white mb-4">Login</h1>

            <div className="flex flex-col space-y-4">
              <input
                autoComplete="off"
                value={email}
                name="email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md px-4 py-2 bg-zinc-800 text-white focus:outline-none"
                placeholder="Email address"
              />

              <input
                autoComplete="off"
                value={password}
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md px-4 py-2 bg-zinc-800 text-white focus:outline-none"
                placeholder="Password"
              />

              <button
                onClick={handleSubmit}
                className="mt-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md px-4 py-2 w-full"
              >
                Login
              </button>
            </div>

            <div className="flex justify-center text-lg text-gray-400 my-1">or</div>

            <div className="w-full flex justify-center">
              <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-0.5 0 48 48"
                >
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M9.827 24c0-1.524.253-2.985.705-4.356l-7.909-6.039C1.082 16.734.214 20.26.214 24c0 3.737.868 7.262 2.407 10.39l7.904-6.051C10.077 26.973 9.827 25.517 9.827 24"
                      fill="#FBBC05"
                    />
                    <path
                      d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.093l6.836-6.827C35.036 2.773 29.695.533 23.714.533 14.427.533 6.445 5.844 2.623 13.604l7.909 6.039c1.823-5.532 7.018-9.511 13.182-9.511"
                      fill="#EB4335"
                    />
                    <path
                      d="M23.714 37.867c-6.165 0-11.36-3.978-13.182-9.51l-7.909 6.039c3.822 7.761 11.803 13.072 21.09 13.072 5.732 0 11.205-2.035 15.312-5.849l-7.507-5.804c-2.118 1.335-4.785 2.053-7.804 2.053"
                      fill="#34A853"
                    />
                    <path
                      d="M46.145 24c0-1.387-.213-2.88-.533-4.267H23.714v9.067H36.318c-.63 3.091-2.345 5.468-4.8 7.014l7.507 5.804C43.339 37.614 46.145 31.649 46.145 24"
                      fill="#4285F4"
                    />
                  </g>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            <p className="text-center text-sm text-gray-400 mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-cyan-400 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
