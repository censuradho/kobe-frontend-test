import { cn } from "../lib/tailwind"
import { toCurrency } from "../lib/toCurrency"
import { Rating } from "./Rating"

interface ImageProps {
  src: string
  alt: string
}

interface ProductCardProps {
  title: string
  price: number
  originalPrice?: number
  image?: ImageProps
  rating?: number
  badge?: string
}

export function ProductCard (props: ProductCardProps) {
  const { 
    title, 
    price, 
    originalPrice, 
    image, 
    rating = 0,
    badge = "Lançamento"
  } = props

  return (
    <article className={cn(
      'bg-neutral-100 p-3 w-full max-w-86.5 rounded-xl',
      'flex gap-2 items-start',
      'md:flex-col md:max-w-[168px]',
    )}>
      <div className="min-w-36 min-h-36 bg-surface-low-contrast relative overflow-hidden rounded-sm">
        {badge && (
          <span className="text-surface bg-primary caption--regular w-full absolute top-0 left-0 text-center">{badge}</span>
        )}
        {image && (
          <img 
            className="size-full object-cover"
            src={image.src} 
            alt={image.alt} 
          />
        )}
      </div>
      <div className="w-full flex flex-col gap-4">
        <strong className="body-small--bold text-surface-contrast">{title}</strong>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            {originalPrice && (
              <span className="text-xs font-400 text-surface-contrast line-through">{toCurrency(originalPrice)}</span>
            )}
            <span className="body-small--bold text-surface-contrast">{toCurrency(price)}</span>
          </div>
          <Rating value={rating} max={5} />
        </div>
      </div>
    </article>
  )

}