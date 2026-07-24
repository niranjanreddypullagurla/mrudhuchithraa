'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { createBrowserClient } from '@supabase/ssr'

export default function Home() {
  const [heroImages, setHeroImages] = useState<any[]>([])

  useEffect(() => {
    const fetchHero = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data } = await supabase.from('hero_images').select('*').order('created_at', { ascending: true })
      if (data) setHeroImages(data)
    }
    fetchHero()
  }, [])

  const displayImages = heroImages.length > 0 ? heroImages.map(i => i.url) : []

  return (
    <main className="min-h-screen relative bg-white">
      <div className="container mx-auto px-6 md:px-12 pt-32 pb-10 flex flex-col items-center text-center relative z-10">
        <div className="max-w-4xl mt-12 mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-6xl md:text-8xl text-black mb-8 leading-[1.1] tracking-tight"
          >
            Handcrafted <br />
            <span className="text-gold italic">Elegance.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Welcome to Mrudhuchithraa, a pristine digital gallery of bespoke creations. Discover art designed exclusively for your space.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-6"
          >
            <Link href="/collections">
              <Button size="lg" className="px-10 bg-black text-white hover:bg-gold border-none">
                View Collections
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scrolling Image Marquee */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-10 bg-gray-50 border-y border-gray-100">
          {displayImages.length > 0 ? (
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex gap-8 w-max"
            >
              {[...displayImages, ...displayImages, ...displayImages, ...displayImages].map((src, idx) => (
                <div key={idx} className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] relative overflow-hidden rounded-2xl shrink-0 shadow-sm bg-gray-200">
                  <img src={src} alt="Art piece" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="w-full py-20 flex items-center justify-center text-gray-400">
              No hero images added yet.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
