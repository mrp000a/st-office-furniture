import React from "react";
import { SocialLinks } from "../data/core";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const SocialIcons = () => {
  return (
    <div className="flex items-center gap-2 ">
      {SocialLinks.map(({ label, href, icon: Icon }, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Link
              href={href}
              target="_blank"
              className="text-lg p-2 hover:-translate-y-0.5 font-semibold rounded-md border border-red-primary bg-gray-secondary/30 hover:bg-red-primary transition-all"
            >
              <Icon />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default SocialIcons;
