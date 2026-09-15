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
    <div className="h-full w-full">
      <h3 className=" text-center font-bold">Frequently Asked Questions</h3>
      <Accordion
        defaultValue={faq[0].value}
        type="single"
        className="max-w-384 mx-auto text-lg bg-background"
      >
        {faq.map(({ label, value, content }, index) => (
          <AccordionItem key={index} value={value}>
            <AccordionTrigger className="font-semibold">
              {label}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col ">
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
