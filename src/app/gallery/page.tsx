'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const fetchGallery = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false })
      if (data) setItems(data)
    }
    fetchGallery()
  }, [])

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-16">
          <a href="/" className="inline-flex items-center gap-2 text-[var(--foreground)]/50 hover:text-[var(--color-gold)] mb-8 transition-colors font-body text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Home
          </a>
          <h1 className="font-heading text-4xl md:text-5xl text-[var(--foreground)] mb-4">Gallery</h1>
          <p className="font-body text-lg text-[var(--foreground)]/70 max-w-xl">
            A visual diary of our bespoke creations and artistic journey.
          </p>
        </header>

        {/* Pinterest Style Masonry Grid Placeholder */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
          {items.map((item, i) => {
            const heights = ['h-32', 'h-40', 'h-48', 'h-56']
            const randomHeight = heights[i % 4]
            return (
              <div 
                key={item.id} 
                className={`w-full bg-[var(--color-cream)] rounded-xl overflow-hidden relative group break-inside-avoid ${randomHeight}`}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                  <p className="font-heading text-lg px-2 text-center truncate w-full">{item.title}</p>
                </div>
              </div>
            )
          })}
        </div>
        
        {items.length === 0 && (
          <div className="text-center py-20 text-[var(--foreground)]/50">
            No items have been added to the gallery yet.
          </div>
        )}
      </div>
    </main>
  )
}
