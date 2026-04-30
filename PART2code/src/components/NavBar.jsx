import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Navbar updated user:", user);
  }, [user]);

  const handleProfile = () => {
    console.log("PROFILE CLICKED");
    navigate("/profile");
  };

  const handleLogout = () => {
    console.log("LOGOUT CLICKED");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      {/* LEFT */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex gap-2">
        {/* SIMPLE MENU (NO DROPDOWN LIBRARY BEHAVIOR) */}
        <div className="relative">
          <div className="flex items-center gap-2">
            {user && (
              <>
                <span>Welcome, {user.firstName}</span>
                <img
                  src={user.photoUrl}
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
              </>
            )}
          </div>

          {/* MENU */}
          <div className="absolute right-0 mt-2 bg-base-100 shadow rounded p-2 w-40">
            <button
              onClick={handleProfile}
              className="block w-full text-left p-2 hover:bg-gray-200"
            >
              Profile
            </button>

            <button className="block w-full text-left p-2 hover:bg-gray-200">
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="block w-full text-left p-2 text-red-500 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
