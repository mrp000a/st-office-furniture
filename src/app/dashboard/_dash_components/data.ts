import { LucideMessageSquareMore } from "lucide-react";
import { AiFillProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
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
  { label: "Settings", href: "/dashboard/settings", icon: IoMdSettings },
];
