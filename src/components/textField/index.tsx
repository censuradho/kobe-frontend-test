import { cn } from "@/lib/tailwind";
import type { InputHTMLAttributes } from "react";
import Send from '@/assets/send.svg?react'

interface TextFieldProps extends 
  Pick<InputHTMLAttributes<HTMLInputElement>, 
  'value' | 
  'onChange' | 
  'placeholder' | 
  'type' | 
  'id' 
  > {
    label: string
  }

export function TextField (props: TextFieldProps) {
  const {
    id,
    label,
    ...otherProps
  } = props

  return (
    <div className="relative flex items-center">
      <input
        className={cn(
          'w-full p-2 bg-neutral-100 border border-surface-contrast rounded-xl px-4',
        )}
        aria-label={label}
        id={id}
        {...otherProps}
      />
      <button 
        className="absolute right-4 cursor-pointer" aria-label="Enviar"
      >
        <Send  />
      </button>
    </div>
  )
}