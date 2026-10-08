import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrl } from "@/lib/getImageUrl";
import { formatDate } from "@/lib/secApi";

type ReviewCardProps = {
  review: {
    id: number;
    rating: number;
    note: string | null;
    createdAt: Date;
    user: {
      name: string | null;
      email: string | null;
      image: string | null;
    };
  };
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="flex gap-4 rounded-md border-b py-4">
      <Avatar className="size-10">
        <AvatarImage alt="userImage" src={getImageUrl(review.user.image)} />
        <AvatarFallback>
          {review.user.name?.charAt(0).toUpperCase() ?? "U"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between gap-4">
          <div className="">
            <h4 className="font-semibold">{review.user.name ?? "Anonymous"}</h4>
            {/* <span className="text-gray-primary break-after-auto text-xs">
              {review.user.email ?? "N/A"}
            </span> */}
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-muted-foreground text-xs">
              {formatDate(review.createdAt)}
            </p>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`size-4 ${
                    star <= review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {review.note && (
          <p className="text-muted-foreground text-sm leading-6 whitespace-pre-line">
            {review.note}
          </p>
        )}
      </div>
    </div>
  );
}
