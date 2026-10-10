"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { AiFillMessage } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { ContactInfoFloating } from "../data/core";

const FloatingMessage = () => {
  const [showMessagesBar, setShowMessagesBar] = useState(false);

  return (
    <div className="fixed right-4  bottom-15  z-50 md:right-7 md:bottom-7">
      <AnimatePresence>
        {!showMessagesBar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="relative"
          >
            {/* Soft pulse */}
            <motion.span
              animate={{ scale: [1, 1.45, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-green-600/40"
            />

            {/* FAB */}
            <button
              type="button"
              onClick={() => setShowMessagesBar(true)}
              aria-label="Open contact options"
              className="group text-background relative flex size-14 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-green-600 shadow-[0_10px_35px_-8px_rgba(22,163,74,0.7)] transition-all duration-300 hover:scale-105 hover:bg-green-700 hover:shadow-[0_14px_40px_-8px_rgba(22,163,74,0.85)] active:scale-95 sm:size-15"
            >
              <span className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <AiFillMessage className="relative size-7 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMessagesBar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 bottom-0 flex flex-col items-end gap-3"
          >
            {/* Header label */}
            <motion.div
              initial={{ opacity: 0, x: 12, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.05 }}
              className="border-border/60 bg-background/95 text-foreground mr-1 mb-1 rounded-full border px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur-md"
            >
              How can we help?
            </motion.div>

            {/* Contact options */}
            {ContactInfoFloating?.map(({ name, href, icon: Icon }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 25, scale: 0.7 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.7 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 24,
                  delay: index * 0.06,
                }}
                className="group flex items-center gap-2"
              >
                {/* Desktop label */}
                <span className="border-border/60 bg-background/95 text-foreground pointer-events-none hidden rounded-lg border px-3 py-1.5 text-xs font-medium whitespace-nowrap opacity-0 shadow-md transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100 sm:block">
                  {name}
                </span>

                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact us"
                  className="group/button text-background relative flex size-12 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-green-600 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-700 hover:shadow-xl active:scale-95 sm:size-13"
                >
                  <span className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/button:opacity-100" />
                  <Icon className="relative size-6 transition-transform duration-300 group-hover/button:scale-110" />
                </Link>
              </motion.div>
            ))}

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ delay: (ContactInfoFloating?.length ?? 0) * 0.06 }}
              type="button"
              onClick={() => setShowMessagesBar(false)}
              aria-label="Close contact options"
              className="group border-border/60 bg-background text-foreground hover:bg-muted mt-1 flex size-14 items-center justify-center rounded-full border shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 sm:size-15"
            >
              <IoMdClose className="size-7 transition-transform duration-300 group-hover:rotate-90" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingMessage;
