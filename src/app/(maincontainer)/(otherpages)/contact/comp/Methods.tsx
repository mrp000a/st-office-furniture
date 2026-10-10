import { ContactInfoFooter } from "@/components/data/core";
import React from "react";

const Methods = () => {
  return (
    <section className="border-border bg-violet-primary/10 border-b">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {ContactInfoFooter.map((item, index) => {
          const Icon = item.icon;

          return (
            <a
              key={index}
              href={item.href}
              className="group border-border hover:bg-background sm:nth-odd:border-r border-b p-6 transition-colors lg:border-r lg:border-b-0 lg:last:border-r-0"
            >
              <div className="bg-green-primary/10 group-hover:bg-green-primary flex h-11 w-11 items-center justify-center rounded-xl transition-colors">
                <Icon className="text-green-primary h-5 w-5 transition-colors group-hover:text-white" />
              </div>

              <h2 className="mt-5 text-sm font-bold">{item.label}</h2>

              <p className="text-gray-primary mt-1 text-xs leading-5">
                {item.description}
              </p>

              <p className="text-green-primary mt-3 truncate text-sm font-semibold">
                {item.href}
              </p>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default Methods;
