import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { email }: { email: string } = await req.json();

    // return;
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase().trim() },
          { phone: email.toLowerCase().trim() },
        ],
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "If the account exists, a verification email has been sent.",
      });
    }

    if (user.emailVerified) {
      return NextResponse.json({
        success: true,
        message: "Email is already verified.",
      });
    }

    if (user) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const token = crypto.randomBytes(32).toString("hex");

      await prisma.verificationToken.create({
        data: {
          token,
          userId: user.id,

          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });

      const verificationUrl = `${process.env.NEXT_PUBLIC_URL_SITE}/verify-email?token=${token}`;

      const a = await resend.emails.send({
        from: "ST Office Furniture <info@stofficefurniture.com>",
        to: user.email,
        subject: "Verify your ST Office Furniture account",

        text: `
          Hi ${user.name ?? "there"},

          Thank you for creating an account with ST Office Furniture.

          Please verify your email address using the link below:

          ${verificationUrl}

          This link will expire in 24 hours.

          If you did not create this account, you can safely ignore this email.

          Regards,
          ST Office Furniture
          stofficefurniture.com
        `,

        html: `
          <!DOCTYPE html>
          <html>
            <body style="margin:0; padding:0; background:#f5f5f5;">
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="background:#f5f5f5; padding:40px 0;"
              >
                <tr>
                  <td align="center">

                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="
                        max-width:600px;
                        background:#ffffff;
                        border-radius:10px;
                        overflow:hidden;
                        font-family:Arial,Helvetica,sans-serif;
                      "
                    >

                      <!-- Header -->
                      <tr>
                        <td
                          style="
                            background:#000000;
                            padding:25px;
                            text-align:center;
                          "
                        >
                          <h1
                            style="
                              margin:0;
                              color:#ffffff;
                              font-size:24px;
                            "
                          >
                            ST Office Furniture
                          </h1>
                        </td>
                      </tr>

                      <!-- Content -->
                      <tr>
                        <td style="padding:35px 30px; color:#333333;">

                          <h2
                            style="
                              margin-top:0;
                              font-size:22px;
                              color:#111111;
                            "
                          >
                            Welcome to ST Office Furniture!
                          </h2>

                          <p>
                            Hi ${user.name ?? "there"},
                          </p>

                          <p style="line-height:1.6;">
                            Thank you for creating an account with us.
                            Please verify your email address by clicking the
                            button below.
                          </p>

                          <div style="text-align:center; margin:30px 0;">
                            <a
                              href="${verificationUrl}"
                              style="
                                display:inline-block;
                                padding:13px 24px;
                                background:#000000;
                                color:#ffffff;
                                text-decoration:none;
                                border-radius:6px;
                                font-weight:bold;
                              "
                            >
                              Verify Email
                            </a>
                          </div>

                          <p style="font-size:14px; color:#666666;">
                            This verification link will expire in 24 hours.
                          </p>

                          <p style="font-size:14px; color:#666666;">
                            If you did not create this account, you can safely
                            ignore this email.
                          </p>

                          <p style="margin-top:30px;">
                            Regards,<br />
                            <strong>ST Office Furniture</strong>
                          </p>

                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td
                          style="
                            padding:20px;
                            background:#f8f8f8;
                            text-align:center;
                            font-size:12px;
                            color:#777777;
                          "
                        >
                          © ${new Date().getFullYear()} ST Office Furniture
                        </td>
                      </tr>

                    </table>

                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });

      if (a.error)
        return NextResponse.json({
          success: false,
          message: "Varification Email Couldn't sent. Please try again!",
        });
      if (a.data.id)
        return NextResponse.json({
          success: true,
          message:
            "Varification Email sent. Please Varify your email within 24 hour.",
        });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong!",
    });
  }
}
