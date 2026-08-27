// images-------------------------------------------------------------

// https://chatgpt.com/s/t_6a8c7b9a15a881919178fdfa19367d46 home layout page

import { StaticImageData } from "next/image";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import StOfficeLogo from "@/components/images/Home/LogoStOfficeFur.jpg";
import StOfficeBanner from "@/components/images/Home/IMG-20260816-WA0001.jpg";
import SlideImageA from "@/components/images/Home/homeitems1.png";
import SlideImageB from "@/components/images/Home/homeitems2.png";
import { AiFillProduct } from "react-icons/ai";

import RegisterImage from "@/components/images/Office/francesco-liotti-3HP6_D9hxFY-unsplash.jpg";
import LogInImage from "@/components/images/Office/kam-idris-_HqHX3LBN18-unsplash.jpg";

import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail, MdPointOfSale } from "react-icons/md";

import {
  Boxes,
  CircleUserRound,
  FileText,
  Home,
  LucideMessageSquareMore,
  LucideProps,
  RefreshCcw,
  ShoppingCart,
  Truck,
  Undo2,
  UserShield,
} from "lucide-react";
import { IconType } from "react-icons/lib";
import { TbCategoryPlus } from "react-icons/tb";

export const coreInfo: {
  name: string;
  image: string | StaticImageData;
  banner: string | StaticImageData;
  images: string[] | StaticImageData[];
} = {
  name: "ST Office Furniture",
  image: StOfficeLogo,
  banner: StOfficeBanner,
  images: [SlideImageA, SlideImageB],
};

export const LoginAndRegisterPageImages = {
  login: LogInImage,
  register: RegisterImage,
};

export const navItems: {
  label: string;
  href: string;
}[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Order", href: "/order" },
  { label: "Products", href: "/products" },
  // { label: "Test", href: "/test" },
];

export const MobNavItems: {
  label: string;
  href: string;
  Logo?: IconType;
}[] = [
  { label: "Products", href: "/products", Logo: Boxes },
  { label: "Track Order", href: "/order-track", Logo: ShoppingCart },
  { label: "Home", href: "/", Logo: Home },
  { label: "Order", href: "/order", Logo: ShoppingCart },
  { label: "Profile", href: "/profile", Logo: CircleUserRound },
];

export const allowedImage = {
  types: ["image/jpeg", "image/png", "image/jpg"],
  maxSize: 500000,
};

export const ProductDefaultImage: string =
  "r2upload/products/images/9d3ee168-12d5-486f-bff7-80b4656fe464.jpg";
export const ProfileDefaultImage =
  "users/avatar/08f0b6a5-2a3b-43e0-b22e-a0a068a9995e.png";

export const DeliveryAreas = [
  { label: "Inside Dhaka", value: "INSIDE_DHAKA" , charge: 0 },
  { label: "Outside Dhaka", value: "OUTSIDE_DHAKA", charge: 0 },
];

export const SocialLinks = [
  { label: "Facebook", href: "#", icon: FaFacebook },
  { label: "WhatsApp", href: "https://wa.me/+8801521120706", icon: FaWhatsapp },
  { label: "YouTube", href: "#", icon: FaYoutube },
  { label: "Instagram", href: "#", icon: FaInstagram },
];

export const ContactInfoFooter = [
  {
    name: "Address",
    label: "55, North Jatrabari, Dhaka , 1204, Bangladesh",
    href: "https://maps.app.goo.gl/RJyz9s7cT9nEzPmB8",
    icon: FaLocationDot,
  },
  {
    name: "Phone",
    label: "+8801521120706",
    href: "tel:+8801521120706",
    icon: FaPhone,
  },
  {
    name: "WhatsApp",
    label: "+8801521120706",
    href: "https://wa.me/+8801521120706",
    icon: FaWhatsapp,
  },
  {
    name: "Email",
    label: "stofficefurniture@gmail.com",
    href: "mailto:stofficefurniture@gmail.com",
    icon: MdEmail,
  },
];

export const firstFooterItems = [
  { label: "Terms & Condition", icon: FileText, href: "#" },
  { label: "Return Policy", icon: RefreshCcw, href: "#" },
  { label: "Delivery Policy", icon: Truck, href: "#" },
  { label: "Privacy Policy", icon: UserShield, href: "#" },
];
