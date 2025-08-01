import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const firstLetter = user?.name?.[0]?.toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="w-full max-w-screen-xl mx-auto mt-5 border border-white/16 rounded-full bg-white/8 backdrop-blur-md px-8 py-1 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="logo" className="w-16 h-16 object-contain" />
        <div className="text-zinc-100 font-medium text-4xl">Projectfy</div>
      </div>

      <div className="flex items-center justify-center gap-5">
        {user ? (
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-zinc-100 rounded-full px-5 py-1.5 bg-zinc-900 font-medium text-lg flex items-center transition border border-zinc-700 relative overflow-hidden group uppercase"
          >
            {firstLetter}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-3 bg-zinc-100 blur-[18px] group-hover:scale-[3] opacity-0 group-hover:opacity-100 transition duration-1000" />
          </div>
        ) : (
          <Link
            to="/login"
            className="text-zinc-100 rounded-full px-5 py-1.5 bg-zinc-900 font-medium text-lg flex items-center transition border border-zinc-700 relative overflow-hidden group"
          >
            login
            <svg
              className="inline-block ml-2 group-hover:translate-x-2 transition duration-1000"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M13.3 17.275q-.3-.3-.288-.725t.313-.725L16.15 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.15L13.325 8.175q-.3-.3-.313-.725t.288-.725q.3-.3.725-.288t.725.313l4.15 4.15q.15.15.213.325t.063.375q0 .2-.063.375t-.213.325l-4.15 4.15q-.3.3-.725.313t-.725-.288Z"
              />
            </svg>
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-3 bg-zinc-100 blur-[18px] group-hover:scale-[3] opacity-0 group-hover:opacity-100 transition duration-1000" />
          </Link>
        )}

        {dropdownOpen && user && (
          <div className="absolute right-0 mt-40 w-28 bg-zinc-900 border border-zinc-700 rounded-lg shadow-md py-2">
            <button
              className="block w-full text-left px-4 py-2 text-white hover:bg-zinc-800"
              onClick={() => {
                setDropdownOpen(false);
                if (user.role === "seller") {
                  navigate("/seller/dashboard");
                } else {
                  navigate("/userDashboard");
                }
              }}
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-white hover:bg-zinc-800"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
