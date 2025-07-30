import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function AddSellerForm() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  console.log(user, isAuthenticated, loading);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "seller")) {
      navigate("/unauthorized");
    }
  }, [user, isAuthenticated, loading, navigate]);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (user?.role !== "seller") return null;

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discountPer: "",
    rating: "",
    desc: "",
    domaincategory: "",
    category: "",
    github: "",
    frontend: "",
    backend: "",
    database: "",
  });
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("price", formData.price);
    form.append("discountPer", formData.discountPer);
    form.append("rating", formData.rating);
    form.append("desc", formData.desc);
    form.append("domaincategory", formData.domaincategory);
    form.append("category", formData.category);
    form.append("github", formData.github);
    form.append("frontend", formData.frontend);
    form.append("backend", formData.backend);
    form.append("database", formData.database);
    if (photo) form.append("photo", photo);
    if (video) form.append("video", video);

    try {
      const res = await axios.post(
        "https://projectifyee.onrender.com/api/project/projectadd",
        form,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      alert("project Added Successfully");
      navigate("/seller/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to submit");
    }
  };

  return (
    <div className="min-h-screen py-20 flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-900/90 p-10 rounded-xl shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white">
          Add Seller
        </h2>

        <input
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="number"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="number"
          placeholder="Discount %"
          name="discountPer"
          value={formData.discountPer}
          onChange={handleChange}
        />

        <input
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="number"
          step="0.1"
          placeholder="Rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />

        <textarea
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Description"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
        ></textarea>

        <textarea
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Frontend Description"
          name="frontend"
          value={formData.frontend}
          onChange={handleChange}
        ></textarea>
        <textarea
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Backend Description"
          name="backend"
          value={formData.backend}
          onChange={handleChange}
        ></textarea>
        <textarea
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Database Description"
          name="database"
          value={formData.database}
          onChange={handleChange}
        ></textarea>

        <select
          name="domaincategory"
          value={formData.domaincategory}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2"
          required
        >
          <option value="" disabled>
            Select Domain Category
          </option>
          <option value="web development">Web Development</option>
          <option value="mobile developement">Mobile Development</option>
          <option value="game development">Game Development</option>
          <option value="data science projects">Data Science Projects</option>
          <option value="c++ projects">C++ Projects</option>
          <option value="python projects">Python Projects</option>
          <option value="java projects">Java Projects</option>
          <option value="c projects">C Projects</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 "
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="college">College</option>
          <option value="experts">Experts</option>
          <option value="domain">Domain</option>
        </select>

        <input
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="text"
          placeholder="GitHub Link"
          name="github"
          value={formData.github}
          onChange={handleChange}
        />

        <div className="flex flex-col gap-4">
          <label className="text-gray-300">Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300"
          />

          <label className="text-gray-300">Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddSellerForm;
