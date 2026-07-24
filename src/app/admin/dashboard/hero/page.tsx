'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { motion, AnimatePresence } from 'framer-motion'

const initialImages: any[] = []

export default function HeroManagerPage() {
  const [images, setImages] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('admin_hero')
    if (saved) setImages(JSON.parse(saved))
  }, [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newUrl, setNewUrl] = useState('')

  const handleDelete = (id: number) => {
    if (confirm("Remove this image from the homepage sliding gallery?")) {
      const updated = images.filter(img => img.id !== id)
      setImages(updated)
      localStorage.setItem('admin_hero', JSON.stringify(updated))
    }
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const updated = [...images, { id: Date.now(), url: newUrl }]
    setImages(updated)
    localStorage.setItem('admin_hero', JSON.stringify(updated))
    setNewUrl('')
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading text-black">Hero Manager</h1>
          <p className="text-gray-500 font-body text-sm mt-1">Manage the sliding images displayed on the homepage.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-black text-white hover:bg-gold border-none">
          <Plus className="w-4 h-4" /> Add Image
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map(img => (
          <div key={img.id} className="relative group rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 aspect-[4/5]">
            <img src={img.url} className="w-full h-full object-cover" alt="Hero" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button onClick={() => handleDelete(img.id)} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-transform hover:scale-110 shadow-lg">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {images.length === 0 && (
        <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm text-center text-gray-400">
          No hero images added. The homepage slider will be empty.
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden max-w-md w-full p-8 shadow-2xl relative"
            >
              <h2 className="text-2xl font-heading text-black mb-6">Add Hero Image</h2>
              <form onSubmit={handleAdd} className="space-y-6">
                <Input label="Image URL" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} required />
                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="w-full">Cancel</Button>
                  <Button type="submit" className="w-full bg-black text-white hover:bg-gold border-none">Add to Slider</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
