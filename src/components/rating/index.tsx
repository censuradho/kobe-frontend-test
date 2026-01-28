import Star from '@/assets/star.svg?react'
import StarHalf from '@/assets/star-half.svg?react'

interface RatingProps {
  value: number
  max?: number
}

export function Rating (props: RatingProps) {
  const { value, max = 5 } = props

  const starts = Array.from({ length: max }).map((_, index) => {

    if (value >= index + 1) return (
      <Star 
        aria-hidden="true"
        data-testid="star" 
        key={index} 
      />
    )
    
    if (value > index && value < index + 1) return (
      <StarHalf 
        data-testid="star-half" 
        key={index} 
        aria-hidden="true"
      />
    )

    return (
      <span  
        key={index} 
        className="opacity-30"
        aria-hidden="true"
      ><Star data-testid="star" />
      </span>
    )
  })

  return (
    <div className="flex items-center bg-none appearance-none none">
      <meter 
        min={0}
        max={max}
        value={value}
        className='hidden'
        aria-label={`Avaliação: ${value} de ${max}`}
      >
      </meter>
      {starts}
    </div>
  )
}