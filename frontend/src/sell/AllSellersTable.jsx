import React, { useEffect, useState } from "react";
import axios from "axios";

function AllSellersTable() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://projectifyee.onrender.com/api/project", {
        withCredentials: true,
      });
      setProjects(res.data.data);
    } catch (error) {
      console.error("Error fetching Projects:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Project?"))
      return;
    try {
      await axios.delete(`https://projectifyee.onrender.com/api/project/delete/${id}`, {
        withCredentials: true,
      });
      setProjects((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete");
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setEditData(project);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        title,
        price,
        discountPer,
        rating,
        desc,
        photo,
        video,
        domaincategory,
        category,
        github,
        frontend,
        backend,
        database,
      } = editData;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("discountPer", discountPer);
      formData.append("rating", rating);
      formData.append("desc", desc);
      formData.append("domaincategory", domaincategory);
      formData.append("category", category);
      formData.append("github", github);
      formData.append("frontend", frontend);
      formData.append("backend", backend);
      formData.append("database", database);
      if (photo) formData.append("photo", photo);
      if (video) formData.append("video", video);

      await axios.put(
        `https://projectifyee.onrender.com/api/project/update/${editingProject._id}`,
        formData,
        { withCredentials: true }
      );
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Edit error:", error);
      alert("Failed to update");
    }
  };

  return (
    <div className="min-h-screen bg-black py-10 px-4 sm:px-6 lg:px-12">
      <div className="w-full max-w-7xl mx-auto overflow-x-auto bg-gray-900/90 rounded-xl shadow-2xl p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl text-white font-bold mb-6 text-center">
          All Projects
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-white border border-gray-800">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="p-2 sm:p-3 border-b border-gray-700">Photo</th>
                <th className="p-2 sm:p-3 border-b border-gray-700">Title</th>
                <th className="p-2 sm:p-3 border-b border-gray-700">Price</th>
                <th className="p-2 sm:p-3 border-b border-gray-700">Discount</th>
                <th className="p-2 sm:p-3 border-b border-gray-700">Rating</th>
                <th className="p-2 sm:p-3 border-b border-gray-700">Domain</th>
                <th className="p-2 sm:p-3 border-b border-gray-700">Category</th>
                <th className="p-2 sm:p-3 border-b border-gray-700">GitHub</th>
                <th className="p-2 sm:p-3 border-b border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((item) => (
                <tr key={item._id} className="hover:bg-gray-800/60">
                  <td className="p-2 sm:p-3 border-b border-gray-700">
                    {item.photo && (
                      <img
                        src={item.photo}
                        alt="project"
                        className="w-14 h-12 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="p-2 sm:p-3 border-b border-gray-700">{item.title}</td>
                  <td className="p-2 sm:p-3 border-b border-gray-700">₹{item.price}</td>
                  <td className="p-2 sm:p-3 border-b border-gray-700">{item.discountPer}%</td>
                  <td className="p-2 sm:p-3 border-b border-gray-700">{item.rating}</td>
                  <td className="p-2 sm:p-3 border-b border-gray-700">{item.domaincategory}</td>
                  <td className="p-2 sm:p-3 border-b border-gray-700">{item.category}</td>
                  <td className="p-2 sm:p-3 border-b border-gray-700">
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      GitHub
                    </a>
                  </td>
                  <td className="p-2 sm:p-3 border-b border-gray-700 space-y-1 sm:space-x-2 sm:space-y-0 flex flex-col sm:flex-row">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-yellow-500 px-2 py-1 rounded text-black text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 px-2 py-1 rounded text-white text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {projects.length === 0 && (
          <p className="text-gray-400 text-center mt-6">No projects added yet.</p>
        )}
      </div>

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-start overflow-y-auto py-10 px-4 z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-white text-center">
              Edit Project
            </h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              {[
                { name: "title", type: "text" },
                { name: "price", type: "number" },
                { name: "discountPer", type: "number" },
                { name: "rating", type: "number" },
                { name: "domaincategory", type: "text" },
                { name: "category", type: "text" },
                { name: "github", type: "text" },
              ].map(({ name, type }) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  value={editData[name]}
                  onChange={handleEditChange}
                  placeholder={name[0].toUpperCase() + name.slice(1)}
                  className="w-full p-2 bg-gray-800 text-white rounded"
                />
              ))}

              {["desc", "frontend", "backend", "database"].map((name) => (
                <textarea
                  key={name}
                  name={name}
                  value={editData[name]}
                  onChange={handleEditChange}
                  placeholder={name}
                  className="w-full p-2 bg-gray-800 text-white rounded"
                />
              ))}

              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) =>
                  setEditData({ ...editData, photo: e.target.files[0] })
                }
                className="w-full p-2 bg-gray-800 text-white rounded"
              />

              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={(e) =>
                  setEditData({ ...editData, video: e.target.files[0] })
                }
                className="w-full p-2 bg-gray-800 text-white rounded"
              />

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-600 px-4 py-2 rounded text-white"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="bg-gray-600 px-4 py-2 rounded text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllSellersTable;
