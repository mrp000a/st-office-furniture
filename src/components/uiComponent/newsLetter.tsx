"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Button } from "../ui/button";

const NewsLetter = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    toast.success("Subscribed to Newsletter! Thank You", {
      description: new Date().toDateString(),
    });
    setEmail("");
    return;
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-90 flex gap-2 items-center  p-1 rounded-md"
      >
        <Input
          className="bg-background/90"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          type="submit"
          className="bg-red-primary"
          // className="px-2 py-1 active:translate-y-[0.5px] rounded-md bg-red-primary text-background font-semibold hover:ring-1 active:ring-2 ring-gray-primary ring hover:bg-red-primary/50 transition-all hover:outline hover:outline-gray-primary/40"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewsLetter;
