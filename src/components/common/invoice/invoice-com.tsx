import {
  DeliveryAreas,
  OrderStatus,
  PaymentMethods,
  PaymentStatus,
} from "@/generated/prisma";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

type SanitizeOrder = {
  id: number;

  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  paidAmount: number;

  receiverName: string;
  receiverPhone: string;
  receiverEmail: string | null;

  customerNote: string | null;

  transactionId: string | null;
  paidAt: Date | null;

  address: string;

  createdAt: Date;
  updatedAt: Date;

  userId: number | null;
  publicId: string | null;

  status: OrderStatus;

  paymentMethod: PaymentMethods;
  paymentStatus: PaymentStatus;
  paymentId: string | null;

  deliveryArea: DeliveryAreas;

  items: {
    product: {
      productCode?: string | null;
      image?: string | null;
    };

    price: number;
    id: number;

    createdAt: Date;
    updatedAt: Date;

    title: string;

    productId: number | null;
    qty: number;
    orderId: number;
  }[];
};

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */
const invoiceCreatedAt = new Date();

function formatMoney(value: number) {
  return `Tk. ${Number(value).toLocaleString("en-BD", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    timeZone: "Asia/Dhaka",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString("en-US", {
    timeZone: "Asia/Dhaka",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatEnum(value: string) {
  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getPaymentStatusLabel(status: PaymentStatus) {
  return formatEnum(status);
}

function getOrderStatusLabel(status: OrderStatus) {
  return formatEnum(status);
}

function getPaymentMethodLabel(method: PaymentMethods) {
  return formatEnum(method);
}

/* -------------------------------------------------------------------------- */
/*                                    Styles                                  */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 42,

    fontSize: 9,
    fontFamily: "Helvetica",

    color: "#172033",

    backgroundColor: "#ffffff",
  },

  /* -------------------------------- Header -------------------------------- */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    paddingBottom: 22,

    borderBottomWidth: 2,
    borderBottomColor: "#16263D",

    marginBottom: 22,
  },

  brandSection: {
    width: "58%",
  },

  brandName: {
    fontSize: 22,
    fontWeight: "bold",

    color: "#16263D",

    letterSpacing: 0.4,
  },

  tagline: {
    marginTop: 4,

    fontSize: 8.5,

    color: "#6B7280",

    letterSpacing: 0.4,
  },

  brandDetails: {
    marginTop: 9,

    fontSize: 8,

    lineHeight: 1.5,

    color: "#4B5563",
  },

  invoiceSection: {
    width: "38%",

    alignItems: "flex-end",
  },

  invoiceTitle: {
    fontSize: 25,

    fontWeight: "bold",

    color: "#16263D",

    letterSpacing: 1,
  },

  invoiceNumber: {
    marginTop: 5,

    fontSize: 10,

    fontWeight: "bold",

    color: "#18A558",
  },

  invoiceDate: {
    marginTop: 4,

    fontSize: 8,

    color: "#6B7280",
  },

  /* ---------------------------- Info containers --------------------------- */

  infoGrid: {
    flexDirection: "row",

    gap: 12,

    marginBottom: 22,
  },

  infoCard: {
    flex: 1,

    padding: 12,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    borderRadius: 6,

    backgroundColor: "#FAFAFA",
  },

  infoCardTitle: {
    marginBottom: 8,

    fontSize: 8,

    fontWeight: "bold",

    color: "#18A558",

    letterSpacing: 0.7,
  },

  customerName: {
    marginBottom: 4,

    fontSize: 11,

    fontWeight: "bold",

    color: "#16263D",
  },

  infoText: {
    marginBottom: 3,

    fontSize: 8.5,

    lineHeight: 1.35,

    color: "#4B5563",
  },

  /* ------------------------------ Order Meta ------------------------------ */

  metaGrid: {
    flexDirection: "row",

    marginBottom: 22,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    borderRadius: 6,

    overflow: "hidden",
  },

  metaItem: {
    flex: 1,

    paddingVertical: 10,
    paddingHorizontal: 9,

    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },

  metaItemLast: {
    borderRightWidth: 0,
  },

  metaLabel: {
    marginBottom: 4,

    fontSize: 7,

    fontWeight: "bold",

    color: "#9CA3AF",

    letterSpacing: 0.5,
  },

  metaValue: {
    fontSize: 8.5,

    fontWeight: "bold",

    color: "#16263D",
  },

  /* ------------------------------ Status --------------------------------- */

  statusBadge: {
    alignSelf: "flex-start",

    paddingVertical: 4,
    paddingHorizontal: 8,

    borderRadius: 20,

    backgroundColor: "#EAF8F0",
  },

  statusText: {
    fontSize: 7.5,

    fontWeight: "bold",

    color: "#168B4B",
  },

  /* -------------------------------- Table --------------------------------- */

  table: {
    marginBottom: 18,
  },

  tableHeader: {
    flexDirection: "row",

    paddingVertical: 9,
    paddingHorizontal: 9,

    backgroundColor: "#16263D",

    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  tableHeaderText: {
    fontSize: 7.5,

    fontWeight: "bold",

    color: "#FFFFFF",

    letterSpacing: 0.4,
  },

  tableRow: {
    flexDirection: "row",

    minHeight: 38,

    paddingVertical: 9,
    paddingHorizontal: 9,

    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  tableRowAlt: {
    backgroundColor: "#F8FAFC",
  },

  productColumn: {
    flex: 4,
  },

  productCode: {
    marginTop: 3,

    fontSize: 7,

    color: "#9CA3AF",
  },

  quantityColumn: {
    width: 45,

    textAlign: "center",
  },

  priceColumn: {
    width: 80,

    textAlign: "right",
  },

  amountColumn: {
    width: 90,

    textAlign: "right",
  },

  tableCell: {
    fontSize: 8.5,

    color: "#374151",
  },

  productTitle: {
    fontSize: 8.5,

    fontWeight: "bold",

    color: "#16263D",
  },

  /* ------------------------------- Bottom -------------------------------- */

  bottomSection: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 6,
  },

  noteSection: {
    width: "50%",

    paddingRight: 25,
  },

  noteTitle: {
    marginBottom: 6,

    fontSize: 8,

    fontWeight: "bold",

    color: "#16263D",
  },

  noteText: {
    fontSize: 8,

    lineHeight: 1.5,

    color: "#6B7280",
  },

  totals: {
    width: 210,

    padding: 12,

    borderWidth: 1,

    borderColor: "#E5E7EB",

    borderRadius: 6,

    backgroundColor: "#FAFAFA",
  },

  totalRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 7,
  },

  totalLabel: {
    fontSize: 8.5,

    color: "#6B7280",
  },

  totalValue: {
    fontSize: 8.5,

    color: "#374151",
  },

  discountValue: {
    fontSize: 8.5,

    color: "#168B4B",
  },

  grandTotal: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 5,

    paddingTop: 9,

    borderTopWidth: 1,

    borderTopColor: "#D1D5DB",
  },

  grandTotalLabel: {
    fontSize: 11,

    fontWeight: "bold",

    color: "#16263D",
  },

  grandTotalValue: {
    fontSize: 14,

    fontWeight: "bold",

    color: "#18A558",
  },

  /* ----------------------------- Payment --------------------------------- */

  paymentSection: {
    marginTop: 20,

    padding: 12,

    borderRadius: 6,

    backgroundColor: "#F5F9F7",

    borderWidth: 1,

    borderColor: "#DDEFE5",
  },

  paymentHeader: {
    marginBottom: 8,

    fontSize: 8,

    fontWeight: "bold",

    color: "#168B4B",

    letterSpacing: 0.6,
  },

  paymentGrid: {
    flexDirection: "row",
  },

  paymentColumn: {
    flex: 1,
  },

  paymentLabel: {
    marginBottom: 3,

    fontSize: 7,

    color: "#7A8B82",
  },

  paymentValue: {
    fontSize: 8,

    fontWeight: "bold",

    color: "#26352D",
  },

  /* -------------------------------- Footer -------------------------------- */

  footer: {
    position: "absolute",

    bottom: 22,

    left: 42,
    right: 42,

    paddingTop: 9,

    borderTopWidth: 1,

    borderTopColor: "#E5E7EB",

    flexDirection: "row",

    justifyContent: "space-between",
  },

  footerLeft: {
    fontSize: 7,

    color: "#9CA3AF",
  },

  footerRight: {
    fontSize: 7,

    color: "#9CA3AF",
  },

  thankYou: {
    marginTop: 24,

    textAlign: "center",

    fontSize: 9,

    fontWeight: "bold",

    color: "#16263D",
  },

  website: {
    marginTop: 4,

    textAlign: "center",

    fontSize: 8,

    color: "#18A558",
  },
});

/* -------------------------------------------------------------------------- */
/*                              Invoice Component                             */
/* -------------------------------------------------------------------------- */

export function OrderInvoice({ order }: { order: SanitizeOrder }) {
  const dueAmount = Math.max(Number(order.total) - Number(order.paidAmount), 0);

  return (
    <Document
      title={`Invoice #${order.id} - ST Office Furniture`}
      author="ST Office Furniture"
      subject={`Order invoice #${order.id}`}
      creator="ST Office Furniture"
    >
      <Page size="A4" style={styles.page} wrap>
        {/* ---------------------------------------------------------------- */}
        {/* Header                                                           */}
        {/* ---------------------------------------------------------------- */}

        <View style={styles.header}>
          <View style={styles.brandSection}>
            <Text style={styles.brandName}>ST Office Furniture</Text>

            <Text style={styles.tagline}>Better Seating Better Working</Text>

            <Text style={styles.brandDetails}>
              Quality office furniture for home, corporate and professional
              workplaces.
            </Text>
          </View>

          <View style={styles.invoiceSection}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>

            <Text style={styles.invoiceNumber}>INV-{order.id}</Text>

            <Text style={styles.invoiceDate}>
              {formatDate(order.createdAt)}
            </Text>

            <Text style={styles.invoiceDate}>
              {formatTime(order.createdAt)}
            </Text>
          </View>
        </View>

        {/* ---------------------------------------------------------------- */}
        {/* Customer / Delivery                                              */}
        {/* ---------------------------------------------------------------- */}

        <View style={styles.infoGrid}>
          {/* Bill To */}
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>BILL TO</Text>

            <Text style={styles.customerName}>{order.receiverName}</Text>

            {order.receiverEmail && (
              <Text style={styles.infoText}>{order.receiverEmail}</Text>
            )}

            <Text style={styles.infoText}>{order.receiverPhone}</Text>

            <Text style={styles.infoText}>{order.address}</Text>
          </View>

          {/* Delivery */}
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>DELIVERY INFORMATION</Text>

            <Text style={styles.infoText}>
              <Text style={{ fontWeight: "bold" }}>Area: </Text>
              {formatEnum(order.deliveryArea)}
            </Text>

            <Text style={styles.infoText}>
              <Text style={{ fontWeight: "bold" }}>Address: </Text>
              {order.address}
            </Text>

            {order.customerNote && (
              <Text style={styles.infoText}>
                <Text style={{ fontWeight: "bold" }}>Note: </Text>
                {order.customerNote}
              </Text>
            )}
          </View>
        </View>

        {/* ---------------------------------------------------------------- */}
        {/* Order Meta                                                       */}
        {/* ---------------------------------------------------------------- */}

        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>ORDER ID</Text>

            <Text style={styles.metaValue}>#{order.id}</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>ORDER STATUS</Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {getOrderStatusLabel(order.status)}
              </Text>
            </View>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>PAYMENT METHOD</Text>

            <Text style={styles.metaValue}>
              {getPaymentMethodLabel(order.paymentMethod)}
            </Text>
          </View>

          <View style={[styles.metaItem, styles.metaItemLast]}>
            <Text style={styles.metaLabel}>PAYMENT STATUS</Text>

            <Text style={styles.metaValue}>
              {getPaymentStatusLabel(order.paymentStatus)}
            </Text>
          </View>
        </View>

        {/* ---------------------------------------------------------------- */}
        {/* Products                                                         */}
        {/* ---------------------------------------------------------------- */}

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.productColumn, styles.tableHeaderText]}>
              PRODUCT
            </Text>

            <Text style={[styles.quantityColumn, styles.tableHeaderText]}>
              QTY
            </Text>

            <Text style={[styles.priceColumn, styles.tableHeaderText]}>
              UNIT PRICE
            </Text>

            <Text style={[styles.amountColumn, styles.tableHeaderText]}>
              AMOUNT
            </Text>
          </View>

          {/* Table Rows */}
          {order.items.map((item, index) => {
            const amount = Number(item.price) * Number(item.qty);

            return (
              <View
                key={item.id}
                style={[
                  styles.tableRow,
                  index % 2 === 1 ? styles.tableRowAlt : {},
                ]}
                wrap={false}
              >
                <View style={styles.productColumn}>
                  <Text style={styles.productTitle}>{item.title}</Text>

                  {item.product?.productCode && (
                    <Text style={styles.productCode}>
                      Code: {item.product.productCode}
                    </Text>
                  )}
                </View>

                <Text style={[styles.quantityColumn, styles.tableCell]}>
                  {item.qty}
                </Text>

                <Text style={[styles.priceColumn, styles.tableCell]}>
                  {formatMoney(Number(item.price))}
                </Text>

                <Text style={[styles.amountColumn, styles.tableCell]}>
                  {formatMoney(amount)}
                </Text>
              </View>
            );
          })}
        </View>

        {/* ---------------------------------------------------------------- */}
        {/* Notes + Totals                                                  */}
        {/* ---------------------------------------------------------------- */}

        <View style={styles.bottomSection}>
          {/* Customer Note */}
          <View style={styles.noteSection}>
            {order.customerNote ? (
              <>
                <Text style={styles.noteTitle}>CUSTOMER NOTE</Text>

                <Text style={styles.noteText}>{order.customerNote}</Text>
              </>
            ) : (
              <>
                <Text style={styles.noteTitle}>THANK YOU</Text>

                <Text style={styles.noteText}>
                  Thank you for choosing ST Office Furniture. We appreciate your
                  business and look forward to serving you again.
                </Text>
              </>
            )}
          </View>

          {/* Totals */}
          <View style={styles.totals}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>

              <Text style={styles.totalValue}>
                {formatMoney(Number(order.subtotal))}
              </Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Delivery</Text>

              <Text style={styles.totalValue}>
                {formatMoney(Number(order.shippingCost))}
              </Text>
            </View>

            {Number(order.discountAmount) > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Discount</Text>

                <Text style={styles.discountValue}>
                  -{formatMoney(Number(order.discountAmount))}
                </Text>
              </View>
            )}

            <View style={styles.grandTotal}>
              <Text style={styles.grandTotalLabel}>TOTAL</Text>

              <Text style={styles.grandTotalValue}>
                {formatMoney(Number(order.total))}
              </Text>
            </View>

            <View style={[styles.totalRow, { marginTop: 9 }]}>
              <Text style={styles.totalLabel}>Paid</Text>

              <Text style={styles.totalValue}>
                {formatMoney(Number(order.paidAmount))}
              </Text>
            </View>

            {dueAmount > 0 && (
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { fontWeight: "bold" }]}>
                  Due
                </Text>

                <Text
                  style={[
                    styles.totalValue,
                    {
                      fontWeight: "bold",
                      color: "#DC2626",
                    },
                  ]}
                >
                  {formatMoney(dueAmount)}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* ---------------------------------------------------------------- */}
        {/* Payment Information                                              */}
        {/* ---------------------------------------------------------------- */}

        <View style={styles.paymentSection}>
          <Text style={styles.paymentHeader}>PAYMENT INFORMATION</Text>

          <View style={styles.paymentGrid}>
            <View style={styles.paymentColumn}>
              <Text style={styles.paymentLabel}>METHOD</Text>

              <Text style={styles.paymentValue}>
                {getPaymentMethodLabel(order.paymentMethod)}
              </Text>
            </View>

            <View style={styles.paymentColumn}>
              <Text style={styles.paymentLabel}>STATUS</Text>

              <Text style={styles.paymentValue}>
                {getPaymentStatusLabel(order.paymentStatus)}
              </Text>
            </View>

            <View style={styles.paymentColumn}>
              <Text style={styles.paymentLabel}>TRANSACTION ID</Text>

              <Text style={styles.paymentValue}>
                {order.transactionId ?? order.paymentId ?? "N/A"}
              </Text>
            </View>

            <View style={styles.paymentColumn}>
              <Text style={styles.paymentLabel}>PAID AT</Text>

              <Text style={styles.paymentValue}>
                {order.paidAt
                  ? `${formatDate(order.paidAt)}, ${formatTime(order.paidAt)}`
                  : "Not paid"}
              </Text>
            </View>
          </View>
        </View>

        {/* ---------------------------------------------------------------- */}
        {/* Closing                                                          */}
        {/* ---------------------------------------------------------------- */}

        <Text style={styles.thankYou}>
          Thank you for shopping with ST Office Furniture.
        </Text>

        <Text style={styles.website}>www.stofficefurniture.com</Text>

        {/* ---------------------------------------------------------------- */}
        {/* Footer                                                           */}
        {/* ---------------------------------------------------------------- */}

        <View style={styles.footer} fixed>
          <View>
            <Text style={styles.footerLeft}>
              ST Office Furniture • Better Seating Better Working
            </Text>

            <Text style={[styles.footerLeft, { marginTop: 2 }]}>
              Invoice created: {formatDate(invoiceCreatedAt)} •{" "}
              {formatTime(invoiceCreatedAt)} (BST)
            </Text>
          </View>

          <Text
            style={styles.footerRight}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
