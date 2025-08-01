import React, { useEffect, useState } from "react";
import axios from "axios";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [companyOrCollege, setCompanyOrCollege] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("https://projectifyee.onrender.com/api/auth/profile", {
        withCredentials: true,
      });
      const userData = res.data.user;
      setUser(userData);
      setName(userData.name || "");
      setExperience(userData.experience || "");
      setCompanyOrCollege(userData.companyOrCollege || "");
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("experience", experience);
    formData.append("companyOrCollege", companyOrCollege);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      setUpdating(true);
      const res = await axios.put("https://projectifyee.onrender.com/api/auth/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        await fetchProfile();
        setEditing(false);
        setProfilePic(null);
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setUpdating(false);
    }
  };

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
    <div className="min-h-screen border border-white/16 bg-black backdrop-blur-md text-white p-6">
      <div className="max-w-4xl mx-auto bg-white/8 rounded-lg shadow-2xl shadow-gray-800 p-8">
        <div className="flex items-center space-x-6">
          <img
            src={user.photoUrl || "https://via.placeholder.com/100"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-700"
          />
          <div className="w-full">
            {editing ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-zinc-900 px-3 py-2 rounded text-white border border-gray-600 w-full mb-2"
                  placeholder="Full Name"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  className="block text-sm text-gray-300"
                />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
                <span className="text-sm bg-blue-700 px-3 py-1 rounded-full mt-1 inline-block">
                  {user.role.toUpperCase()}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-zinc-900 rounded p-4">
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            {editing ? (
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-zinc-900 text-white rounded px-3 py-2"
                placeholder="Experience in years"
              />
            ) : (
              <p>{user.experience || "N/A"} years</p>
            )}
          </div>

          <div className="bg-zinc-900 rounded p-4">
            <h3 className="text-lg font-semibold mb-2">Company / College</h3>
            {editing ? (
              <input
                type="text"
                value={companyOrCollege}
                onChange={(e) => setCompanyOrCollege(e.target.value)}
                className="w-full bg-zinc-900 text-white rounded px-3 py-2"
                placeholder="Company or College"
              />
            ) : (
              <p>{user.companyOrCollege || "N/A"}</p>
            )}
          </div>

          <div className="bg-zinc-900 rounded p-4">
            <h3 className="text-lg font-semibold mb-2">Joined On</h3>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleProfileUpdate}
                className="bg-green-700 px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                disabled={updating}
              >
                {updating ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setName(user.name);
                  setExperience(user.experience);
                  setCompanyOrCollege(user.companyOrCollege);
                  setProfilePic(null);
                }}
                className="bg-zinc-900 px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
