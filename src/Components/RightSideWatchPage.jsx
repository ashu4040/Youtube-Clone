import React, { useEffect, useState } from "react";
import { Youtube_Api } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const RightSideWatchPage = () => {
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(Youtube_Api);
    const json = await data.json();
    setInfo(json.items);
  };

  if (!info) {
    return null;
  }

  const handleVideo = (videoId) => {
    navigate(`/watch?v=${videoId}`);
  };

  return (
    <div className=" h-screen ml-5 sm:ml-0 w-80 sm:w-96">
      <div className="h-9vh mb-2 font-bold sm:shadow-2xl">
        <h1 className="text-lg sm:text-2xl">Recommendations</h1>
      </div>
      <div className="overflow-y-scroll h-screen sm:h-[calc(91vh-600px)]">
        {info.map((e) => (
          <div
            className=" flex cursor-pointer "
            key={e.id}
            onClick={() => handleVideo(e.id)}
          >
            <div className="pb-2">
              <img
                className="w-44"
                src={e.snippet.thumbnails.medium.url}
                alt=""
              />
            </div>
            <div className="w-1/2 ml-2">
              <p className="font-semibold text-sm max-h-11 overflow-hidden text-ellipsis">
                {e.snippet.title}
              </p>
              <p className="text-sm">{e.snippet.channelTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideWatchPage;
