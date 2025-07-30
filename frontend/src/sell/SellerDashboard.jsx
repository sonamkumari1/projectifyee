import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddSellerForm from "./AddSellerForm";
import AllSellersTable from "./AllSellersTable";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useEffect } from "react";
import axios from "axios";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [projectCount, setProjectCount] = useState(0);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchProjectCount = async () => {
      try {
        const response = await axios.get(`https://projectifyee.onrender.com/api/project/${user._id}/count`,{
          withCredentials: true
        });
        setProjectCount(response.data.count);
      } catch (err) {
        console.error("Error fetching project count:", err);
      }
    };

    if (user?._id) {
      fetchProjectCount();
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  console.log(projectCount)
 
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white font-sans">
      {/* Mobile Top Bar */}
      <div className="flex md:hidden items-center justify-between bg-gray-800 px-6 py-4 shadow">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl font-bold"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block md:w-64 w-full bg-gray-900 p-6 space-y-4 shadow-md`}
      >
        <h2 className="text-2xl font-extrabold mb-10 hidden md:block text-white">
          Seller Panel
        </h2>

        {["home", "upload", "list"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSidebarOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-md transition ${
              activeTab === tab
                ? "bg-gray-700 font-semibold"
                : "hover:bg-gray-800"
            }`}
          >
            {tab === "home"
              ? "Dashboard"
              : tab === "upload"
              ? "Add New Form"
              : "All Data List"}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="bg-gray-700 font-semibold px-4 py-3 rounded-md hover:bg-red-600 transition w-full"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === "home" && (
          <>
            <h1 className="text-3xl font-bold text-white mb-8 mt-10 px-20">
              Welcome, Seller!
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-20">
              <div className="bg-gray-800 rounded-lg p-6 shadow-md border-t-4 border-gray-600">
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  Total Data Records
                </h3>
                <p className="text-4xl font-bold text-white">{projectCount}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 shadow-md border-t-4 border-gray-600 cursor-pointer hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  Total Users
                </h3>
                <p className="text-4xl font-bold text-white">0</p>
              </div>
            </div>
          </>
        )}

        {activeTab === "upload" && (
          <div className="max-w-4xl mx-auto">
            <AddSellerForm />
          </div>
        )}

        {activeTab === "list" && (
          <div className="mt-6">
            <AllSellersTable />
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerDashboard;
