// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import type { Product } from "../../../types/product";

// 1. Update the interface to use a Promise
interface Params {
  params: Promise<{ id: string }>; 
}

export async function GET(
  _req: Request,
  { params }: Params // Destructure as before
): Promise<NextResponse<Product | { error: string }>> {
  
  // 2. Await the params before accessing properties
  const { id } = await params;

  // 3. Check the awaited id
  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch product" }, { status: res.status });
    }

    const product: Product = await res.json();

    return NextResponse.json(product);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}