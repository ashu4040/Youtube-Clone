import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const location = useLocation();

  if (!isMenuOpen) return null;

  const isWatchPage = location.pathname.includes("/watch");

  return (
    <div
      className={`${
        isWatchPage
          ? "absolute z-50 top-5 sm:top-16 p-5 bg-white w-38 sm:w-48 h-[calc(100vh-7vh)] mt-20 sm:mt-0"
          : "w-48 h-screen p-5 mt-24 sm:mt-14 bg-white shadow-2xl"
      }`}
    >
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>Shorts</li>
        <li>Live</li>
      </ul>
      <h1 className="font-bold pt-5">Subscriptions</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
      <ul className="pt-5">
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
    </div>
  );
};

export default SideBar;
