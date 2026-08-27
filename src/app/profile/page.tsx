"use client";
import { ProfileDefaultImage } from "@/components/data/core";
import HomeNav from "@/components/layout/homeNav";
import { SignOut } from "@/components/sec_lib/Sessions";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Home = () => {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  if (session.status === "authenticated") {
    const user = session.data.user;
    return (
      <>
        <div className="absolute z-1 aspect-video top-0 w-full h-screen ">
          <Image
            fill
            className="object-cover object-center w-full h-full "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={`${process.env.NEXT_PUBLIC_URL_R2}/${user.image ? user.image : ProfileDefaultImage}`}
            alt=""
          />
        </div>
        <div className="bg-background/40 relative z-20 backdrop-blur-2xl w-full min-h-screen">
          <div className="flex-center flex-col gap-3  relative ">
            <h2 className="text-2xl font-bold"> Hey {user.name}!</h2>
            <span>Please Wait for the Varification Process!</span>
            <span>{user.email}</span>
            <div className="relative max-w-100 w-80 h-80 aspect-video outline-4 outline-gray-primary/40  rounded-full overflow-hidden text-shadow-2xs text-shadow-blue-primary">
              <Image
                fill
                className={`object-cover object-center overflow-hidden rounded-full relative w-200 h-300 ${user.image ? "" : "mix-blend-darken"}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={`${process.env.NEXT_PUBLIC_URL_R2}/${user.image ? user.image : ProfileDefaultImage}`}
                alt=""
              />
            </div>
            <span> Role Status: {user.role}</span>
            <span> Role Status: {user.image}</span>
            <span> Address: {user.address}</span>
            <span className="overflow-clip break-all"> ID: {user.id}</span>
            <Button variant={"secondary"} onClick={SignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex-center text-2xl font-bold my-5">
        <h2>Waiting Page</h2>
      </div>
    </>
  );
};

export default Home;
