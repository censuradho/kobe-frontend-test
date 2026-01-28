import { cn } from "@/lib/tailwind";
import type { InputHTMLAttributes } from "react";
import Send from '@/assets/send.svg?react'

interface TextFieldProps extends 
  Pick<InputHTMLAttributes<HTMLInputElement>, 
  'value' | 
  'onChange' | 
  'placeholder' | 
  'type' | 
  'id' | 
  'disabled'
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
        className="absolute right-4 cursor-pointer disabled:opacity-30" aria-label="Enviar"
        disabled={props.disabled}
      >
        <Send  />
      </button>
    </div>
  )
}