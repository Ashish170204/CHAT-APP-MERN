import React from 'react';
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(
  selectedConversation?._id?.toString()
  );

return (
  <div className="flex space-x-4 h-[10vh] px-3 py-3 bg-gray-700">
    <div className={`avatar ${isOnline ? "online" : ""}`}>
      <div className="w-12 rounded-full">
        <img src="https://i.pinimg.com/736x/44/93/f3/4493f30f04ea1881d3df9956bf62f91a.jpg" />
      </div>
    </div>

    <div>
      <h1 className="text-xl">
        {selectedConversation?.name || "Select a user"}
      </h1>

      <span className="text-sm">
        {selectedConversation
          ? (isOnline ? "Online" : "Offline")
          : ""}
      </span>
    </div>
  </div>
);
}

export default Chatuser;