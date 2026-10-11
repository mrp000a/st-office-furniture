"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, LoaderCircle, Search, X } from "lucide-react";

import { Product } from "@/generated/prisma";
import { getProducts } from "@/lib/api";
import { getImageUrlProduct } from "@/lib/getImageUrl";
import { Input } from "../ui/input";

type ProductSearchContainerProps = {
  focusRef?: React.RefObject<HTMLInputElement | null>;
  overLayer?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductSearchContainer = ({
  focusRef,
  overLayer,
}: ProductSearchContainerProps) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);

  const searchProducts = useCallback(async (search: string) => {
    const id = ++requestId.current;

    if (!search.trim()) {
      setProducts([]);
      setLoading(false);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(false);

    try {
      const data = await getProducts({
        searchString: search.trim(),
      });

      // Ignore outdated requests.
      if (id !== requestId.current) return;

      if (!data.success) {
        setProducts([]);
        return;
      }

      setProducts(data.result);
    } catch {
      if (id === requestId.current) {
        setProducts([]);
      }
    } finally {
      if (id === requestId.current) {
        setLoading(false);
        setHasSearched(true);
      }
    }
  }, []);

  useEffect(() => {
    const search = query.trim();

    if (!search) {
      requestId.current++;
      setProducts([]);
      setLoading(false);
      setHasSearched(false);
      return;
    }

    const timer = window.setTimeout(() => {
      void searchProducts(search);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [query, searchProducts]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const navigateToSearch = () => {
    const search = query.trim();

    if (!search) return;

    setIsOpen(false);
    router.push(`/products?search=${encodeURIComponent(search)}`);
  };

  const navigateToProduct = (product: Product) => {
    setIsOpen(false);
    setQuery("");
    overLayer?.(false);
    router.push(`/products/${product.productCode}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === "ArrowDown" && products.length > 0) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) =>
        current < products.length - 1 ? current + 1 : 0,
      );
      return;
    }

    if (event.key === "ArrowUp" && products.length > 0) {
      event.preventDefault();
      setActiveIndex((current) =>
        current > 0 ? current - 1 : products.length - 1,
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (isOpen && activeIndex >= 0 && products[activeIndex]) {
        navigateToProduct(products[activeIndex]);
      } else {
        navigateToSearch();
      }
    }
  };

  const showSuggestions = isOpen && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl flex-1">
      {/* Search input */}

      <div
        className={[
          "group relative flex h-11 w-full min-w-0 items-center gap-2",
          "border-border bg-background rounded-full border px-3",
          "shadow-sm transition-all duration-200",
          "hover:border-muted-foreground/40",
          "focus-within:border-primary/60",
          "focus-within:ring-primary/10 focus-within:ring-4",
          "focus-within:shadow-md",
        ].join(" ")}
      >
        <Search
          size={19}
          strokeWidth={2}
          aria-hidden="true"
          className="text-muted-foreground group-focus-within:text-primary shrink-0 transition-colors"
        />

        <input
          ref={focusRef}
          id="product-search"
          type="text"
          role="combobox"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(-1);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search chairs, desks, accessories..."
          aria-label="Search products"
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
          aria-controls="product-search-suggestions"
          aria-activedescendant={
            showSuggestions && activeIndex >= 0
              ? `product-search-option-${activeIndex}`
              : undefined
          }
          autoComplete="off"
          className={[
            "h-full min-w-0 flex-1",
            "border-0 bg-transparent p-0 text-sm shadow-none outline-none",
            "placeholder:text-muted-foreground/75 ring-0",
            "focus-visible:border-0 focus-visible:outline-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
          ].join(" ")}
        />

        {loading && (
          <LoaderCircle
            size={17}
            aria-hidden="true"
            className="text-muted-foreground shrink-0 animate-spin"
          />
        )}

        {query && !loading && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveIndex(-1);
              setIsOpen(false);
              focusRef?.current?.focus();
            }}
            aria-label="Clear search"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-7 shrink-0 items-center justify-center rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        )}

        <button
          type="button"
          onClick={navigateToSearch}
          disabled={!query.trim()}
          aria-label="Search"
          className={[
            "flex h-8 shrink-0 items-center justify-center gap-1.5",
            "bg-primary text-primary-foreground rounded-full px-3",
            "transition-all hover:opacity-90 active:scale-95",
            "disabled:cursor-not-allowed disabled:opacity-40",
            "sm:px-4",
          ].join(" ")}
        >
          <span className="hidden text-xs font-semibold sm:inline">Search</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Autocomplete panel */}
      {showSuggestions && (
        <div className="border-border bg-popover text-popover-foreground animate-in fade-in-0 slide-in-from-top-2 absolute inset-x-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-2xl border shadow-xl shadow-black/10 duration-150">
          <div className="border-border/70 flex items-center justify-between border-b px-4 py-3">
            <p className="text-muted-foreground text-xs font-semibold tracking-wide">
              {loading
                ? "SEARCHING PRODUCTS"
                : hasSearched
                  ? "SEARCH RESULTS"
                  : "FIND YOUR FURNITURE"}
            </p>

            {!loading && hasSearched && (
              <span className="text-muted-foreground text-xs">
                {products.length}{" "}
                {products.length === 1 ? "product" : "products"}
              </span>
            )}
          </div>

          <div className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
            {loading && products.length === 0 ? (
              <div className="text-muted-foreground flex items-center justify-center gap-2 py-10 text-sm">
                <LoaderCircle size={18} className="animate-spin" />
                Finding the right products...
              </div>
            ) : products.length > 0 ? (
              <div className="space-y-1">
                {products.map((product, index) => {
                  const discounted = Boolean(product.discount);

                  const price = discounted
                    ? product.discountPrice
                    : product.price;

                  return (
                    <button
                      key={product.id}
                      type="button"
                      role="option"
                      aria-selected={activeIndex === index}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => navigateToProduct(product)}
                      className={[
                        "group/item flex w-full items-center gap-3",
                        "rounded-xl border border-transparent p-2.5",
                        "text-left transition-colors duration-150",
                        activeIndex === index
                          ? "border-border bg-accent"
                          : "hover:bg-accent/70",
                      ].join(" ")}
                    >
                      <div className="border-border/70 bg-muted relative size-14 shrink-0 overflow-hidden rounded-lg border">
                        {product.images?.[0] ? (
                          <Image
                            unoptimized
                            fill
                            sizes="56px"
                            src={getImageUrlProduct(product.images[0])}
                            alt={product.title}
                            className="object-contain p-1.5 transition-transform duration-200 group-hover/item:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Search
                              size={18}
                              className="text-muted-foreground"
                            />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm leading-5 font-medium">
                          {product.title}
                        </p>

                        <p className="text-muted-foreground mt-1 text-xs">
                          {product.productCode}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <span className="text-sm font-semibold tabular-nums">
                          ৳{price?.toString() ?? product.price.toString()}
                        </span>

                        {discounted && (
                          <span className="text-muted-foreground text-xs line-through">
                            ৳{product.price.toString()}
                          </span>
                        )}

                        <ArrowRight
                          size={14}
                          className="text-muted-foreground opacity-0 transition-all group-hover/item:translate-x-0.5 group-hover/item:opacity-100"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : hasSearched ? (
              <div className="px-4 py-10 text-center">
                <div className="bg-muted mx-auto mb-3 flex size-11 items-center justify-center rounded-full">
                  <Search size={20} className="text-muted-foreground" />
                </div>

                <p className="text-sm font-semibold">No products found</p>

                <p className="text-muted-foreground mt-1 text-xs">
                  Try a different keyword or browse all products.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/products");
                  }}
                  className="text-primary mt-4 text-sm font-medium hover:underline"
                >
                  Browse all products
                </button>
              </div>
            ) : null}
          </div>

          {query.trim() && (
            <button
              type="button"
              onClick={navigateToSearch}
              className="border-border bg-muted/30 hover:bg-muted/70 flex w-full items-center justify-between border-t px-4 py-3 text-left text-sm transition-colors"
            >
              <span>
                Search for{" "}
                <span className="font-semibold">
                  &quot;{query.trim()}&quot;
                </span>
              </span>
              <ArrowRight size={16} className="text-muted-foreground" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearchContainer;
