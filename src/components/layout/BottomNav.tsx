'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Palette, Image as ImageIcon, BookOpen } from 'lucide-react'

export const BottomNav = () => {
  const pathname = usePathname()
  
  // Hide on admin routes
  if (pathname.startsWith('/admin')) return null

  return (
    <div className="bg-white py-16 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <h3 className="font-heading text-2xl md:text-3xl mb-8 text-center text-black">Keep Exploring</h3>
        
        {/* Single row scrollable container to ensure it stays in one row on small screens */}
        <div className="flex justify-start md:justify-center overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
          <div className="flex items-center gap-3 md:gap-5 min-w-max px-4 mx-auto">
            
            <Link href="/collections" className="group">
              <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 hover:-translate-y-1 transition-all duration-300 font-body text-sm font-medium border border-rose-100 shadow-sm">
                <Palette className="w-4 h-4" /> Collections
              </button>
            </Link>

            <Link href="/gallery" className="group">
              <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 hover:-translate-y-1 transition-all duration-300 font-body text-sm font-medium border border-sky-100 shadow-sm">
                <ImageIcon className="w-4 h-4" /> Gallery
              </button>
            </Link>

            <Link href="/custom-orders" className="group">
              <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-amber-50 text-amber-600 hover:bg-amber-100 hover:-translate-y-1 transition-all duration-300 font-body text-sm font-medium border border-amber-200 shadow-sm">
                <Sparkles className="w-4 h-4" /> Custom Art
              </button>
            </Link>

            <Link href="/about" className="group">
              <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:-translate-y-1 transition-all duration-300 font-body text-sm font-medium border border-emerald-100 shadow-sm">
                <BookOpen className="w-4 h-4" /> Our Story
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}
