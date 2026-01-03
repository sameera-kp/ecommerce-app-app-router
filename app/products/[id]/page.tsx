// app/products/[id]/page.tsx
import type { Product } from "../../types/product";

interface Props {
  // 1. Params is now a Promise
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  // 2. Await the params object
  const { id } = await params;

  // 3. Fetch from the source directly (Recommended for Server Components)
  // Or: const res = await fetch(`http://localhost:3000/api/products/${id}`) 
  // but direct fetch is faster.
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, { 
    next: { revalidate: 10 } 
  });
  
  const product: Product = await res.json();

  if (!product || (product as any).error) {
    return <p>Product not found.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      <img src={product.image} alt={product.title} width={200} />
    </div>
  );
}