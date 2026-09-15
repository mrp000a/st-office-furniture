type OrderItem = {
  title: string;
  quantity: number;
  price: number;
  image?: string;
};

type OrderEmailProps = {
  customerName: string;
  orderId: number | string;
  status: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  orderUrl: string;
};

export function orderConfirmationEmail({
  customerName,
  orderId,
  items,
  subtotal,
  deliveryCharge,
  total,
  orderUrl,
  status,
}: OrderEmailProps) {
  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
            <strong style="color: #222222;">
              ${item.title}
            </strong>
            <br />
            <span style="font-size: 13px; color: #777777;">
              Quantity: ${item.quantity}
            </span>
          </td>

          <td
            align="right"
            style="
              padding: 12px 0;
              border-bottom: 1px solid #eeeeee;
              color: #222222;
              white-space: nowrap;
            "
          >
            ৳${(item.price * item.quantity).toLocaleString()}
          </td>
        </tr>
      `,
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Confirmation</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    font-family: Arial, Helvetica, sans-serif;
  "
>

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #f5f5f5;"
  >
    <tr>
      <td align="center" style="padding: 40px 15px;">

        <!-- Main container -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                padding: 25px 30px;
                background-color: #111111;
                text-align: center;
              "
            >
              <div
                style="
                  color: #ffffff;
                  font-size: 22px;
                  font-weight: bold;
                  letter-spacing: 1px;
                "
              >
                ST OFFICE FURNITURE
              </div>

              <div
                style="
                  margin-top: 6px;
                  color: #bbbbbb;
                  font-size: 12px;
                "
              >
                Better Seating. Better Working.
              </div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 35px 30px;">

              <div
                style="
                  font-size: 28px;
                  text-align: center;
                  margin-bottom: 10px;
                "
              >
                ✓
              </div>

              <h1
                style="
                  margin: 0;
                  text-align: center;
                  color: #222222;
                  font-size: 24px;
                "
              >
                Order Confirmed!
              </h1>

              <p
                style="
                  margin: 12px 0 30px;
                  text-align: center;
                  color: #666666;
                  font-size: 15px;
                  line-height: 1.6;
                "
              >
                Hi ${customerName}, thank you for shopping with
                ST Office Furniture.
              </p>

              <!-- Order information -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background-color: #f8f8f8;
                  border-radius: 8px;
                "
              >
                <tr>
                  <td style="padding: 15px 18px;">
                    <span style="color: #777777; font-size: 13px;">
                      Order Number
                    </span>
                    <br />

                    <strong
                      style="
                        color: #222222;
                        font-size: 16px;
                      "
                    >
                      #${orderId}
                    </strong>
                  </td>

                  <td
                    align="right"
                    style="padding: 15px 18px;"
                  >
                    <span style="color: #777777; font-size: 13px;">
                      Status
                    </span>
                    <br />

                    <strong
                      style="
                        color: #15803d;
                        font-size: 14px;
                      "
                    >
                      ${status}
                    </strong>
                  </td>
                </tr>
              </table>

              <!-- Products -->
              <h2
                style="
                  margin: 30px 0 10px;
                  font-size: 17px;
                  color: #222222;
                "
              >
                Your Items
              </h2>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                ${itemsHtml}
              </table>

              <!-- Summary -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin-top: 20px;"
              >
                <tr>
                  <td
                    style="
                      padding: 5px 0;
                      color: #777777;
                    "
                  >
                    Subtotal
                  </td>

                  <td
                    align="right"
                    style="
                      padding: 5px 0;
                      color: #333333;
                    "
                  >
                    ৳${subtotal.toLocaleString()}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 5px 0;
                      color: #777777;
                    "
                  >
                    Delivery
                  </td>

                  <td
                    align="right"
                    style="
                      padding: 5px 0;
                      color: #333333;
                    "
                  >
                    ৳${deliveryCharge.toLocaleString()}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding-top: 15px;
                      border-top: 2px solid #eeeeee;
                      font-size: 17px;
                      font-weight: bold;
                    "
                  >
                    Total
                  </td>

                  <td
                    align="right"
                    style="
                      padding-top: 15px;
                      border-top: 2px solid #eeeeee;
                      font-size: 18px;
                      font-weight: bold;
                    "
                  >
                    ৳${total.toLocaleString()}
                  </td>
                </tr>
              </table>

              <!-- Button -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin-top: 30px;"
              >
                <tr>
                  <td align="center">
                    <a
                      href="${orderUrl}"
                      style="
                        display: inline-block;
                        padding: 13px 25px;
                        background-color: #111111;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 6px;
                        font-size: 14px;
                        font-weight: bold;
                      "
                    >
                      View Your Order
                    </a>
                  </td>
                </tr>
              </table>

              <p
                style="
                  margin-top: 30px;
                  color: #777777;
                  font-size: 13px;
                  line-height: 1.6;
                  text-align: center;
                "
              >
                We'll keep you updated as your order moves through
                the delivery process.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="
                padding: 25px 30px;
                background-color: #fafafa;
                text-align: center;
                border-top: 1px solid #eeeeee;
              "
            >
              <strong style="color: #333333;">
                ST Office Furniture
              </strong>

              <p
                style="
                  margin: 8px 0;
                  color: #888888;
                  font-size: 12px;
                "
              >
                Better Seating. Better Working.
              </p>

              <p
                style="
                  margin: 0;
                  color: #888888;
                  font-size: 12px;
                "
              >
                info@stofficefurniture.com
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
}
