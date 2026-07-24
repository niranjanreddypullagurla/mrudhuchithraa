'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Camera } from 'lucide-react'



export default function CollectionsPage() {
  const [items, setItems] = useState<any[]>([])
  const [selectedItem, setSelectedItem] = useState<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem('admin_collections')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  // Admin configurable links (hardcoded for now)
  const whatsappLink = "https://wa.me/919876543210?text=I'm%20interested%20in%20ordering%20a%20custom%20piece%20like%20"
  const instaLink = "https://instagram.com/mrudhuchithraa"

  return (
    <main className="min-h-screen pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-16 text-center">
          <div className="flex justify-center mb-8">
            <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition-colors font-body text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              Back to Home
            </a>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl text-black mb-4">The Collections</h1>
          <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto">
            Click on any piece that inspires you to start your custom order.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {items.map((item) => (
            <motion.div 
              key={item.id} 
              whileHover={{ y: -5 }}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-200">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-4 bg-white text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-1 truncate">{item.category}</p>
                <h3 className="font-heading text-lg text-black truncate">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        {items.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No collections have been added yet. Please check back soon!
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-2xl relative"
            >
              <div className="w-full md:w-1/2 h-64 md:h-[600px] relative bg-gray-200">
                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-white">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <p className="text-sm font-bold uppercase tracking-widest text-gold mb-4">{selectedItem.category}</p>
                <h2 className="font-heading text-4xl text-black mb-6">{selectedItem.title}</h2>
                <p className="font-body text-gray-600 mb-10 leading-relaxed">
                  Love this style? We can create a customized version tailored specifically for you. 
                  Reach out to us directly on WhatsApp or Instagram to discuss dimensions, colors, and pricing.
                </p>
                
                <div className="flex flex-col gap-4">
                  <a href={`${whatsappLink}${encodeURIComponent(selectedItem.title)}`} target="_blank" rel="noreferrer">
                    <Button className="w-full gap-3 flex items-center justify-center bg-[#25D366] text-white hover:bg-[#128C7E] border-none !rounded-full">
                      <MessageCircle className="w-5 h-5" /> Order via WhatsApp
                    </Button>
                  </a>
                  <a href={instaLink} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="w-full gap-3 flex items-center justify-center border-gray-200 text-black hover:border-black !rounded-full">
                      <Camera className="w-5 h-5" /> DM on Instagram
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
