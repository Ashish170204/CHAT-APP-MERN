import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Search from "./Search";
import Users from "./Users";

function Left() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ☰ MENU BUTTON (only mobile) */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 text-white text-3xl"
        onClick={() => setOpen(true)}
      >
        <FiMenu />
      </button>

      {/* OVERLAY (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:relative top-0 left-0 h-full z-50
          w-[80%] sm:w-[70%] md:w-[30%] lg:w-[25%]
          bg-black text-gray-300
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* ❌ CLOSE BUTTON (mobile) */}
        <div className="md:hidden flex justify-end p-4">
          <FiX
            className="text-3xl cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="font-bold text-3xl px-5 pb-3">Chat</div>

        <Search />
        <hr />
        <Users />
      </div>
    </>
  );
}

export default Left;