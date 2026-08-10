import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(users);
}