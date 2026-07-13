import React, { useState } from 'react';
import { RiSendPlaneFill } from "react-icons/ri";
import useSendMessage from "../../context/useSendMessage.js";

function Type() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

     const handleSubmit = async (e) => {
      console.log(e);
      e.preventDefault();
      await sendMessages(message);
      setMessage("");
    };

   return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center h-[8vh] px-3 bg-gray-800">
        
        {/* Input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type here"
          className="flex-1 py-3 px-4 rounded-xl outline-none 
                     bg-slate-900 text-gray-200 
                     border border-gray-700"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={loading}
          className="ml-3 text-2xl text-blue-500 hover:text-blue-400 transition"
        >
          <RiSendPlaneFill />
        </button>

      </div>
    </form>
  );
}

export default Type;