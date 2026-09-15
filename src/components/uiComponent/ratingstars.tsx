"use client";

import { Star } from "lucide-react";
import { FaRegStar, FaStar } from "react-icons/fa6";

type RatingStarsProps = {
  rating: number;
  size?: number;
};

export default function RatingStars({ rating, size = 16 }: RatingStarsProps) {
  const safeRating = Math.max(0, Math.min(5, rating));

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => {
        const fill = Math.max(0, Math.min(1, safeRating - index));

        return (
          <div
            key={index}
            className="relative"
            style={{
              width: size,
              height: size,
            }}
          >
            {/* Empty star */}
            <FaRegStar size={size} className="absolute " />

            {/* Filled part */}
            <div
              className="absolute left-0 top-0 overflow-hidden"
              style={{
                width: `${fill * 100}%`,
                height: size,
              }}
            >
              <FaStar size={size} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
