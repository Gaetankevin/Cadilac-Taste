import { NextResponse } from "next/server";
import { getMenu } from "@/lib/dataProvider";

export async function GET() {
  const data = await getMenu();
  return NextResponse.json(data);
}
