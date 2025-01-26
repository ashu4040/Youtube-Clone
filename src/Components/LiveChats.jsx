import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/LiveCommentSlice";

import { emoji, generate, makeid } from "../utils/helper";

const LiveChats = () => {
  const [liveChat, setLiveChat] = useState("");
  const dispatch = useDispatch();
  const liveComment = useSelector((store) => store.chat.message);
  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generate(),
          comments: makeid(20),
          emoji: emoji(),
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, []);

  return (
    <div>
      <div className="h-10 ">
        <h2 className="font-black p-2 shadow-lg">LIVE CHATS</h2>
      </div>
      <div className="p-2 mt-2 overflow-y-scroll h-[calc(500px-11vh)] flex flex-col-reverse">
        {liveComment.map((c, index) => (
          <div className="flex items-center mt-2" key={index}>
            <div>
              <img
                className="h-8"
                src="https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg"
                alt="userName"
              />
            </div>
            <div className="flex">
              <p className="font-semibold mr-2">{c.name} </p>
              <p>
                {c.comments} {c.emoji ? c.emoji : null}
              </p>
            </div>
          </div>
        ))}
      </div>
      <form
        className="flex w-full h-9vh items-center p-2 "
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessage({
              name: "Ayush",
              comments: liveChat,
            })
          );
          setLiveChat("");
        }}
      >
        <input
          type="text "
          placeholder="chat"
          className="w-60 border border-black p-1 mr-3"
          value={liveChat}
          onChange={(e) => setLiveChat(e.target.value)}
        />
        <button className="bg-red-500 p-2 rounded-md ">send</button>
      </form>
    </div>
  );
};

export default LiveChats;
