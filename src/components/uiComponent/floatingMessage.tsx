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
        className={`border-gray-primary flex-center fixed right-4 bottom-16 z-50 h-14 w-14 cursor-pointer rounded-full border bg-green-600 p-2 transition-all duration-300 ease-in-out hover:bg-green-800 md:right-8 md:bottom-8 ${showMessagesBar ? "pointer-events-none invisible scale-50 opacity-0" : "visible scale-100 opacity-100"}`}
      >
        <AiFillMessage className="text-background dark:text-foreground h-7 w-7 animate-bounce" />
      </div>

      {/* Open Bar Options Panel */}
      <div
        className={`fixed right-4 bottom-16 z-50 flex origin-bottom flex-col items-center space-y-3 transition-all duration-300 ease-in-out md:right-8 md:bottom-8 ${showMessagesBar ? "visible translate-y-0 scale-100 opacity-100" : "pointer-events-none invisible translate-y-4 scale-75 opacity-0"}`}
      >
        {ContactInfoFloating &&
          ContactInfoFloating.map(({ href, icon: Icon }, index) => (
            <Link
              target="_blank"
              className="border-gray-primary flex-center box-border h-14 w-14 cursor-pointer rounded-full border bg-green-600 p-1 transition-all hover:bg-green-800 sm:p-2"
              href={href}
              key={index}
            >
              <Icon className="text-background dark:text-foreground h-7 w-7" />
            </Link>
          ))}

        <div
          onClick={() => setShowMessagesBar((e) => !e)}
          className="border-gray-primary flex-center h-14 w-14 cursor-pointer rounded-full border bg-red-600 p-2 transition-all hover:bg-green-800"
        >
          <IoMdCloseCircle className="text-background dark:text-foreground h-7 w-7" />
        </div>
      </div>
    </div>
  );
};

export default FloatingMessage;
