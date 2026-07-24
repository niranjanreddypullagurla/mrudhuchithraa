'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  error?: string
  label?: string
  as?: 'input' | 'textarea'
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, error, label, id, as = 'input', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    const baseClasses = cn(
      'w-full bg-transparent px-0 py-3 text-base text-foreground transition-all duration-300',
      'border-b border-foreground/20 focus:border-gold outline-none',
      'placeholder:text-foreground/30',
      'disabled:cursor-not-allowed disabled:opacity-50',
      {
        'border-red-500 focus:border-red-500': error,
        'resize-none min-h-[120px]': as === 'textarea'
      },
      className
    )

    return (
      <div className="w-full flex flex-col relative group pt-4">
        {label && (
          <label 
            htmlFor={id} 
            className={cn(
              "absolute left-0 transition-all duration-300 pointer-events-none font-body",
              isFocused || (props.value && props.value !== '')
                ? "-top-1 text-xs text-gold font-medium"
                : "top-7 text-base text-foreground/60"
            )}
          >
            {label}
          </label>
        )}
        
        {as === 'textarea' ? (
          <textarea
            id={id}
            ref={ref as any}
            className={baseClasses}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            {...(props as any)}
          />
        ) : (
          <input
            id={id}
            ref={ref as any}
            className={baseClasses}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e as any)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e as any)
            }}
            {...(props as any)}
          />
        )}
        
        {/* Animated Underline Effect */}
        <span 
          className={cn(
            "absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-500 ease-out",
            isFocused ? "w-full" : "w-0"
          )}
        />
        
        {error && <span className="text-xs text-red-500 mt-1 font-body">{error}</span>}
      </div>
    )
  }
)
Input.displayName = 'Input'
