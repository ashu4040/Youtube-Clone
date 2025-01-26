import React, { useEffect, useState } from "react";
import { getCommentKey } from "../utils/constants";

const Comment = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (videoId) {
      getComments(videoId);
    }
  }, [videoId]);

  const getComments = async (videoId) => {
    try {
      const data = await fetch(getCommentKey(videoId));
      const json = await data.json();

      setComments(json.items || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  if (comments.length === 0) {
    return <p>Loading comments...</p>;
  }

  return (
    <div className="h-screen sm:h-[calc(100vh-600px)] bg-gray-100 ">
      <div className="h-9vh mb-2 font-bold shadow-2xl">
        <h1 className="text-2xl">Comments</h1>
      </div>

      <div className="overflow-y-scroll h-full sm:h-[calc(91vh-600px)]">
        {comments.map((comment, index) => (
          <div key={index} className="mb-4 ">
            <div className="flex items-center">
              <img
                className=" w-8 h-8 rounded-full mr-2"
                src={
                  comment.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
                alt="Profile"
              />
              <h1 className="font-semibold">
                {comment.snippet.topLevelComment.snippet.authorDisplayName}
              </h1>
            </div>
            <p className="ml-9 w-[calc(100vw-22vw)] sm:w-1/2">
              {comment.snippet.topLevelComment.snippet.textOriginal}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
