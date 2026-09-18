import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ReviewCardProps = {
  review: {
    id: number;
    rating: number;
    note: string | null;
    createdAt: Date;
    user: {
      name: string | null;
      image: string | null;
    };
  };
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="flex gap-4 border-b py-5">
      <Avatar className="size-10">
        <AvatarImage
          src={
            review.user.image
              ? `${process.env.NEXT_PUBLIC_URL_R2}/${review.user.image}`
              : undefined
          }
        />
        <AvatarFallback>
          {review.user.name?.charAt(0).toUpperCase() ?? "U"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold">{review.user.name ?? "Anonymous"}</h4>

            <p className="text-xs text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>

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

        {review.note && (
          <p className="text-sm leading-6 text-muted-foreground">
            {review.note}
          </p>
        )}
      </div>
    </div>
  );
}
