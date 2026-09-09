import { coreInfo } from "@/components/data/core";
import { Metadata } from "next";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="flex-center max-w-384 mx-auto p-2">
        <span className="text-lg font-bold">Contact Us</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero maxime
          quas ea et, ducimus tempora quam explicabo, atque recusandae ad
          necessitatibus molestias! Officiis obcaecati quaerat sapiente deleniti
          ducimus et esse odio. Fuga odit quisquam, eos, sint repudiandae nihil
          laborum perspiciatis iusto nesciunt alias voluptatum officiis eligendi
          placeat consequuntur consectetur corporis quidem esse. Explicabo
          fugiat labore dolore neque pariatur voluptate, sint quod ullam aperiam
          doloribus illum dolores laboriosam unde doloremque dignissimos nulla
          accusamus aliquid. Alias facilis fugiat ipsam tenetur pariatur iste
          nobis ad debitis perspiciatis recusandae reprehenderit totam earum
          eaque obcaecati vero, assumenda tempore inventore, fugit distinctio,
          nihil hic consequatur. Quo.
        </p>
      </div>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: `Services | ${coreInfo.name}`,
  description: "Services page of st office furniture",
};
