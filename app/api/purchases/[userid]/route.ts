import prisma from "@/app/lib/next-auth/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request, 
  { params }: { params: { userid: string } }
) {
  const userid = params.userid;

  try {
    const purchases = await prisma.purchase.findMany({
      where: { userId: userid },
    })
    return NextResponse.json(purchases);
  } catch (err) {
    return NextResponse.json(err)
  }
}