"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";
import { faq } from "../data/core";

const FaqQuestion = () => {
  return (
    <div className="reveal h-full w-full">
      <h3 className="text-center font-bold"></h3>
      <Accordion
        defaultValue={faq[0].value}
        type="single"
        className="bg-background reveal mx-auto max-w-5xl text-lg"
      >
        {faq.map(({ label, value, content }, index) => (
          <AccordionItem className="reveal" key={index} value={value}>
            <AccordionTrigger className="text-base font-semibold">
              {label}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col text-sm">
              {content.map((e, index) => (
                <p key={index}>{e}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqQuestion;
