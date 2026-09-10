import React, { useState } from "react";
import { ContactInfoFloating } from "../data/core";
import { AiFillMessage } from "react-icons/ai";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";

const FloatingMessage = ({}) => {
  const [showMessagesBar, setShowMessagesBar] = useState<boolean>(false);
  return (
    <div>
      {/* Floating Action Button (FAB) */}
      <div
        onClick={() => setShowMessagesBar((e) => !e)}
        className={`fixed bottom-16 right-4 md:bottom-8  md:right-8   z-50 p-2 h-14 w-14 bg-green-600 border border-gray-primary hover:bg-green-800 flex-center rounded-full cursor-pointer
      transition-all duration-300 ease-in-out
      ${showMessagesBar ? "opacity-0 scale-50 pointer-events-none invisible" : "opacity-100 scale-100 visible"}`}
      >
        <AiFillMessage className="animate-bounce h-7 w-7 text-background dark:text-foreground" />
      </div>

      {/* Open Bar Options Panel */}
      <div
        className={`fixed bottom-16 right-4 md:bottom-8  md:right-8 z-50 space-y-3 flex flex-col items-center
      transition-all duration-300 ease-in-out origin-bottom
      ${showMessagesBar ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-75 translate-y-4 pointer-events-none invisible"}`}
      >
        {ContactInfoFloating &&
          ContactInfoFloating.map(({ href, icon: Icon }, index) => (
            <Link
              target="_blank"
              className="sm:p-2 p-1 box-border h-14 w-14 bg-green-600 border border-gray-primary hover:bg-green-800 transition-all flex-center rounded-full cursor-pointer"
              href={href}
              key={index}
            >
              <Icon className="h-7 w-7 text-background dark:text-foreground" />
            </Link>
          ))}

        <div
          onClick={() => setShowMessagesBar((e) => !e)}
          className="p-2 h-14 w-14 bg-red-600 border border-gray-primary hover:bg-green-800 transition-all flex-center rounded-full cursor-pointer"
        >
          <IoMdCloseCircle className="h-7 w-7 text-background dark:text-foreground" />
        </div>
      </div>
    </div>
  );
};

export default FloatingMessage;
