// import prisma from "@/app/lib/next-auth/prisma";
// import { NextResponse } from "next/server";

// export async function GET(
//   request: Request, 
//   { params }: { params: { userid: string } }
// ) {
//   console.log(params.userid)
//   const userid = params.userid;

//   try {
//     const purchases = await prisma.purchase.findMany({
//       where: { userId: userid },
//     })
//     return NextResponse.json(purchases);
//   } catch (err) {
//     return NextResponse.json(err)
//   }
// }
import prisma from "@/app/lib/next-auth/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // Next.js の Request 型

export async function GET(
  request: NextRequest, // Next.js 用の Request 型を使用
  context: { params: { userid: string } } // 明確に定義された context 型
) {
  const { userid } = context.params;

  try {
    const purchases = await prisma.purchase.findMany({
      where: { userId: userid },
    });
    return NextResponse.json(purchases);
  } catch (err) {
    console.error("Error fetching purchases:", err); // デバッグ用のログ
    return NextResponse.json({ error: "Failed to fetch purchases" }, { status: 500 });
  }
}
