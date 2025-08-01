import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Riya",
    id: "7e3f4c92b1",
    rating: 5,
    comment:
      "Efficient vendor management tools and transparent refund policies made SwiftMarket a valuable project for me",
  },
  {
    name: "Aditya Singh",
    id: "7b2de49c4c",
    rating: 5,
    comment: "Perfect for Final Year Project",
  },
  {
    name: "Simran Kaur",
    id: "9a15b08e3d",
    rating: 5,
    comment: "Great Implementation customer support and sales analytics",
  },
];

function ViewProjects() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  const handleBuyNow = async () => {
    try {
      const response = await axios.post(
        "https://projectifyee.onrender.com/api/purchase/checkout/create-checkout-session",
        { projectId: project._id },
        { withCredentials: true }
      );
      if (response.data?.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong while initiating checkout.");
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`https://projectifyee.onrender.com/api/project/${id}`, {
          withCredentials: true,
        });
        setProject(res.data.data);
      } catch (error) {
        console.error("Failed to fetch project", error);
      }
    };
    fetchProject();
  }, [id]);

  if (!project) return <div className="text-white p-10">Loading...</div>;

  const breakdown = project.ratingBreakdown || {};
  const totalRatings =
    project.totalRatings ||
    Object.values(breakdown).reduce((acc, val) => acc + val, 0);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-40 text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{project.title}</h1>

      <div className="flex flex-col md:flex-row gap-12 p-4 sm:p-6 rounded-lg shadow-lg">
        <div className="w-full md:w-[60%] md:mr-20">
          <img
            src={project.photo}
            alt={project.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        <div className="w-full md:w-[35%] md:h-[20%] bg-white/10 border border-gray-800 shadow-2xl rounded-lg p-6 sm:p-10 shadow-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold mb-3">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base font-medium text-white mb-2">
            Original Price: ₹{project.price}
          </p>
          <p className="text-xs text-red-500 mb-2">
            Discount: {project.discountPer}%
          </p>
          <p className="text-base font-bold text-green-400 mb-5">
            Total: ₹
            {(
              project.price -
              (project.price * project.discountPer) / 100
            ).toFixed(2)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleBuyNow}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded shadow w-full sm:w-auto"
            >
              Buy Now
            </button>
            <button className="bg-gray-800 hover:bg-gray-900 text-white text-sm px-4 py-2 rounded shadow w-full sm:w-auto">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-semibold mt-12 mb-4">
        Project Description
      </h1>
      <p className="text-base sm:text-lg text-gray-400 mb-8">{project.desc}</p>

      <h1 className="text-xl sm:text-2xl font-bold mb-4">Additional Details</h1>
      <div className="overflow-x-auto">
        <table className="w-full max-w-3xl border border-gray-300 rounded-lg text-sm sm:text-base">
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="font-semibold px-4 py-2 w-1/3">Applicable for</td>
              <td className="px-4 py-2">B.Tech, M.Tech, BCA, MCA</td>
            </tr>
            <tr>
              <td className="font-semibold px-4 py-2">Frontend</td>
              <td className="px-4 py-2">{project.frontend}</td>
            </tr>
            <tr>
              <td className="font-semibold px-4 py-2">Backend</td>
              <td className="px-4 py-2">{project.backend}</td>
            </tr>
            <tr>
              <td className="font-semibold px-4 py-2">Database</td>
              <td className="px-4 py-2">{project.database}</td>
            </tr>
            <tr>
              <td className="font-semibold px-4 py-2">GitHub</td>
              <td className="px-4 py-2">
                <a
                  href={project.github}
                  className="text-blue-500 hover:underline"
                >
                  {project.github}
                </a>
              </td>
            </tr>
            <tr>
              <td className="font-semibold px-4 py-2">Category</td>
              <td className="px-4 py-2">{project.category.join(", ")}</td>
            </tr>
            <tr>
              <td className="font-semibold px-4 py-2">Domain Category</td>
              <td className="px-4 py-2">{project.domaincategory.join(", ")}</td>
            </tr>
            <tr>
              <td className="font-semibold px-4 py-2">Created At</td>
              <td className="px-4 py-2">
                {new Date(project.createdAt).toLocaleDateString()}
              </td>
            </tr>
            <tr>
              <td className="font-semibold px-4 py-2">Updated At</td>
              <td className="px-4 py-2">
                {new Date(project.updatedAt).toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold mt-10 mb-6">
        Video Preview
      </h1>
      <div className="w-full">
        <video
          className="w-full h-52 md:h-96 lg:h-96 object-cover rounded mb-6"
          controls
        >
          <source src={project.video} type="video/mp4" />
        </video>
      </div>

      {/* Ratings */}
      <div className="mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold">Ratings:</h2>
        <div className="flex items-center gap-2 mt-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.round(project.rating)
                  ? "text-yellow-500"
                  : "text-gray-400"
              }
            />
          ))}
          <span className="text-white font-semibold">
            {project.rating.toFixed(1)} out of 5
          </span>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          {totalRatings} global ratings
        </p>

        <div className="mt-4 space-y-2 w-full max-w-md">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = breakdown[star] || 0;
            const percent = totalRatings
              ? ((count / totalRatings) * 100).toFixed(0)
              : 0;

            return (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-12 text-blue-500">{star} star</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-blue-600 w-10 text-right">
                  {percent}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">
          Recent Reviews:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow p-4 border border-gray-200"
            >
              <h3 className="font-bold text-lg text-black">{review.name}</h3>
              <p className="text-sm text-gray-500 mb-2">Id: {review.id}</p>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < review.rating ? "text-yellow-500" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewProjects;
