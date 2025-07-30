import React from "react";
import { Link } from "react-router-dom";

function ProjectCard({ data }) {
  const { _id, title, price, discountPer, rating, github, photo, desc } = data;

  const discountAmount = (price * discountPer) / 100;
  const discountedPrice = price - discountAmount;

  return (
     <Link to={`/projects/view/${_id}`}>
    <div className="relative bg-black border border-gray-800 rounded-lg shadow-2xl shadow-gray-700 transform hover:scale-105 transition duration-300 ease-in-out">
      <div className="absolute top-1 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded z-10">
        {discountPer}% OFF
      </div>

      <a href="#">
        <img
          className="rounded-t-lg transition duration-300 object-cover w-full h-44"
          src={`https://projectifyee.onrender.com/uploads/${photo}`}
          alt="project"
        />
      </a>

      <div className="px-3 pt-4 pb-2">
        <h5 className="text-2xl font-semibold tracking-tight text-white hover:text-gray-300 transition">
          {title}
        </h5>
        <p className="text-xs mt-2 font-semibold tracking-tight text-gray-400 hover:text-gray-300 transition line-clamp-2">
          {desc}
        </p>

        <div className="flex items-center mt-2.5 mb-2">
          <div className="flex items-center space-x-1">
            {[...Array(Math.floor(rating || 4))].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <span className="bg-blue-800 text-white text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">
            {rating || 5.0}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-white">
              ₹{discountedPrice.toLocaleString()}
            </span>
            <span className="line-through text-gray-400 text-sm ml-2">
              ₹{price.toLocaleString()}
            </span>
          </div>
          <a
            href="#"
            className="text-white bg-zinc-900 hover:bg-zinc-800 font-medium rounded-full text-base px-5 py-2.5 text-center"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default ProjectCard;
