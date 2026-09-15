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

        html: `
          <h2>Welcome to ST Office Furniture!</h2>

          <p>Hi ${user.name ?? "there"},</p>

          <p>
            Thank you for creating an account.
            Please verify your email address by clicking the button below.
          </p>

          <p>
            <a
              href="${verificationUrl}"
              style="
                display:inline-block;
                padding:12px 20px;
                background:#000;
                color:#fff;
                text-decoration:none;
                border-radius:6px;
              "
            >
              Verify Email
            </a>
          </p>

          <p>This link will expire in 24 hours.</p>

          <p>
            If you did not create this account, you can safely ignore this email.
          </p>

          <p>
            Regards,<br/>
            ST Office Furniture
          </p>
        `,
      });

      if (a.error)
        return NextResponse.json({
          success: false,
          message: "Varification Email Couldn't sent. Please try again!",
        });
      if (a.data.id)
        return NextResponse.json({
          success: false,
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
