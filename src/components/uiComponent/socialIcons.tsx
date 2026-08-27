import React from "react";
import { SocialLinks } from "../data/core";
import Link from "next/link";

const SocialIcons = () => {
  return (
    <div className="flex items-center gap-2 ">
      {SocialLinks.map(({ href, icon: Icon }, index) => (
        <Link
          href={href}
          target="_blank"
          className="text-lg p-2 hover:-translate-y-0.5 font-semibold rounded-md border border-red-primary bg-gray-secondary/30 hover:bg-red-primary transition-all"
          key={index}
        >
          <Icon />
        </Link>
      ))}
    </div>
  );
};

export default SocialIcons;
