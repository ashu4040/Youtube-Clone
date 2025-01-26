import React from "react";
import SideBar from "./SideBar";

import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
