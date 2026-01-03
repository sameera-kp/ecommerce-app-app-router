
import { NextResponse } from "next/server";
import type { Product } from "../../types/product";

export async function GET(): Promise<NextResponse<Product[] | { error: string }>> {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch products" }, { status: res.status });
    }

    const products: Product[] = await res.json();
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
