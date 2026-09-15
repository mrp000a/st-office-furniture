import { coreInfo } from "@/components/data/core";
import {
  orderConfirmationEmail,
  sendMessageSnipet,
  sendMessageSnipetAdmin,
  sendMessageSnipetClient,
} from "../../../../components/uiComponent/order-confirm-email";
import { Resend } from "resend";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { to, subject, message, name } = await req.json();

    const adminEmail = await resend.emails.send({
      from: "ST Office Furniture <info@stofficefurniture.com>",
      to: [coreInfo.email2],
      subject,
      html: sendMessageSnipetAdmin({ name, message, subject, email: to }),
    });

    const clientEmail = await resend.emails.send({
      from: "ST Office Furniture <info@stofficefurniture.com>",
      to: [to],
      subject,
      html: sendMessageSnipetClient({ name }),
    });

    if (!adminEmail && !clientEmail) {
      return Response.json(
        { success: false, error: "something went wrong" },
        { status: 400 },
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
