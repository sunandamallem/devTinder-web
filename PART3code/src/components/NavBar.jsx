import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  console.log(user);

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
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost flex items-center gap-2"
          >
            {user && (
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">
                  Welcome, {user.firstName}
                </div>
                <div className="w-10 rounded-full overflow-hidden">
                  <img
                    alt="user Photo"
                    src={user.photoUrl}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
