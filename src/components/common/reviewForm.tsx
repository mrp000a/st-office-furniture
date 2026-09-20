"use client";

import { Controller, useForm } from "react-hook-form";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ProReviewAdd } from "../actions/ProReviewAdd";
import { InputErrorMessage } from "../uiComponent/uiCom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAlertDialog } from "../hooks/use-alert-dialog";
import { title } from "process";
type ReviewFormData = {
  rating: number;
  note: string;
};

type ReviewFormProps = {
  productId: number;
  productCode: string;
};

const ReviewForm = ({ productId, productCode }: ReviewFormProps) => {
  const session = useSession();
  const router = useRouter();
  const { confirm } = useAlertDialog();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      note: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    if (!session?.data) {
      const logIn = await confirm({
        title: "Please Log In to put a review!",
        description: "Your mush have to be logged in.",
        confirmText: "Log In"
      });

      if (logIn) router.push(`/signin?callbackUrl=products/${productCode}`);
      return;
    }
    const result = await ProReviewAdd({
      productId,
      rating: data.rating,
      note: data.note.trim() || null,
    });

    if (result.success) {
      toast.success("Thanks for your feedback!", {
        description: new Date().toDateString(),
      });
      const time = setTimeout(() => {
        router.refresh();
        clearTimeout(time);
      }, 500);
      reset();
    } else {
      toast.error(result.message ?? "something went wrong.");
    }
  };

  return (
    <div className="w-full rounded-xl border bg-background p-2">
      <div className="mb-2">
        <h2 className="text-lg font-semibold">Write a Review</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Share your experience with this product.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* Rating */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Rating</label>

          <Controller
            name="rating"
            control={control}
            rules={{
              validate: (value) => value >= 1 || "Please select a rating.",
            }}
            render={({ field }) => (
              <div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.onChange(star)}
                      className="rounded-md  transition-transform hover:scale-110 "
                      aria-label={`Rate ${star} out of 5`}
                    >
                      <Star
                        className={`size-7 ${
                          star <= field.value
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}

                  {field.value > 0 && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      {field.value}/5
                    </span>
                  )}
                </div>

                {errors.rating && (
                  <InputErrorMessage>{errors.rating.message}</InputErrorMessage>
                )}
              </div>
            )}
          />
        </div>

        {/* Review */}
        <div className="space-y-2">
          <label htmlFor="note" className="text-sm font-medium">
            Your Review
            <span className="ml-1 text-muted-foreground">(Optional)</span>
          </label>

          <Textarea
            id="note"
            {...register("note", {
              maxLength: {
                value: 1000,
                message: "Review cannot exceed 1000 characters.",
              },
            })}
            placeholder="Tell us what you think about this product..."
            rows={5}
            maxLength={1000}
            className="resize-none"
          />

          <div className="flex justify-between">
            {errors.note ? (
              <p className="text-sm text-destructive">{errors.note.message}</p>
            ) : (
              <span />
            )}

            <span className="text-xs text-muted-foreground">
              Max 1000 characters
            </span>
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
