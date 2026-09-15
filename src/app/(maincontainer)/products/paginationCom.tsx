"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";


type Props = {
  currentPage: number;
  totalPages: number;
};

export default function ProductPagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const params = new URLSearchParams(searchParams);

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-2 p-2">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </Button>

        <span className="px-3 text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
      {/* <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={currentPage === 1}
              onClick={() => {
                if (currentPage === 1) return;
                goToPage(currentPage - 1);
              }}
            >
              <Button variant="outline">Previous</Button>
            </PaginationPrevious>
          </PaginationItem>

          {}
          {currentPage > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <div className="flex items-center gap-3">
            {currentPage > 1 && (
              <PaginationItem
                className="cursor-pointer"
                onClick={() => {
                  if (currentPage === 1) return;
                  goToPage(currentPage - 1);
                }}
              >
                {currentPage - 1}
              </PaginationItem>
            )}
            <PaginationItem>{currentPage}</PaginationItem>
            <PaginationItem
              className="cursor-pointer"
              onClick={() => {
                if (currentPage === totalPages) return;
                goToPage(currentPage + 1);
              }}
            >
              {currentPage < totalPages ? currentPage + 1 : totalPages}
            </PaginationItem>
          </div>

          <PaginationItem>
            {currentPage < totalPages - 1 ? <PaginationEllipsis /> : ""}
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              aria-disabled={currentPage === totalPages}
              onClick={() => {
                if (currentPage === totalPages) return;
                goToPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </>
  );
}
