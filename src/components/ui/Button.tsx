import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-button transition-all duration-500 ease-out disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden',
          {
            'bg-foreground text-background hover:bg-gold rounded-full': variant === 'primary',
            'bg-gold text-white hover:bg-brown rounded-full': variant === 'secondary',
            'border border-foreground/30 text-foreground hover:border-gold hover:text-gold rounded-full': variant === 'outline',
            'hover:bg-foreground/5 text-foreground rounded-full': variant === 'ghost',
            'bg-transparent text-foreground hover:text-gold rounded-none border-b border-transparent hover:border-gold px-0 py-1': variant === 'link',
            
            // Sizes don't apply to links
            'px-6 py-2.5 text-sm': size === 'sm' && variant !== 'link',
            'px-8 py-3.5 text-base': size === 'md' && variant !== 'link',
            'px-10 py-4 text-lg': size === 'lg' && variant !== 'link',
          },
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    )
  }
)
Button.displayName = 'Button'
