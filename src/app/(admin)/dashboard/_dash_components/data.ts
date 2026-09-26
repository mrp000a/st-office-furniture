import { LucideMessageSquareMore } from "lucide-react";
import { AiFillProduct } from "react-icons/ai";
import { FaCartPlus, FaGifts, FaUserCircle, FaUsers } from "react-icons/fa";
import { IoIosHelpCircle, IoMdSettings } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdPointOfSale } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";

export const DashboardNavItems: {
  label: string;
  href: string;
  icon: IconType;
}[] = [
  { label: "Products", href: "/dashboard/products", icon: AiFillProduct },
  { label: "Categories", href: "/dashboard/categories", icon: TbCategoryPlus },
  { label: "Users", href: "/dashboard/users", icon: FaUsers },
  { label: "Orders", href: "/dashboard/orders", icon: MdPointOfSale },
  {
    label: "Messages",
    href: "/dashboard/messages",
    icon: LucideMessageSquareMore,
  },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    icon: IoNotifications,
  },
  { label: "Settings", href: "/dashboard/settings", icon: IoMdSettings },
];

export const ProfileTabItems: {
  label: string;
  tab: string;
  icon: IconType;
}[] = [
  // { label: "Profile", tab: "home", icon: FaUserCircle },
  { label: "Orders", tab: "orders", icon: MdPointOfSale },
  { label: "Cart Items", tab: "cartitems", icon: FaCartPlus },
  { label: "Gifts", tab: "gifts", icon: FaGifts },
  { label: "Settings", tab: "settings", icon: IoMdSettings },
  {
    label: "Help",
    tab: "help",
    icon: IoIosHelpCircle,
  },
];
