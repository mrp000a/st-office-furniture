import { coreInfo } from "@/components/data/core";
import { Metadata } from "next";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="flex-center flex-col max-w-384 mx-auto p-2">
        <span className="text-lg font-bold">About Us</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, ea
          aut? Necessitatibus error beatae enim sit quaerat tenetur suscipit
          laboriosam minus perspiciatis nulla consectetur debitis ab mollitia
          veniam recusandae dolorem velit cum ratione odio, deserunt sunt id in.
          Delectus neque qui pariatur tenetur, libero tempore quae voluptatibus
          eos quam ea sequi adipisci eveniet fuga atque id voluptas quaerat
          culpa, nemo ex aspernatur alias cupiditate, fugit quod ipsum! Tempore
          porro reiciendis autem, dolor ab adipisci sunt dolores quas, velit
          laborum aperiam eum iure nisi inventore culpa quo voluptas dolorem
          incidunt ipsum! A alias tempora eos hic harum, ipsam explicabo dolorum
          atque.
        </p>
      </div>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: `About | ${coreInfo.name}`,
  description: "contact page of st office furniture",
};
