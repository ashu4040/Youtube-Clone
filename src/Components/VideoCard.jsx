import React from "react";

const VideoCard = ({ info }) => {
  if (!info) {
    return <div>Loading...</div>;
  }

  const { snippet, statistics } = info;

  return (
    <div className="p-2 sm:p-4 bg-white shadow-lg rounded-md flex flex-col">
      {/* Thumbnail */}
      <div className="w-full aspect-w-16 aspect-h-9">
        <img
          src={snippet.thumbnails.medium.url}
          alt={snippet.title}
          className="w-full h-full object-cover rounded-t-md"
        />
      </div>

      {/* Text Content */}
      <div className="mt-2 flex flex-col">
        <h2 className="text-base sm:text-lg font-semibold mt-2 line-clamp-2">
          {snippet.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 truncate mt-1">
          {snippet.channelTitle}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {`Views: ${statistics?.viewCount || "N/A"}`}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
