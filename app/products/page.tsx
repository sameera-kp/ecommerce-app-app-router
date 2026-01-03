// app/products/page.tsx
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";

export const revalidate = 10; // ISR: revalidate every 10s

export default async function ProductsPage() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: revalidate },
    });

    // Parse response
    const data: Product[] | { error: string } = await res.json();

    if ("error" in data) {
      return (
        <div className="container mt-5">
          <h2>Error loading products:</h2>
          <p>{data.error}</p>
        </div>
      );
    }

    return (
      <div className="container mt-4">
        <h1 className="mb-4">Products</h1>
        <div className="row">
          {data.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  } catch (err: any) {
    return (
      <div className="container mt-5">
        <h2>Error loading products:</h2>
        <p>{err.message}</p>
      </div>
    );
  }
}
