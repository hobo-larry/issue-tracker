import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { redirect } from "next/navigation";

export async function GET() {
  const session = await getServerSession(authOptions);

  {
    session?.user.role !== "ADMIN" && redirect("/api/auth/signin");
  }

  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(users);
}