"use client";
import { AdminNavItems } from "@/components/data/core";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div>
        {/* left side of page  */}
        <div className="flex flex-col justify-center">
          {/* buttons */}
          {AdminNavItems.map(({ href, label }, index) => (
            <Link key={index} className="" href={href}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
