import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";

function ProjectDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-10 pt-10 pb-20 bg-black gap-24">
      <div className="relative w-full max-w-screen-xl mx-auto mt-5 border border-gray-800 shadow-xl shadow-gray-900 rounded-xl bg-white/7 backdrop-blur-md px-6 sm:px-8 md:pb-10 pb-5 md:pt-16 pt-10 hover:shadow-[0_0_20px_rgba(0,0,0,0.7)]">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 text-center leading-tight">
          Selling Projects
        </h1>
        <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-3xl py-7 mx-auto text-center">
          Easily list your projects for sale, connect with interested buyers,
          and grow your business faster. Our platform helps you organize,
          promote, and sell your projects with efficiency and confidence.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2 sm:px-0">
          {[
            {
              src: "https://images.ctfassets.net/23aumh6u8s0i/5gieAxw4n3rxYsyjaAnhGm/aa67599b991ad67b3241bf730fc2a131/security_programming_hero.jpg",
              title: "Web Development",
            },
            {
              src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX3omU3vfzb5olH7BiJPqOC4VpPQlEry4OW51kPTCOeaIu0OS5gt-eeorDSJKn13cBO4w&usqp=CAU",
              title: "Mobile Development",
            },
            {
              src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJNZxyMbnxN27zZlrMzbzD3eVlQbWXcB0cDw&s",
              title: "Game Development",
            },
            {
              src: "https://builtin.com/sites/www.builtin.com/files/2024-10/data-science.jpg",
              title: "Data Science Projects",
            },
            {
              src: "https://www.mooc.org/hubfs/applications-of-computer-programming.jpg",
              title: "C++ Projects",
            },
            {
              src: "https://www.udacity.com/_next/image?url=https%3A%2F%2Fvideo.udacity-data.com%2Ftopher%2F2024%2FOctober%2F67098980_ud994%2Fud994.jpg&w=3840&q=75",
              title: "Java Projects",
            },
            {
              src: "https://cdn.britannica.com/30/199930-050-22822D75/computer.jpg",
              title: "Python Projects",
            },
            {
              src: "https://dz2cdn1.dzone.com/storage/temp/12334613-971.jpg",
              title: "C Projects",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative group mb-3 bg-gray-800 rounded-lg border border-gray-900 shadow-md shadow-gray-700 cursor-pointer overflow-hidden w-full sm:w-64 h-48 mx-auto transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="w-full h-full">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300">
                <h1 className="text-white font-bold text-center text-xl">
                  {item.title}
                </h1>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/sellerform")}
          className="mt-10 w-full py-3 bg-zinc-950 text-white border border-gray-800 rounded-full hover:bg-gray-700 shadow-2xl transition flex items-center justify-center gap-4"
        >
          Upload Your Projects <FiUpload />
        </button>
      </div>

      <div className="w-full max-w-screen-xl mx-auto  bg-black text-white px-4 sm:px-5">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 text-center leading-tight">
          Available Projects
        </h1>
        <p className="text-sm sm:text-base text-gray-300 mb-12 max-w-3xl mx-auto text-center leading-relaxed">
          Discover a wide range of projects available for purchase. Find the
          perfect fit for your business goals and expand your portfolio with
          ease and confidence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Card 1 */}
          <div className="bg-white/5 border border-gray-900 shadow-gray-900 rounded-xl shadow-lg px-4 py-2 flex flex-col items-center text-center transition hover:shadow-2xl hover:-translate-y-1">
            <img
              src="https://m.media-amazon.com/images/S/pv-target-images/b8a356f8325aa0d7b4d6b8bd7678f52702b1e00d8fb450ca161e3f97167e01ef._SX1080_FMjpg_.jpg"
              alt="Web"
              className="h-40 w-full object-cover rounded-lg mt-3 mb-3"
            />
            <h2 className="text-xl font-semibold mb-3">
              College Student Projects
            </h2>
            <p className="text-gray-400 mb-6">
              Explore College Specific Projects
            </p>
            <button
              onClick={() => navigate("/projects/college")}
              className="text-zinc-100 rounded-full px-5 py-1.5 mb-4 bg-zinc-900 font-medium text-lg flex items-center transition border border-zinc-700 relative overflow-hidden group"
            >
              Explore....
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white/5 border border-gray-900 shadow-gray-900 rounded-xl shadow-lg px-4 py-2 flex flex-col items-center text-center transition hover:shadow-2xl hover:-translate-y-1">
            <img
              src="https://webixytech.com/admin_panel/assets/project_images/1625120256What_is_an_IT_company.jpg"
              alt="AI"
              className="h-40 w-full object-cover rounded-lg mt-3 mb-3"
            />
            <h2 className="text-xl font-semibold mb-3">
              Company & Experts Projects
            </h2>
            <p className="text-gray-400 mb-6">
              Explore Company&Experts Specific Projects.
            </p>
            <button
              onClick={() => navigate("/projects/experts")}
              className="text-zinc-100 rounded-full px-5 py-1.5 mb-4 bg-zinc-900 font-medium text-lg flex items-center transition border border-zinc-700 relative overflow-hidden group"
            >
              Explore....
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white/5 border border-gray-900 shadow-gray-900 rounded-xl shadow-lg px-4 py-2 flex flex-col items-center text-center transition hover:shadow-2xl hover:-translate-y-1">
            <img
              src="https://imageio.forbes.com/specials-images/imageserve/62ea057f9f71bb80937b70bb/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds"
              alt="Game"
              className="h-40 w-full object-cover rounded-lg mt-3 mb-3"
            />
            <h2 className="text-xl font-semibold mb-3">
              Technical CategoryWise Projects
            </h2>
            <p className="text-gray-400 mb-6">
              Explore Domain Specific Projects.
            </p>
            <button
              onClick={() => navigate("/projects/domain")}
              className="text-zinc-100 rounded-full px-5 py-1.5 mb-4 bg-zinc-900 font-medium text-lg flex items-center transition border border-zinc-700 relative overflow-hidden group"
            >
              Explore....
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-screen-xl mx-auto md:mt-5 border border-gray-800 shadow-xl shadow-gray-900 rounded-xl bg-white/5 backdrop-blur-md px-6 sm:px-8 md:py-20 py-10 hover:shadow-[0_0_20px_rgba(0,0,0,0.7)]">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10 text-center md:text-left">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Share Your Idea for Project
            </h1>
            <p className="text-sm sm:text-base text-gray-300 mb-6">
              Got a unique project idea? Share it with us and let us help you
              turn it into a successful business opportunity. Collaborate,
              innovate, and create with confidence.
            </p>
            <button
              onClick={() => navigate("/idea")}
              className="px-6 py-3 bg-zinc-900 text-white rounded-full hover:bg-purple-700 transition"
            >
              Share Your Idea
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/ideas.png"
              alt="Share Your Idea"
              className="rounded-lg shadow-lg w-full max-w-[550px] h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDashboard;
