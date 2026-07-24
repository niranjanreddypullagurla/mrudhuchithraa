import { cn } from '@/utils/cn'

interface LoaderProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Loader = ({ className, size = 'md' }: LoaderProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-[var(--color-gold)] border-t-transparent",
          {
            'h-4 w-4': size === 'sm',
            'h-8 w-8': size === 'md',
            'h-12 w-12 border-4': size === 'lg',
          }
        )}
      />
    </div>
  )
}

export const FullScreenLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]">
    <div className="flex flex-col items-center gap-4 animate-pulse">
      <h2 className="font-heading text-2xl text-[var(--color-gold)]">Mrudhuchithraa</h2>
      <Loader size="md" />
    </div>
  </div>
)
