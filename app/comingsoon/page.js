import Marquee from "@/components/ui/marquee";
import Image from "next/image";
import React from "react";

const ComingSoon = () => {
  const items = ["Coming Soon", "Segera Hadir"];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Marquee items={items} />
      <img src="/comingsoonposter.png" alt="logo" className="w-full p-20" />
      <Marquee items={items} />
    </div>
  );
};

export default ComingSoon;
