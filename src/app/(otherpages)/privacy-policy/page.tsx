import { coreInfo } from "@/components/data/core";
import { Metadata } from "next";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="flex-center gap-4 flex-col max-w-300 mx-auto p-4 box-border rounded-lg bg-background shadow-lg shadow-foreground/30 ">
        <span className="text-lg font-bold py-4 border-b-2 border-b-foreground/50 w-full text-center">Pirvary Policy</span>
        <hr />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At assumenda
          quas hic quibusdam exercitationem optio, accusamus fuga doloribus
          veritatis aperiam dolorem? Sed enim totam laboriosam soluta quod vitae
          exercitationem? Illo error ducimus doloremque assumenda rem, quia
          sequi nulla ad blanditiis quaerat, totam possimus deleniti facilis a
          itaque quae vitae consequatur cupiditate voluptatibus in. Rem
          laboriosam, suscipit quis officiis numquam blanditiis impedit labore
          eaque in doloremque sequi excepturi tenetur! Sit voluptas numquam,
          minus autem voluptatum alias corrupti quo. Iusto sapiente quasi
          repellat totam illum aut quos, exercitationem suscipit deserunt
          perspiciatis itaque ullam beatae porro, esse consectetur quas nam
          consequuntur dignissimos eius impedit dolorum? Dignissimos rem eum
          deserunt, corrupti voluptatum vero omnis pariatur eveniet modi, nulla
          nostrum voluptatibus amet enim consectetur exercitationem commodi
          perferendis qui?
        </p>
      </div>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: `Contact | ${coreInfo.name}`,
  description: "contact page of st office furniture",
};
