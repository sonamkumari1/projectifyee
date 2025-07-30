import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { FaStar } from "react-icons/fa";

const ratingsData = {
  average: 5.0,
  total: 4,
  breakdown: {
    5: 4,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  },
};

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
  const total = ratingsData.total;

  const handleBuyNow = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/purchase/checkout/create-checkout-session",
        { projectId: project._id },
        {
          withCredentials: true,
        }
      );

      if (response.data?.url) {
        window.location.href = response.data.url; // Redirect to Stripe Checkout
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong while initiating checkout.");
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/project/${id}`, {
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

  return (
    <div className="py-20 px-40 text-white">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

      <div className="flex flex-col md:flex-row gap-12 p-6 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 mr-28">
          <img
            src={`http://localhost:4000/uploads/${project.photo}`}
            alt={project.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        <div className="w-full md:w-75 h-fit bg-white/10 border border-gray-800 shadow-2xl rounded-lg p-10 shadow-gray-700">
          <h2 className="text-xl font-semibold mb-3">{project.title}</h2>

          <p className="text-base font-medium text-white mb-2">
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

          <div className="flex gap-5">
            <button
              onClick={handleBuyNow}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded shadow"
            >
              Buy Now
            </button>
            <button className="bg-gray-800 hover:bg-gray-900 text-white text-sm px-4 py-2 rounded shadow">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-semibold mt-16 mb-7">
        Projects Descriptions
      </h1>
      <p className="text-lg text-gray-400 mb-8">{project.desc}</p>

      <h1 className="text-2xl font-bold mb-4">Additional Details</h1>

      <table className="w-full max-w-3xl border border-gray-300 rounded-lg">
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

      <h1 className="text-2xl font-semibold mt-8 mb-10">Video Projects</h1>

      <div className="w-full px-4 sm:px-8">
        <video className="w-full h-100 max-w-full rounded mb-6" controls>
          <source
            src={`http://localhost:4000/uploads/${project.video}`}
            type="video/mp4"
          />
        </video>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold">Ratings:</h2>
        <div className="flex items-center gap-2 mt-2 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
          <span className="text-black font-semibold">
            {ratingsData.average} out of 5
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{total} global ratings</p>

        <div className="mt-4 space-y-2 w-full max-w-md">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingsData.breakdown[star] || 0;
            const percent = ((count / total) * 100).toFixed(0);
            return (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-12 text-blue-600">{star} star</span>
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
      <div>
        <h2 className="text-2xl font-semibold mb-6">Recent Reviews:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow p-4 border border-gray-200"
            >
              <h3 className="font-bold text-lg text-black">{review.name}</h3>
              <p className="text-sm text-gray-500 mb-2">Id: {review.id}</p>
              <div className="flex items-center text-yellow-500 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} />
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
