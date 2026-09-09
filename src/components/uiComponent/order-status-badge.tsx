import { Badge } from "@/components/ui/badge";
import { orderStatusConfig } from "../sec_lib/order-status";

type OrderStatus = keyof typeof orderStatusConfig;

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = orderStatusConfig[status];

  return (
    <Badge variant="outline" className={`${config.className} text-base font-semibold px-2 py-1` }>
      {config.label}
    </Badge>
  );
}
