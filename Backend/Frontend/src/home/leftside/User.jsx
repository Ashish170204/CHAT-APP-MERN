import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
  

function User({ user }) {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id;
    const { socket, onlineUsers } = useSocketContext();
    //  Ensure consistent string comparison
  const isOnline = onlineUsers?.includes(user._id.toString());

  return (

    <div className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}>
      <div className='flex space-x-4 px-8 py-5 hover:bg-slate-600 duration-300 cursor-pointer'>
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src="https://i.pinimg.com/736x/44/93/f3/4493f30f04ea1881d3df9956bf62f91a.jpg" />
          </div>
        </div>

        <div>
          <h1 className='font-bold'>{user.name}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
    
  );
}

export default User;