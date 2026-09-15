import { coreInfo } from "../data/core";

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

export function sendMessageSnipetClient({ name }: { name: string }) {
  return `
  
  <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Thank You for Contacting Us</title> </head> <body style=" margin: 0; padding: 0; background-color: #f4f4f5; font-family: Arial, Helvetica, sans-serif; color: #18181b; "> <div style=" max-width: 600px; margin: 40px auto; padding: 0 16px; "> <div style=" background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 14px; overflow: hidden; "> <!-- Header --> <div style=" padding: 28px 24px; background-color: #18181b; color: #ffffff; "> <h1 style=" margin: 0; font-size: 22px; font-weight: 600; "> Thank You for Contacting Us </h1> <p style=" margin: 8px 0 0; font-size: 14px; color: #d4d4d8; "> We have received your message. </p> </div> <!-- Content --> <div style="padding: 28px 24px;"> <p style=" margin: 0 0 16px; font-size: 16px; line-height: 1.6; "> Hello <strong>${name}</strong>, </p> <p style=" margin: 0 0 20px; font-size: 15px; line-height: 1.7; color: #52525b; "> Thank you for getting in touch with us. We have received your message and our team will get back to you as soon as possible. </p> <!-- Message summary --> <div style=" padding: 16px; background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 10px; margin-bottom: 24px; ">
  
 </div> <p style=" margin: 0; font-size: 15px; line-height: 1.7; color: #52525b; "> If you have any additional questions, simply reply to this email and we'll be happy to assist you. </p> </div> <!-- Footer --> <div style=" padding: 20px 24px; background-color: #fafafa; border-top: 1px solid #e4e4e7; text-align: center; "> <p style=" margin: 0 0 6px; font-size: 13px; font-weight: 600; "> ${coreInfo.name} </p> <p style=" margin: 0; font-size: 12px; color: #71717a; "> Thank you for choosing us. </p> </div> </div> </div> </body> </html>`;
}
export function sendMessageSnipetAdmin({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `
  <!DOCTYPE html> 
  <html lang="en"> 
  <head> 
  <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>New Contact Message</title> 
  </head> 
  <body style=" margin: 0; padding: 0; background-color: #f4f4f5; font-family: Arial, Helvetica, sans-serif; color: #18181b; "> 
  <div style=" max-width: 600px; margin: 40px auto; padding: 0 16px; "> <!-- Card --> <div style=" background-color: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e4e4e7; box-shadow: 0 4px 15px rgba(0,0,0,0.06); "> <!-- Header --> <div style=" padding: 24px; background-color: #18181b; color: #ffffff; "> <h1 style=" margin: 0; font-size: 22px; font-weight: 600; "> New Contact Message </h1> <p style=" margin: 8px 0 0; font-size: 14px; color: #d4d4d8; "> Someone has contacted you through your website. </p> </div> <!-- Content --> <div style="padding: 24px;"> <!-- Name --> <div style="margin-bottom: 20px;"> <p style=" margin: 0 0 6px; font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; "> Name </p> <p style=" margin: 0; font-size: 15px; font-weight: 500; "> ${name} </p> </div> <!-- Email --> <div style="margin-bottom: 20px;"> <p style=" margin: 0 0 6px; font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; "> Email </p> <p style=" margin: 0; font-size: 15px; "> ${email} </p> </div> <!-- Subject --> <div style="margin-bottom: 24px;"> <p style=" margin: 0 0 6px; font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; "> Subject </p> <p style=" margin: 0; font-size: 17px; font-weight: 600; "> ${subject} </p> </div> <!-- Divider --> <div style=" height: 1px; background-color: #e4e4e7; margin-bottom: 24px; "></div> <!-- Message --> <div> <p style=" margin: 0 0 10px; font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; "> Message </p> <div style=" padding: 16px; background-color: #f4f4f5; border-radius: 10px; border: 1px solid #e4e4e7; font-size: 15px; line-height: 1.7; color: #3f3f46; white-space: pre-wrap; word-break: break-word; ">${message}</div> </div> </div> <!-- Footer --> <div style=" padding: 18px 24px; background-color: #fafafa; border-top: 1px solid #e4e4e7; text-align: center; "> <p style=" margin: 0; font-size: 12px; color: #71717a; "> This message was sent from your website contact form. </p> </div> </div>
   </div> 
  </body>
   </html>`;
}
