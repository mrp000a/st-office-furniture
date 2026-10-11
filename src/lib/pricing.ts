type NumericValue =
  number | string | { toString: () => string } | null | undefined;

export type ProductPricingInput = {
  price: NumericValue;
  discount?: NumericValue;
  discountPrice?: NumericValue;
  discountAmount?: NumericValue;
};

export type ProductPricing = {
  originalPrice: number;
  salePrice: number;
  discountAmount: number;
  discountPercent: number;
  hasDiscount: boolean;
  discountLabel: string;
};

const toNumber = (value: NumericValue) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

export function getProductPricing({
  price,
  discount,
  discountPrice,
  discountAmount,
}: ProductPricingInput): ProductPricing {
  const originalPrice = Math.max(0, toNumber(price));
  const configuredDiscountAmount = toNumber(discountAmount ?? discountPrice);
  const salePrice =
    configuredDiscountAmount > 0 && configuredDiscountAmount < originalPrice
      ? configuredDiscountAmount
      : originalPrice;
  const discountAmountValue = Math.max(0, originalPrice - salePrice);
  const configuredDiscountPercent = toNumber(discount);
  const discountPercent =
    configuredDiscountPercent > 0
      ? configuredDiscountPercent
      : originalPrice > 0
        ? (discountAmountValue / originalPrice) * 100
        : 0;
  const hasDiscount = discountAmountValue > 0;

  return {
    originalPrice,
    salePrice,
    discountAmount: discountAmountValue,
    discountPercent,
    hasDiscount,
    discountLabel: hasDiscount
      ? configuredDiscountPercent > 0
        ? `-${configuredDiscountPercent}%`
        : `-৳${discountAmountValue.toFixed(2)}`
      : "",
  };
}
