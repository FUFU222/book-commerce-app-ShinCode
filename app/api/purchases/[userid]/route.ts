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
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  {params} : {params: Promise<{userid: string }> }
) {
  const { userid } = await params;

  try {
    const purchases = await prisma.purchase.findMany({
      where: { userId: userid },
    });

    return NextResponse.json(purchases);
  } catch (err) {
    console.error("Error fetching purchases:", err);
    return NextResponse.json({ error: "Failed to fetch purchases" }, { status: 500 });
  }
}