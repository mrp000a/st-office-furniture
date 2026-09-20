"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Boxes,
  ChevronRight,
  CircleDollarSign,
  Eye,
  MoreHorizontal,
  Package,
  Plus,
  RefreshCcw,
  Settings,
  ShoppingBag,
  Star,
  Store,
  UserPlus,
  Users,
  AlertTriangle,
  Mail,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  CalendarDays,
  Database,
  Server,
  ShieldCheck,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { OrderStatus } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import Clock from "./_dash_components/small/Time";
import { useSession } from "next-auth/react";
import { OrderStatusBadge } from "@/components/uiComponent/order-status-badge";

/* ================================================================
   TYPES
================================================================ */

type DashboardOrder = {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: OrderStatus;
  date: string;
};

type Product = {
  id: string;
  name: string;
  code: string;
  category: string;
  price: number;
  sold: number;
  stock: number;
  rating: number;
  image?: string;
};

type ActivityItem = {
  id: string;
  type: "ORDER" | "CUSTOMER" | "PRODUCT" | "REVIEW" | "MESSAGE";
  title: string;
  description: string;
  time: string;
};

type dashboardSummaryType = {
  revenue?: number;
  revenueGrowth?: number;

  orders?: number;
  ordersGrowth?: number;

  customers?: number;
  customersGrowth?: number;

  products?: number;
  productsGrowth?: number;

  pendingOrders?: number;
  lowStock?: number;
  outOfStock?: number;
  reviews?: number;
};
/* ================================================================
   DASHBOARD DATA
   Replace these variables with your API/Prisma data later.
================================================================ */

const dashboardSummary: dashboardSummaryType = {
  revenue: 1284500,
  revenueGrowth: 18.6,

  orders: 348,
  ordersGrowth: 12.4,

  customers: 1248,
  customersGrowth: 9.8,

  products: 86,
  productsGrowth: 5.2,

  pendingOrders: 27,
  lowStock: 9,
  outOfStock: 3,
  reviews: 42,
};

const salesData = [
  { label: "Jan", value: 72000 },
  { label: "Feb", value: 89000 },
  { label: "Mar", value: 76000 },
  { label: "Apr", value: 112000 },
  { label: "May", value: 98000 },
  { label: "Jun", value: 135000 },
  { label: "Jul", value: 128000 },
  { label: "Aug", value: 156000 },
  { label: "Sep", value: 182000 },
  { label: "Oct", value: 174000 },
  { label: "Nov", value: 201000 },
  { label: "Dec", value: 245000 },
];

const orderStatusData: {
  status: OrderStatus;
  count: number;
  percentage: number;
}[] = [
  {
    status: "PENDING",
    count: 27,
    percentage: 7.8,
  },
  {
    status: "CONFIRMED",
    count: 34,
    percentage: 9.8,
  },
  {
    status: "PACKAGED",
    count: 18,
    percentage: 5.2,
  },
  {
    status: "ON_HOLD",
    count: 18,
    percentage: 5.2,
  },
  {
    status: "SHIPPED",
    count: 41,
    percentage: 11.8,
  },
  {
    status: "RETURNED",
    count: 41,
    percentage: 11.8,
  },
  {
    status: "FAILED_DELIVERY",
    count: 41,
    percentage: 11.8,
  },
  {
    status: "DELIVERED",
    count: 211,
    percentage: 60.6,
  },
  {
    status: "CANCELLED",
    count: 17,
    percentage: 4.8,
  },
];

const recentOrders: DashboardOrder[] = [
  {
    id: "ORD-10482",
    customer: "Rakib Hasan",
    email: "rakib@example.com",
    amount: 18500,
    status: "DELIVERED",
    date: "Today, 10:42 AM",
  },
  {
    id: "ORD-10481",
    customer: "Nusrat Jahan",
    email: "nusrat@example.com",
    amount: 32400,
    status: "SHIPPED",
    date: "Today, 09:15 AM",
  },
  {
    id: "ORD-10480",
    customer: "Tanvir Ahmed",
    email: "tanvir@example.com",
    amount: 12900,
    status: "PENDING",
    date: "Today, 08:31 AM",
  },
  {
    id: "ORD-10479",
    customer: "Sadia Islam",
    email: "sadia@example.com",
    amount: 45700,
    status: "CONFIRMED",
    date: "Yesterday, 06:21 PM",
  },
  {
    id: "ORD-10478",
    customer: "Fahim Rahman",
    email: "fahim@example.com",
    amount: 8900,
    status: "DELIVERED",
    date: "Yesterday, 04:12 PM",
  },
  {
    id: "ORD-10477",
    customer: "Mehedi Hasan",
    email: "mehedi@example.com",
    amount: 26700,
    status: "PACKAGED",
    date: "Yesterday, 02:48 PM",
  },
];

const topProducts: Product[] = [
  {
    id: "1",
    name: "Executive High Back Office Chair",
    code: "ST-CHAIR-001",
    category: "Office Chair",
    price: 18500,
    sold: 84,
    stock: 18,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Ergonomic Mesh Office Chair",
    code: "ST-CHAIR-014",
    category: "Office Chair",
    price: 12900,
    sold: 71,
    stock: 7,
    rating: 4.7,
  },
  {
    id: "3",
    name: "Premium Visitor Chair",
    code: "ST-CHAIR-021",
    category: "Visitor Chair",
    price: 8900,
    sold: 64,
    stock: 24,
    rating: 4.6,
  },
  {
    id: "4",
    name: "Manager Office Chair",
    code: "ST-CHAIR-009",
    category: "Office Chair",
    price: 16200,
    sold: 52,
    stock: 4,
    rating: 4.8,
  },
  {
    id: "5",
    name: "Conference Room Chair",
    code: "ST-CHAIR-031",
    category: "Conference",
    price: 7200,
    sold: 48,
    stock: 15,
    rating: 4.5,
  },
];

const lowStockProducts = [
  {
    id: "1",
    name: "Ergonomic Mesh Office Chair",
    code: "ST-CHAIR-014",
    stock: 7,
    minimum: 10,
  },
  {
    id: "2",
    name: "Manager Office Chair",
    code: "ST-CHAIR-009",
    stock: 4,
    minimum: 10,
  },
  {
    id: "3",
    name: "Executive Desk Chair",
    code: "ST-CHAIR-002",
    stock: 3,
    minimum: 8,
  },
  {
    id: "4",
    name: "Leather Armrest",
    code: "ST-ACC-018",
    stock: 2,
    minimum: 10,
  },
];

const recentActivities: ActivityItem[] = [
  {
    id: "1",
    type: "ORDER",
    title: "New order received",
    description: "Order #ORD-10482 was placed by Rakib Hasan.",
    time: "8 minutes ago",
  },
  {
    id: "2",
    type: "CUSTOMER",
    title: "New customer registered",
    description: "Nusrat Jahan created a new account.",
    time: "21 minutes ago",
  },
  {
    id: "3",
    type: "REVIEW",
    title: "New product review",
    description: "A 5-star review was submitted for ST-CHAIR-001.",
    time: "42 minutes ago",
  },
  {
    id: "4",
    type: "PRODUCT",
    title: "Product stock updated",
    description: "Stock updated for Ergonomic Mesh Office Chair.",
    time: "1 hour ago",
  },
  {
    id: "5",
    type: "MESSAGE",
    title: "New customer message",
    description: "A customer submitted a contact request.",
    time: "2 hours ago",
  },
];

const notifications = [
  {
    id: "1",
    title: "27 orders require attention",
    description: "Pending orders are waiting for confirmation.",
    type: "warning",
  },
  {
    id: "2",
    title: "9 products are low in stock",
    description: "Consider reviewing your inventory.",
    type: "warning",
  },
  {
    id: "3",
    title: "3 products are out of stock",
    description: "These products cannot currently be purchased.",
    type: "danger",
  },
];

const storePerformance = {
  conversionRate: 4.82,
  averageOrderValue: 3691,
  customerRetention: 68.4,
  returnRate: 2.1,
};

/* ================================================================
   MAIN PAGE
================================================================ */

export default function AdminDashboardPage() {
  const maxSales = Math.max(...salesData.map((item) => item.value));
  const router = useRouter();
  const { data } = useSession();

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good morning";
    }

    if (hour < 17) {
      return "Good afternoon";
    }

    if (hour < 21) {
      return "Good evening";
    }

    return "Good night";
  };

  return (
    <main className="mx-auto w-full  space-y-6 p-3">
      {/* ============================================================
          HEADER
      ============================================================ */}

      <section className="flex flex-col lg:items-center lg:justify-between">
        <div className="flex justify-between items-center w-full">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Store className="h-4 w-4" />
            <span>ST Office Furniture</span>
            <ChevronRight className="h-4 w-4" />
            <span>Dashboard</span>
          </div>
          <div className="">
            <Clock />
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {getGreeting()},{" "}
              {data?.user.name
                ?.split(" ")
                .filter((value) => value.length > 0)[0] ?? "Admin"}{" "}
              👋
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Here&apos;s what&apos;s happening with your store today.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => router.refresh()} variant="outline">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button asChild>
              <Link href="/dashboard/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================
          ALERTS
      ============================================================ */}

      {notifications.length > 0 && (
        <section className="grid gap-3 md:grid-cols-3">
          {notifications.map((notification) => (
            <AlertCard
              key={notification.id}
              title={notification.title}
              description={notification.description}
              type={notification.type}
            />
          ))}
        </section>
      )}

      {/* ============================================================
          SUMMARY CARDS
      ============================================================ */}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Revenue"
          value={`৳${dashboardSummary?.revenue?.toLocaleString() ?? 0}`}
          change={dashboardSummary?.revenueGrowth ?? 0}
          icon={CircleDollarSign}
          href="/dashboard/orders"
        />

        <SummaryCard
          title="Total Orders"
          value={`${dashboardSummary?.orders?.toLocaleString() ?? 0}`}
          change={dashboardSummary?.ordersGrowth ?? 0}
          icon={ShoppingBag}
          href="/dashboard/orders"
        />

        <SummaryCard
          title="Customers"
          value={`${dashboardSummary?.customers?.toLocaleString() ?? 0}`}
          change={dashboardSummary?.customersGrowth ?? 0}
          icon={Users}
          href="/dashboard/users"
        />

        <SummaryCard
          title="Products"
          value={`${dashboardSummary?.products?.toLocaleString() ?? 0}`}
          change={dashboardSummary?.productsGrowth ?? 0}
          icon={Boxes}
          href="/dashboard/products"
        />
      </section>

      {/* ============================================================
          REVENUE + ORDER STATUS
      ============================================================ */}

      <section className="grid gap-6 xl:grid-cols-3">
        {/* Revenue */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Revenue Overview</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Monthly revenue performance
              </p>
            </div>

            <Button variant="outline" size="sm">
              <CalendarDays className="mr-2 h-4 w-4" />
              This Year
            </Button>
          </CardHeader>

          <CardContent>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-bold">৳1,284,500</p>

                <p className="mt-1 flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  18.6% compared to last year
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                Revenue
              </div>
            </div>

            {/* Simple chart */}
            <div className="flex h-70 items-end gap-2 overflow-hidden border-b pb-0 sm:gap-3">
              {salesData.map((item) => {
                const height = `${Math.max((item.value / maxSales) * 100, 8)}%`;

                return (
                  <div
                    key={item.label}
                    className="group flex h-full flex-1 flex-col justify-end"
                  >
                    <div className="relative flex flex-1 items-end">
                      <div
                        className="w-full rounded-t-md bg-blue-500/80 transition-all duration-300 group-hover:bg-blue-500"
                        style={{
                          height,
                        }}
                      />

                      <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs text-background group-hover:block">
                        ৳{item.value.toLocaleString()}
                      </div>
                    </div>

                    <span className="pt-2 text-center text-[10px] text-muted-foreground sm:text-xs">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>

            <p className="text-sm text-muted-foreground">
              Current order distribution
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            {orderStatusData.map((item) => (
              <div key={item.status}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StatusDot status={item.status} />

                    <span className="text-sm font-medium">
                      {formatStatus(item.status)}
                    </span>
                  </div>

                  <span className="text-sm font-semibold">{item.count}</span>
                </div>

                <Progress value={item.percentage} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* ============================================================
          STORE PERFORMANCE
      ============================================================ */}

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Store Performance</h2>

          <p className="text-sm text-muted-foreground">
            Key metrics from your store
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={TrendingUp}
            title="Conversion Rate"
            value={`${storePerformance.conversionRate}%`}
            description="Visitors who placed orders"
          />

          <MetricCard
            icon={CircleDollarSign}
            title="Average Order"
            value={`৳${storePerformance.averageOrderValue.toLocaleString()}`}
            description="Average order value"
          />

          <MetricCard
            icon={Users}
            title="Customer Retention"
            value={`${storePerformance.customerRetention}%`}
            description="Returning customers"
          />

          <MetricCard
            icon={RefreshCcw}
            title="Return Rate"
            value={`${storePerformance.returnRate}%`}
            description="Orders returned"
          />
        </div>
      </section>

      {/* ============================================================
          RECENT ORDERS
      ============================================================ */}

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Latest orders from your customers
            </p>
          </div>

          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/orders">
              View All Orders
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="font-semibold hover:underline"
                      >
                        {order.id}
                      </Link>
                    </TableCell>

                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer}</p>

                        <p className="text-xs text-muted-foreground">
                          {order.email}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {order.date}
                    </TableCell>

                    <TableCell>
                      <OrderStatusBadge status={order.status} className="" />
                    </TableCell>

                    <TableCell className="text-right font-semibold">
                      ৳{order.amount.toLocaleString()}
                    </TableCell>

                    <TableCell>
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/dashboard/orders/${order.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ============================================================
          PRODUCTS + LOW STOCK
      ============================================================ */}

      <section className="grid gap-6 xl:grid-cols-3">
        {/* Top Products */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Selling Products</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Products generating the most sales
              </p>
            </div>

            <Button asChild variant="ghost" size="icon">
              <Link href="/dashboard/products">
                <MoreHorizontal className="h-5 w-5" />
              </Link>
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/40"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold">
                  #{index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/dashboard/products/${product.id}`}
                    className="line-clamp-1 text-sm font-semibold hover:underline"
                  >
                    {product.name}
                  </Link>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {product.code} • {product.category}
                  </p>
                </div>

                <div className="hidden text-right sm:block">
                  <div className="flex items-center justify-end gap-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {product.sold} sold
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold">
                    ৳{product.price.toLocaleString()}
                  </p>

                  <p
                    className={`text-xs ${
                      product.stock <= 5
                        ? "text-red-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    {product.stock} in stock
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Low Stock */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Low Stock</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Products requiring attention
              </p>
            </div>

            <Badge variant="destructive">{dashboardSummary.lowStock}</Badge>
          </CardHeader>

          <CardContent className="space-y-4">
            {lowStockProducts.map((product) => {
              const percentage = Math.min(
                (product.stock / product.minimum) * 100,
                100,
              );

              return (
                <div key={product.id}>
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="line-clamp-1 text-sm font-medium">
                        {product.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {product.code}
                      </p>
                    </div>

                    <span className="shrink-0 text-sm font-bold text-red-500">
                      {product.stock}
                    </span>
                  </div>

                  <Progress value={percentage} className="h-1.5" />
                </div>
              );
            })}

            <Button asChild variant="outline" className="mt-2 w-full">
              <Link href="/dashboard/products?filter=low-stock">
                Manage Inventory
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* ============================================================
          ACTIVITY + QUICK ACTIONS
      ============================================================ */}

      <section className="grid gap-6 lg:grid-cols-3">
        {/* Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>

            <p className="text-sm text-muted-foreground">
              Latest activity across your store
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-5">
              {recentActivities.map((activity, index) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="relative">
                    <ActivityIcon type={activity.type} />

                    {index !== recentActivities.length - 1 && (
                      <div className="absolute left-1/2 top-10 h-full w-px -translate-x-1/2 bg-border" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 pb-2">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row">
                      <p className="text-sm font-semibold">{activity.title}</p>

                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>

            <p className="text-sm text-muted-foreground">
              Frequently used administration tools
            </p>
          </CardHeader>

          <CardContent className="grid gap-2">
            <QuickAction
              href="/dashboard/products/new"
              icon={Plus}
              title="Add Product"
            />

            <QuickAction
              href="/dashboard/orders"
              icon={ShoppingBag}
              title="Manage Orders"
            />

            <QuickAction
              href="/dashboard/users"
              icon={Users}
              title="Manage Customers"
            />

            <QuickAction
              href="/dashboard/categories"
              icon={Boxes}
              title="Manage Categories"
            />

            <QuickAction
              href="/dashboard/messages"
              icon={MessageSquare}
              title="Customer Messages"
            />

            <QuickAction
              href="/dashboard/settings"
              icon={Settings}
              title="Admin Settings"
            />
          </CardContent>
        </Card>
      </section>

      {/* ============================================================
          SYSTEM STATUS
      ============================================================ */}

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>System Status</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Current health of your application services
              </p>
            </div>

            <Badge
              variant="outline"
              className="w-fit gap-2 border-green-500/30 bg-green-500/10 text-green-600"
            >
              <span className="h-2 w-2 rounded-full bg-green-500" />
              All systems operational
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <SystemStatus
              icon={Server}
              title="Application"
              description="Web application"
              status="Operational"
            />

            <SystemStatus
              icon={Database}
              title="Database"
              description="PostgreSQL"
              status="Connected"
            />

            <SystemStatus
              icon={Mail}
              title="Email"
              description="Transactional email"
              status="Operational"
            />

            <SystemStatus
              icon={ShieldCheck}
              title="Authentication"
              description="Admin authentication"
              status="Protected"
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

/* ================================================================
   COMPONENTS
================================================================ */

function SummaryCard({
  title,
  value,
  change,
  icon: Icon,
  href,
}: {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  href: string;
}) {
  return (
    <Card className="group transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-primary/10 text-blue-primary">
            <Icon name={title} className="h-5 w-5" />
          </div>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="opacity-60 group-hover:opacity-100"
          >
            <Link href={href}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{title}</p>

        <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>

        <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
          <ArrowUpRight className="h-3.5 w-3.5" />
          {change}% from previous period
        </div>
      </CardContent>
    </Card>
  );
}

function MetricCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <Icon className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{title}</p>

            <p className="mt-0.5 text-xl font-bold">{value}</p>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function AlertCard({
  title,
  description,
  type,
}: {
  title: string;
  description: string;
  type: string;
}) {
  const danger = type === "danger";

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 ${
        danger
          ? "border-red-500/20 bg-red-500/5"
          : "border-yellow-500/20 bg-yellow-500/5"
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          danger
            ? "bg-red-500/10 text-red-600"
            : "bg-yellow-500/10 text-yellow-600"
        }`}
      >
        <AlertTriangle className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold">{title}</p>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-yellow-500",
    CONFIRMED: "bg-blue-500",
    PACKAGED: "bg-purple-500",
    SHIPPED: "bg-indigo-500",
    DELIVERED: "bg-green-500",
    CANCELLED: "bg-red-500",
    RETURNED: "bg-orange-500",
  };

  return (
    <span
      className={`h-2.5 w-2.5 rounded-full ${styles[status] ?? "bg-gray-500"}`}
    />
  );
}

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function ActivityIcon({ type }: { type: ActivityItem["type"] }) {
  const config = {
    ORDER: {
      icon: ShoppingBag,
      className: "bg-blue-500/10 text-blue-600",
    },
    CUSTOMER: {
      icon: UserPlus,
      className: "bg-green-500/10 text-green-600",
    },
    PRODUCT: {
      icon: Package,
      className: "bg-purple-500/10 text-purple-600",
    },
    REVIEW: {
      icon: Star,
      className: "bg-yellow-500/10 text-yellow-600",
    },
    MESSAGE: {
      icon: MessageSquare,
      className: "bg-orange-500/10 text-orange-600",
    },
  };

  const item = config[type];
  const Icon = item.icon;

  return (
    <div
      className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full ${item.className}`}
    >
      <Icon className="h-4 w-4" />
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
}) {
  return (
    <Button asChild variant="ghost" className="h-auto justify-start p-3">
      <Link href={href}>
        <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4" />
        </div>

        <span className="flex-1 text-left">{title}</span>

        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>
    </Button>
  );
}

function SystemStatus({
  icon: Icon,
  title,
  description,
  status,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  status: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>

        <p className="text-xs text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center gap-1.5 text-xs font-medium text-green-600">
        <span className="h-2 w-2 rounded-full bg-green-500" />

        {status}
      </div>
    </div>
  );
}
