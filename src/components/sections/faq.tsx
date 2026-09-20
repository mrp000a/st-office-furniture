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
    <div className="h-full w-full p-4 py-12 bg-blue-primary/5 space-y-3">
      <div className="mb-4 max-w-5xl mx-auto flex items-center gap-3">
        <span className="h-px w-9 bg-primary" />

        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Frequently Asked Questions
        </span>
      </div>
      <h3 className=" text-center font-bold"></h3>
      <Accordion
        defaultValue={faq[0].value}
        type="single"
        className="max-w-5xl mx-auto text-lg bg-background"
      >
        {faq.map(({ label, value, content }, index) => (
          <AccordionItem key={index} value={value}>
            <AccordionTrigger className="font-semibold text-base">
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
