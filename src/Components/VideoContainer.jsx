import React, { useEffect, useState } from "react";
import { Youtube_Api } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const data = await fetch(Youtube_Api);
      const json = await data.json();
      setVideos(json.items || []);
    } catch (err) {
      setError("Failed to fetch videos. Please try again later.");
    }
  };

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  if (!videos.length) {
    return <div className="text-center mt-4">No videos available.</div>;
  }

  return (
    <div className="grid grid-cols-1 mt-7 sm:mt-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {videos.map((video) => (
        <Link
          key={video.id?.videoId || video.id}
          to={`/watch?v=${video.id?.videoId || video.id}`}
        >
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
