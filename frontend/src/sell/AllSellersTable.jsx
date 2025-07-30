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
      const res = await axios.get("http://localhost:4000/api/project",{
        withCredentials: true,
      });
      setProjects(res.data.data);
    } catch (error) {
      console.error("Error fetching Projects:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Project?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/project/delete/${id}`,{
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
      if (photo) {
        formData.append("photo", editData.photo);
      }
      if (video) {
        formData.append("video", editData.video);
      }
      await axios.put(
        `http://localhost:4000/api/project/update/${editingProject._id}`,
        formData,{
          withCredentials: true,
          
        }
      );
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Edit error:", error);
      alert("Failed to update");
    }
  };

  return (
    <div className="min-h-screen bg-black py-20 px-4 flex justify-center">
      <div className="w-full max-w-7xl overflow-x-auto bg-gray-900/90 rounded-xl shadow-2xl p-6">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">
          All Projects
        </h2>

        <table className="w-full table-auto text-left text-sm text-white border border-gray-800">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-3 border-b border-gray-700">Photo</th>
              <th className="p-3 border-b border-gray-700">Title</th>
              <th className="p-3 border-b border-gray-700">Price</th>
              <th className="p-3 border-b border-gray-700">Discount</th>
              <th className="p-3 border-b border-gray-700">Rating</th>
              <th className="p-3 border-b border-gray-700">Domain</th>
              <th className="p-3 border-b border-gray-700">Category</th>
              <th className="p-3 border-b border-gray-700">GitHub</th>
              <th className="p-3 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((item) => (
              <tr key={item._id} className="hover:bg-gray-800/60">
                <td className="p-3 border-b border-gray-700">
                  {item.photo && (
                    <img
                      src={`http://localhost:4000/uploads/${item.photo}`}
                      alt="photo"
                      className="w-16 h-12 object-cover rounded"
                    />
                  )}
                </td>
                <td className="p-3 border-b border-gray-700">{item.title}</td>
                <td className="p-3 border-b border-gray-700">₹{item.price}</td>
                <td className="p-3 border-b border-gray-700">
                  {item.discountPer}%
                </td>
                <td className="p-3 border-b border-gray-700">{item.rating}</td>
                <td className="p-3 border-b border-gray-700">
                  {item.domaincategory}
                </td>
                <td className="p-3 border-b border-gray-700">
                  {item.category}
                </td>
                <td className="p-3 border-b border-gray-700">
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    GitHub
                  </a>
                </td>
                <td className="p-3 border-b border-gray-700 space-x-2">
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

        {projects.length === 0 && (
          <p className="text-gray-400 text-center mt-6">
            No projects added yet.
          </p>
        )}
      </div>

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start overflow-y-auto py-10 z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-white text-center">
              Edit project
            </h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                placeholder="Title"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="number"
                name="price"
                value={editData.price}
                onChange={handleEditChange}
                placeholder="Price"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="number"
                name="discountPer"
                value={editData.discountPer}
                onChange={handleEditChange}
                placeholder="Discount %"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="number"
                name="rating"
                value={editData.rating}
                onChange={handleEditChange}
                placeholder="Rating"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />

              <textarea
                type="text"
                name="desc"
                value={editData.desc}
                onChange={handleEditChange}
                placeholder="Description"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />

             <textarea
                type="text"
                name="frontend"
                value={editData.frontend}
                onChange={handleEditChange}
                placeholder="frontend"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
               <textarea
                type="text"
                name="backend"
                value={editData.backend}
                onChange={handleEditChange}
                placeholder="backend"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <textarea
                type="text"
                name="database"
                value={editData.database}
                onChange={handleEditChange}
                placeholder="database"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="text"
                name="domaincategory"
                value={editData.domaincategory}
                onChange={handleEditChange}
                placeholder="Domain"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="text"
                name="category"
                value={editData.category}
                onChange={handleEditChange}
                placeholder="Category"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
              <input
                type="text"
                name="github"
                value={editData.github}
                onChange={handleEditChange}
                placeholder="GitHub"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
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
