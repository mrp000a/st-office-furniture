import { orderConfirmationEmail } from "@/components/uiComponent/order-confirm-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to, subject, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "ST Office Furniture <info@stofficefurniture.com>",
      to: [to],
      subject,
      html: orderConfirmationEmail({
        customerName: "Muhammad Rakib",
        orderId: 8,
        subtotal: 900,
        total: 1000,
        deliveryCharge: 100,
        orderUrl: "#",
        status,
        items: [
          { title: "Something", price: 100, quantity: 1 },
          { title: "Something 2", price: 100, quantity: 1 },
          { title: "Something 3", price: 100, quantity: 1 },
        ],
      }),
    });

    if (error) {
      console.error(error);

      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
