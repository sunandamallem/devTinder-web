import React, { useEffect } from "react";
import NavBar from "./NavBar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.jsx";

const Body = () => {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    console.log("fetching user");
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {}
  };

  useEffect(() => {
    console.log("loading....");
    fetchUser();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Main content grows and pushes footer down */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;
