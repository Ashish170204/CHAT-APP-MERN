import React, { useEffect } from "react";
import Chatuser from './Chatuser';
import Messages from './Messages';
import Type from './Type';
import useConversation from "../../statemanage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null); // cleanup on unmount
  }, [setSelectedConversation]);

  // return (
  //   <div className="w-full bg-slate-900 text-gray-300">
  //     <div>
  //       {!selectedConversation ? (
  //         <NoChatSelected />
  //       ) : (
  //         <>
  //           <Chatuser />
  //           <div
  //             className="flex-1 overflow-y-auto"
  //             style={{ maxHeight: "calc(88vh - 8vh)" }}
  //           >
  //             <Messages />
  //           </div>
  //           <Type /> {/* corrected here */}
  //         </>
  //        )} 
  //     </div>
  //   </div>

  // );

  return (
    <div className="w-full h-full bg-slate-900 text-gray-300 flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <Chatuser />

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <Messages />
          </div>

          {/* Type bar at bottom */}
          <div className="border-t border-gray-700">
            <Type />
          </div>
        </>
      )}
    </div>
  );

}

export default Right;


const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-center"> 
        Welcome{" "}
        <span className="font-semibold text-xl">
          {authUser.user.name}
        </span>
        <br />
        No chat selected, please start a conversation by selecting anyone from
        your contacts
      </h1>
    </div>
  );
};