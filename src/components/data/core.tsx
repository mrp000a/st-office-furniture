// images-------------------------------------------------------------

// https://chatgpt.com/s/t_6a8c7b9a15a881919178fdfa19367d46 home layout page

import { StaticImageData } from "next/image";
import StOfficeLogo from "@/components/images/Home/St-Office-Logo-Light.png";
import StOfficeLogoDark from "@/components/images/Home/St-Office-Logo-Dark.png";
import StOfficeLogoMain from "@/components/images/Home/LogoStOfficeFur.jpg";
import StOfficeBanner from "@/components/images/Home/IMG-20260816-WA0001.jpg";
// slide images
import SlideImageA from "@/components/images/Home/1788804085077.jpg.jpeg";
import SlideImageA2 from "@/components/images/Home/WhatsApp Image 2026-09-09 at 12.20.31 AM.jpeg";
import SlideImageB from "@/components/images/Home/1788806073943.jpg.jpeg";
import SlideImageC from "@/components/images/Home/1788806442172.jpg.jpeg";
import SlideImageD from "@/components/images/Home/1788806591614.jpg.jpeg";
import SlideImageE from "@/components/images/Home/1788806975340.jpg.jpeg";

import officeImage1 from "@/components/images/Office/modern sofas.webp";
import officeImage2 from "@/components/images/Office/vecteezy_ai-generated-abstract-blurred-background-of-modern-office_41713016.jpg";
import officeImage3 from "@/components/images/Office/vecteezy_christmas-background-christmas-wallpaper-modern-office_73067174.jpg";
import officeImage4 from "@/components/images/Office/imageoffice4.jpg";

import RegisterImage from "@/components/images/Office/francesco-liotti-3HP6_D9hxFY-unsplash.jpg";
import LogInImage from "@/components/images/Office/kam-idris-_HqHX3LBN18-unsplash.jpg";

import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import {
  FaLocationDot,
  FaPhone,
  FaRegStar,
  FaRegStarHalf,
  FaRegStarHalfStroke,
  FaStar,
} from "react-icons/fa6";
import { LuMails } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import {
  Boxes,
  CircleUserRound,
  FileText,
  Home,
  RefreshCcw,
  ShoppingCart,
  Truck,
  UserShield,
} from "lucide-react";
import { IconType } from "react-icons/lib";
import { TbCategoryPlus } from "react-icons/tb";
import { OrderStatus } from "@/generated/prisma";
import { IoMailOpenOutline, IoMailUnreadOutline } from "react-icons/io5";

export const coreInfo = {
  name: "ST Office Furniture",
  description:
    "Shop stylish and comfortable modern sofas, accent chairs, and sectional sets designed to elevate your living room and office. Find your perfect fit today!",
  image: StOfficeLogo,
  imageDark: StOfficeLogoDark,
  logo: StOfficeLogoMain,
  banner: StOfficeBanner,
  email: "info@stofficefurniture.com",
  // email2: "stofficefurniture@gmail.com",
  email2: "mrp000a@gmail.com",
};

export const HeroSectionSlides = [
  {
    image: SlideImageD,
    subtitle: "Premium Furniture",
    title: "Make Your Home Beautiful",
    description: "Discover elegant furniture designed for modern living.",
  },
  {
    image: SlideImageA2,
    subtitle: "New Collection",
    title: "Comfort Meets Style",
    description: "Upgrade your space with our latest collection.",
  },
  {
    image: SlideImageC,
    subtitle: "Elevate Your Space",
    title: "Furniture That Feels Like Home",
    description:
      "Bring timeless style, lasting comfort, and a touch of elegance to every corner of your home.",
  },
  {
    image: SlideImageB,
    subtitle: "Made to Last",
    title: "Quality You Can See. Comfort You Can Feel.",
    description:
      "Choose furniture built with quality materials, thoughtful design, and everyday comfort in mind.",
  },
  {
    image: SlideImageA,
    subtitle: "Upgrade Your Home",
    title: "A Better Space Starts Here",
    description:
      "Explore our collection of stylish, comfortable, and thoughtfully designed furniture for every room.",
  },
  {
    image: SlideImageE,
    subtitle: "Live Beautifully",
    title: "Style Your Space.",
    description:
      "Furniture designed to match your taste, your lifestyle, and the way you love to live.",
  },
];

export const LoginAndRegisterPageImages = {
  login: LogInImage,
  register: RegisterImage,
};

export const dropdownAdminData = [
  { label: "Profile", icon: UserIcon, href: "/profile" },
  { label: "Billing", icon: CreditCardIcon, href: "#" },
  { label: "Setting", icon: SettingsIcon, href: "#" },
];

export const navItems: {
  label: string;
  href: string;
}[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Categories", href: "/categories" },
  { label: "Checkout", href: "/checkout" },
  { label: "Track Order", href: "/track-order" },
  { label: "Products", href: "/products" },
  { label: "Profile", href: "/profile" },
];

export const navItemShort: {
  label: string;
  href: string;
}[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Checkout", href: "checkout" },
  { label: "Track Order", href: "/track-order" },
  { label: "Products", href: "/products" },
];

export const MobNavItems: {
  label: string;
  href: string;
  Logo?: IconType;
}[] = [
  { label: "Products", href: "/products", Logo: Boxes },
  { label: "Track Order", href: "/track-order", Logo: ShoppingCart },
  { label: "Home", href: "/", Logo: Home },
  { label: "Checkout", href: "/checkout", Logo: ShoppingCart },
  { label: "Profile", href: "/profile", Logo: CircleUserRound },
];

export const allowedImage = {
  types: ["image/jpeg", "image/png", "image/jpg"],
  maxSize: 500000,
};

export const ProductDefaultImage: string =
  "r2upload/products/images/8c0bfedf-1015-49a0-bf52-87b7595de03a.png";

export const ProfileDefaultImage =
  "users/avatar/08f0b6a5-2a3b-43e0-b22e-a0a068a9995e.png";

export const DeliveryAreas = [
  { label: "Inside Dhaka", value: "INSIDE_DHAKA", charge: 0 },
  { label: "Outside Dhaka", value: "OUTSIDE_DHAKA", charge: 0 },
];

export const SocialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/stofficefurniture/",
    icon: FaFacebook,
  },
  { label: "WhatsApp", href: "https://wa.me/+8801521120706", icon: FaWhatsapp },
  {
    label: "YouTube",
    href: "https://youtube.com/@stofficefurniture?si=u_SAKzxEu3wAyUEp",
    icon: FaYoutube,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/stofficefurniture",
    icon: FaInstagram,
  },
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
    label: "info@stofficefurniture.com",
    href: "mailto:info@stofficefurniture.com",
    icon: MdEmail,
  },
];

export const ContactInfoFloating = [
  // {
  //   name: "Address",
  //   label: "55, North Jatrabari, Dhaka , 1204, Bangladesh",
  //   href: "https://maps.app.goo.gl/RJyz9s7cT9nEzPmB8",
  //   icon: FaLocationDot,
  // },
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
    label: "info@stofficefurniture.com",
    href: "mailto:info@stofficefurniture.com",
    icon: MdEmail,
  },
];

export const firstFooterItems = [
  {
    label: "Terms & Conditions",
    icon: FileText,
    href: "/terms-and-conditions",
  },
  { label: "Return Policy", icon: RefreshCcw, href: "/return-policy" },
  { label: "Delivery Policy", icon: Truck, href: "/delivery-policy" },
  { label: "Privacy Policy", icon: UserShield, href: "/privacy-policy" },
];

export const quickLinks = [
  { label: "About Us", icon: FileText, href: "/about" },
  { label: "Contact Us", icon: RefreshCcw, href: "/contact" },
  { label: "Our Services", icon: UserShield, href: "/services" },
  { label: "Products", icon: Truck, href: "/products" },
];

export const CategoriesNav = [
  { label: "All Categories", href: "/products" },
  { label: "Executive Chair", href: "/products?category=executive-chair" },
  { label: "Manager Chair", href: "/products?category=manager-chair" },
  { label: "Boss Chair", href: "/products?category=boss-chair" },
  { label: "Visitors Chair", href: "/products?category=visitors-chair" },
  { label: "Wooden Chair", href: "/products?category=wooden-chair" },
  { label: "Waiting Chair", href: "/products?category=waiting-chair" },
  { label: "Event Chair", href: "/products?category=even-chair" },
  { label: "Stool", href: "/products?category=stool" },
  { label: "Chair Accessories", href: "/products?category=chair-accessories" },
  { label: "Sofa", href: "/products?category=sofa" },
  // testing
  // { label: "Test Page", href: "/test" },
];

export const termsText = [
  "আমাদের ওয়েবসাইট ব্যবহার বা অর্ডার করার মাধ্যমে আপনি আমাদেরশর্তাবলীতে সম্মতি প্রদান করছেন বলে ধরে নেয়া হচ্ছে।",
  "আমাদের প্রোডাক্টগুলো Parts(Gas lift +Mechanism and Wheel) এর উপর ওয়ারেন্টি থাকে। parts ছাড়া অন্যান্য অংশ ভেংগে গেলে বা নষ্ট হলে কর্তৃপক্ষ দায়ী নয়।Parts প্রবলেম হলে ওয়ারেন্টির সময় অনুযায়ী রিপ্লেস করা হবে।",
  "ওয়েবসাইটে প্রদর্শিত ছবির সাথে বাস্তব পণ্যের সামান্য পার্থক্য থাকতে পারে।",
  "পূর্ব ঘোষণা ছাড়াই পণ্যের মূল্য বা স্টক পরিবর্তন হতে পারে। ",
  "প্রতারণামূলক বা সন্দেহজনক অর্ডার বাতিল করার অধিকার ST Office furniture কর্তৃপক্ষ সংরক্ষণ করে।",
  "সঠিক নাম, ঠিকানা ও মোবাইল নম্বর প্রদান করা গ্রাহকের দায়িত্ব।",
  "অর্ডার করার আগে ভালো করে দেখে বুঝে অর্ডার কনফার্ম করুন। প্রোডাক্ট বুকিং হবার পরে অভিযোগ গ্রহনযোগ্য নয়।",
  "ওয়েবসাইটে বিদ্যমান নাম্বারগুলো ছাড়া অন্য কারো নাম্বারে যোগাযোগ এবং  লেনদেন করবেন না।।প্রতারণার শিকার হলে কর্তৃপক্ষ দায়ী থাকবে না।সকল বিষয়ে জানতে আমাদের নাম্বারে কল করুন অথবা WhatsApp করুন।",
  "ধন্যবাদ।",
];
export const returnPolicyText = [
  "পণ্য পাওয়ার ৩ দিনের মধ্যে রিটার্ন বা রিপ্লেসমেন্টের আবেদন করা যাবে।",
  "ব্যাবহার করার পর রিপ্লেস সম্ভব নয়। রিপ্লেস পেতে পণ্য অবশ্যই অব্যবহৃত এবং মূল প্যাকেজিংসহ থাকতে হবে। ",
  "ডেলিভারি করার সময় ভুল বা ক্ষতিগ্রস্ত পণ্য হলে আমরা রিপ্লেসমেন্টের ব্যবস্থা করব।এক্ষেত্রে কাস্টমারদের পে কর‍তে হবেনা।",
  "যেসব Parts এর উপর ওয়ারেন্টি প্রযোজ্য শুধুমাত্র সেসব parts রিপ্লেস করা হবে।",
  "ওয়ারেন্টির সময় শেষ হলে রিপ্লেস করা যাবে না।",
  "ওয়ারেন্টি সীমার পর রিপ্লেস অথবা মেরামত করার জন্য আলাদা পে করতে হবে।",
  "গ্রাহকের অসাবধানতায় ক্ষতিগ্রস্ত পণ্য রিটার্ন বা রিপ্লেসমেন্টযোগ্য করা যাবেনা।",
  "প্রয়োজন হলে পণ্য যাচাইয়ের পর রিফান্ড প্রক্রিয়া সম্পন্ন করা হবে।",
];

export const deliveryPolicyText = [
  "ঢাকা এবং ঢাকার পার্শ্ববর্তী  এলাকার ভিতরে সাধারণত ১–২ কর্মদিবসের মধ্যে ডেলিভারি সম্পন্ন করা হয়।",
  "ঢাকার বাইরে ২–৫ কর্মদিবসের মধ্যে ডেলিভারি সম্পন্ন করা হয়।",
  "কুরিয়ার, আবহাওয়া বা বিশেষ পরিস্থিতির কারণে ডেলিভারির সময় কিছুটা পরিবর্তন হতে পারে।",
  "ডেলিভারি ম্যানের সামনে প্রোডাক্ট দেখে বুঝে নিতে পারবেন। পরবর্তীতে অভিযোগ গ্রহনযোগ্য হবেনা।",
  "ডেলিভারি চার্জ আপনার অবস্থান অনুযায়ী নির্ধারিত হবে।",
  "পণ্য গ্রহণের সময় অবশ্যই প্যাকেজটি যাচাই করে গ্রহণ করুন।",
  "৩য় তালার উপরে ডেলিভারি করতে হলে ডেলিভারি ম্যানকে আলাদা পে করতে হবে। পারলে বাসার নিচে বা কাছাকাছি সুবিধাজনক স্থান থেকে প্রোডাক্ট গ্রহন করুন।",
  "ডেলিভারি ম্যানকে একটু সময় দিবেন।কারণ তারা সিরিয়াল অনুযায়ী ডেলিভারি করতে করতে আসে।তাই একটু সময় কমবেশি হতে পারে।প্রয়োজনে ডেলিভারি ম্যানের সাথে যোগাযোগ করুন।",
  "ভালো থাকুন,ST Office furniture এর সাথে থাকুন।",
  "ধন্যবাদ❤️",
];

export const privaryText = [
  "ST Office furniture কর্তৃপক্ষ আপনার তথ্য নিরাপদ ভাবে সংরক্ষণ করে। কারও সাথে শেয়ার করেনা।আপনার ব্যক্তিগত তথ্যের নিরাপত্তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ।",
  "অর্ডার সম্পন্ন করার জন্য প্রয়োজনীয় তথ্যই কেবল সংগ্রহ করা হয়। ",
  "আপনার তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি বা শেয়ার করা হয় না, আইনগত বা ডেলিভারি সংক্রান্ত প্রয়োজন ছাড়া।",
  "কাস্টমার যেকোনো সময় তার নিজের তথ্য পরিবর্তন করার সুযোগ পাবে।",
  "সকল প্রকার হয়রানি এড়াতে কর্তৃপক্ষ সদা তৎপর।",
];

export const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const orderStatuses2: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PACKAGED",
  "ON_HOLD",
  "SHIPPED",
  "RETURNED",
  "FAILED_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

export const orderStatuses = [
  { label: "All Items", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Packaged", value: "PACKAGED" },
  { label: "On Hold", value: "ON_HOLD" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Returned", value: "RETURNED" },
  { label: "Failed Delivery", value: "FAILED_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export const stars = {
  empty: FaRegStar,
  fill: FaStar,
  half: FaRegStarHalfStroke,
};

export type ProductItemType = {
  price: number;
  discountPrice: number | null;
  discount: number | null;
  category?: {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    image: string | null;
    description: string | null;
  } | null;
  _count?: {
    descriptions: number;
    reviews: number;
    orderItems: number;
    cartItems: number;
  };
  id: number;
  title: string;
  productCode: string;
  images: string[];
  brand: string | null;
  keyFeatures: string[];
  stock: number;
  categoryId: number | null;
  // averageRating: number;
  createdAt: Date;
  updatedAt: Date;
};

export const faq = [
  {
    value: "furnituretype",
    label: "What types of furniture do you sell?",
    content: [
      "We offer a wide range of furniture, including sofas, chairs, tables, beds, wardrobes, cabinets, office furniture, dining furniture, and more.",
    ],
  },
  {
    value: "howtoplace",
    label: "How can I place an order?",
    content: [
      "Simply browse our products, select the item you want, add it to your cart, and proceed to checkout. Provide your delivery information and confirm your order.",
    ],
  },
  {
    value: "deliveryoption",
    label: "Do you offer home delivery?",
    content: [
      "Yes, we offer home delivery. Delivery availability and charges may vary depending on your location and order size.",
    ],
  },
  {
    value: "deliveryperiod",
    label: "How long does delivery take?",
    content: [
      "Delivery time depends on your location and the availability of the product. Estimated delivery information will be provided during the ordering process.",
    ],
  },
  {
    value: "cancellorder",
    label: "Can I cancel my order?",
    content: [
      "You may be able to cancel your order before it is shipped. Please contact our customer support as soon as possible if you want to cancel an order.",
    ],
  },
  {
    value: "returnproduct",
    label: "Can I return or exchange a product?",
    content: [
      "Yes, eligible products can be returned or exchanged according to our return and exchange policy. Products must generally be unused and in their original condition.",
    ],
  },
  {
    value: "paymentmethod",
    label: "What payment methods do you accept?",
    content: [
      "We accept the payment methods available at checkout, which may include cash on delivery and online payment options.",
    ],
  },
  {
    value: "fixedprices",
    label: "Are the product prices fixed?",
    content: [
      "The prices displayed on our website are the current selling prices. Promotional discounts may be available on selected products from time to time.",
    ],
  },
  {
    value: "checkorder",
    label: "How can I check my order status?",
    content: [
      "After placing an order, you can check its status from your account's order section. You may also receive order updates through your registered contact information.",
    ],
  },
];

export const OfficeImages = [
  {
    title: "Premium Office Chairs",
    description:
      "Comfortable and stylish chairs designed for productive workdays.",
    href: "#",
    image: officeImage2,
  },
  {
    title: "Modern Sofas",
    description:
      "Elegant sofas that bring comfort and sophistication to any space.",
    href: "#",
    image: officeImage1,
  },
  {
    title: "Chair Accessories",
    description:
      "Quality accessories and essential parts to improve your seating experience.",
    href: "#",
    image: officeImage3,
  },
  {
    title: "Comfort Meets Quality",
    description:
      "Reliable furniture built with comfort, durability, and modern design in mind.",
    href: "#",
    image: officeImage4,
  },
];

export const messagesFilter = [
  { label: "All", icon: LuMails, value: "" },
  { label: "Unread", icon: IoMailUnreadOutline, value: "unread" },
  { label: "Read", icon: IoMailOpenOutline, value: "read" },
];

export type filterProductType = {
  limit: number;
  order: "asc" | "desc";
  category: string;
};
