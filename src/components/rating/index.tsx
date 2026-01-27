import Star from '@/assets/star.svg?react'
import StarHalf from '@/assets/star-half.svg?react'

interface RatingProps {
  value: number
  max?: number
}

export function Rating (props: RatingProps) {
  const { value, max = 5 } = props

  const starts = Array.from({ length: max }).map((_, index) => {

    if (value >= index + 1) return <Star key={index} />
    
    if (value > index && value < index + 1) return <StarHalf key={index} />

    return <span key={index} className="opacity-30"><Star /></span>
  })

  return (
    <div className="flex items-center">
      {starts}
    </div>
  )
}