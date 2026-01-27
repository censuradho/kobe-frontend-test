import { ProductCard } from "@/components";
import { useDelay } from "@/hooks/useDelay";
import type { ProductSuggestion } from "@/models/chat";
import clsx from "clsx";
import { useState } from "react";

export function ProductFactory (data: ProductSuggestion) {
  const [visibilityCount, setVisibilityCount] = useState(0)

  useDelay(() => {
    if (visibilityCount >= data.products.length - 1) return;
    setVisibilityCount(v => v + 1);
  }, 1000)

  const items=  data.products.map((product, index) => (
    <ProductCard 
      key={product.id}
      price={product.price}
      originalPrice={product.originalPrice}
      rating={product.rating}
      badge={product.badge}
      title={product.title}
      image={product.image}
      className={clsx({
        'opacity-100': visibilityCount >= index,
        'opacity-0': visibilityCount < index,
      })}
    />
  ))

  return (
    <ul className="flex flex-wrap gap-2">
      {items}
    </ul>
  )
}