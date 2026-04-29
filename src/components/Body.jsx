import React from "react";
import NavBar from "./NavBar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const Body = () => {
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
