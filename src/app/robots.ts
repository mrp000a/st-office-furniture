import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_URL_SITE || "https://www.stofficefurniture.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/account/",
        "/profile/",
        "/cart/",
        "/checkout/",
        "/login/",
        "/register/",
      ],
    },

    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
