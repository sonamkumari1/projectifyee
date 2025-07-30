import React, { useEffect, useState } from "react";
import axios from "axios";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/profile", { withCredentials: true });
      setUser(res.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-lg animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-red-500">
        <p className="text-lg">Failed to load user profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-lg p-8">
        <div className="flex items-center space-x-6">
          <img
            src={user.photoUrl || "https://via.placeholder.com/100"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-700"
          />
          <div>
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
            <span className="text-sm bg-blue-700 px-3 py-1 rounded-full mt-1 inline-block">
              {user.role.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded p-4">
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            <p>{user.experience || "N/A"} years</p>
          </div>

          <div className="bg-gray-800 rounded p-4">
            <h3 className="text-lg font-semibold mb-2">Company / College</h3>
            <p>{user.companyOrCollege || "N/A"}</p>
          </div>

          <div className="bg-gray-800 rounded p-4">
            <h3 className="text-lg font-semibold mb-2">Joined On</h3>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
