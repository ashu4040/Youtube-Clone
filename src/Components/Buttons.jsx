import React from "react";

const Buttons = ({ name }) => {
  return (
    <div>
      <button className="p-3 m-2 ml-5 bg-gray-500 text-white rounded-xl ">
        {name}
      </button>
    </div>
  );
};

export default Buttons;
