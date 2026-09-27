import { ContactInfoFooter } from '@/components/data/core';
import React from 'react'

const Methods = () => {
  return (
    <section className="border-b border-border bg-violet-primary/10">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {ContactInfoFooter.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                className="group border-b border-border p-6 transition-colors hover:bg-background sm:nth-odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-primary/10 transition-colors group-hover:bg-green-primary">
                  <Icon className="h-5 w-5 text-green-primary transition-colors group-hover:text-white" />
                </div>

                <h2 className="mt-5 text-sm font-bold">{item.label}</h2>

                <p className="mt-1 text-xs leading-5 text-gray-primary">
                  {item.description}
                </p>

                <p className="mt-3 truncate text-sm font-semibold text-green-primary">
                  {item.href}
                </p>
              </a>
            );
          })}
        </div>
      </section>
  )
}

export default Methods
