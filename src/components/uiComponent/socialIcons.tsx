import React from "react";
import { SocialLinks } from "../data/core";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const SocialIcons = () => {
  return (
    <div className="flex items-center gap-2">
      {SocialLinks.map(({ label, href, icon: Icon }, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Link
              href={href}
              target="_blank"
              className="hover:text-background hover:dark:text-foreground border-green-primary bg-gray-secondary/30 hover:bg-green-primary rounded-md border p-2 text-lg font-semibold transition-all hover:-translate-y-0.5"
            >
              <Icon name={label} />
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
