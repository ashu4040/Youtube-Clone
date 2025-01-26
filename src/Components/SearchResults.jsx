import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Search_Result, Youtube_Api } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const [videos, setVideos] = useState([]);
  const searchQuery = useSelector((store) => store.searchResult.query);

  useEffect(() => {
    console.log("hhi" + searchQuery);
    if (searchQuery) {
      fetchVideos(searchQuery);
    }
  }, [searchQuery]);

  const fetchVideos = async (searchQuery) => {
    try {
      const data = await fetch(
        `${Search_Result}&q=${encodeURIComponent(searchQuery)}&maxResults=30`
      );
      const json = await data.json();
      console.log(json);
      setVideos(json.items || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  if (!videos.length) {
    return (
      <p className="text-center mt-8">No videos found for "{searchQuery}"</p>
    );
  }

  return (
    <div className="p-4 mt-20 sm:mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {videos.map((video) => (
          <Link key={video.id} to={"/watch?v=" + video.id.videoId}>
            <div
              key={video.id.videoId}
              className="border rounded overflow-hidden p-2 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <img
                className="w-full rounded"
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
              <h3 className="font-semibold text-sm mt-2 line-clamp-2">
                {video.snippet.title}
              </h3>
              <p className="text-xs text-gray-500">
                {video.snippet.channelTitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
