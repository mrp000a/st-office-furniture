import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Gender, User, UserRole } from "@/generated/prisma";
import { getSession, requireRole } from "@/lib/serverAuth";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    // const email = searchParams.get("email");
    const searchString = searchParams.get("name") ?? "";
    const limit = Number(searchParams.get("limit")) ?? 100;
    // const phone = searchParams.get("phone");

    const users = await prisma.user.findMany({
      take: limit,
      where: searchString
        ? { name: { contains: searchString, mode: "insensitive" } }
        : {},

      include: { _count: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      result: users,
      message: "All users loaded.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message ?? "Db Error-" },
      { status: err?.status ?? 500 },
    );
  }
}

// create user by anyperson
export async function POST(req: Request) {
  try {
    // const sessionPromise = getSession();
    // await requireRole(sessionPromise, "ADMIN");

    const body = await req.json();
    const { role, name, email, phone, gender, image, address, password } =
      body as User;

    if (!name || !email || !phone || !password)
      return NextResponse.json(
        {
          success: false,
          message: "name,email,password, and phone are required!",
        },
        { status: 400 },
      );

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        address,
        role: role ?? "USER",

        image,
        gender,

        password: hashed,
      },
    });

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

      const verificationUrl = `${process.env.NEXT_PUBLIC_URL_SITE}/verify-email?token=${token}&userId${user.id}`;

      await resend.emails.send({
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
    }

    const { password: _p, ...rest } = user as User;

    return NextResponse.json({ success: true, result: rest });
  } catch (err: any) {
    const message = err?.message ?? String(err);
    return NextResponse.json(
      { success: false, message: message },
      { status: err?.status ?? 500 },
    );
  }
}

// only superadmin update update field
export async function PUT(req: Request) {
  try {
    const sessionPromise = getSession();
    await requireRole(sessionPromise, "SUPER_ADMIN");

    const body = await req.json();
    const { id, name, email, phone, role, gender, image, address, password } =
      body as User;

    if (!id || !name || !email || !phone)
      return NextResponse.json(
        {
          success: false,
          message: "name,email,password, and phone are required!",
        },
        { status: 400 },
      );

    const updateData: {
      name: string;
      email: string;
      phone: string;
      role: UserRole;
      gender: Gender;
      image?: string;
      address: string;
      password?: string;
    } = {
      name,
      email,
      phone,
      role,
      gender: gender ?? "MALE",
      image: image ?? "",
      address: address ?? "",
    };
    if (password && password.length > 5) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
    });

    const { password: _p, ...rest } = user as User;

    return NextResponse.json({ success: true, result: rest });
  } catch (err: any) {
    const message = err?.message ?? String(err);
    return NextResponse.json(
      { success: false, message: message },
      { status: err?.status ?? 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const sessionPromise = getSession();
    await requireRole(sessionPromise, "SUPER_ADMIN");
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    // const email = searchParams.get("email");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "User Not Deleted.",
      });
    }

    const users = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      result: users,
      message: "User Deleted.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message ?? "Db Error-" },
      { status: err?.status ?? 500 },
    );
  }
}
