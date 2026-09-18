import { Badge } from "@/components/ui/badge";
import { orderStatusConfig } from "../sec_lib/order-status";

type OrderStatus = keyof typeof orderStatusConfig;

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const config = orderStatusConfig[status];

  return (
    <Badge variant="outline" className={`${config.className}  ${className}`}>
      {config.label}
    </Badge>
  );
}
