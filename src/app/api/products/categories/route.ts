import { NextResponse } from "next/server";
import { fetchCategories } from "@/api/woocommerce/products";

async function GET() {
  try {
    const data = await fetchCategories();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch categories" }, 
      { status: 500 }
    );
  }
}

export { GET }