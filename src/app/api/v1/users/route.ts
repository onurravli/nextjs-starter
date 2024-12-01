import { hashPassword, prisma } from "@/lib/utils";
import { createUserValidator } from "@/lib/validators";

import l from "lodash";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });
    return NextResponse.json(users);
  }
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const hashedPassword = await hashPassword(body.password);
    const { email } = createUserValidator.parse(body);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    return NextResponse.json(l.pick(user, ["id", "email"]));
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "An error occurred while creating the user", details: error },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { email, password } = createUserValidator.parse(body);
  const user = await prisma.user.update({
    where: { email },
    data: { password },
  });
  return NextResponse.json(user);
}
