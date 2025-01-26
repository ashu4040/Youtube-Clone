import React from "react";
import Buttons from "./Buttons";
const ButtonList = () => {
  const List = [
    "All",
    "Popular",
    "Trending",
    "Funny",
    "Music",
    "Romantic",
    "Sad",
    "Love",
  ];

  return (
    <div className="flex overflow-x-auto whitespace-nowrap w-full">
      {List.map((name, index) => (
        <Buttons key={index} name={name} />
      ))}
    </div>
  );
};

export default ButtonList;
