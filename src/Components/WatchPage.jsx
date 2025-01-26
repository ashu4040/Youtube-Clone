import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/navSlice";
import { useSearchParams } from "react-router-dom";
import Comment from "./Comment";
import RightSideWatchPage from "./RightSideWatchPage";
import LiveChats from "./LiveChats";
import { useState } from "react";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const videoId = searchParams.get("v");

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  if (!videoId) {
    return <p>Loading...</p>;
  }

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const toggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  return (
    <div className="h-[calc(100vh-15vh)] sm:h-screen  overflow-hidden mt-28 sm:mt-0">
      <div className="w-screen  flex flex-col sm:flex-row justify-evenly">
        <div className="px-5 py-2 sm:py-20 w-full sm:w-2/3  ">
          <div>
            <iframe
              className="rounded-xl  w-full h-[15rem] sm:w-[68.75rem] sm:h-[31.25rem]"
              src={"https://www.youtube.com/embed/" + videoId}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          <div className="">
            <div
              className="overflow-hidden mt-4 p-2 bg-gray-200 rounded cursor-pointer sm:hidden"
              onClick={toggleComments}
            >
              {isCommentsOpen ? "Hide Comments" : "Show Comments"}
            </div>

            <div
              className={`overflow-hidden mt-4 ${
                isCommentsOpen ? "block" : "hidden"
              } sm:block h-screen`}
            >
              <Comment videoId={videoId} />
            </div>
          </div>
        </div>

        <div className="">
          <div className="mt-20 h-[500px] w-full border border-black overflow-hidden rounded-md  hidden sm:hidden md:hidden lg:block ">
            <LiveChats />
          </div>
          {!isCommentsOpen ? (
            <div className=" mt-2 md:mt-[600px] h-[calc(100vh-600px)] lg:mt-2">
              <RightSideWatchPage />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
