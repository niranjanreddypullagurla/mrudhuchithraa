'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { motion, AnimatePresence } from 'framer-motion'
import { createBrowserClient } from '@supabase/ssr'
import { uploadImage } from '@/utils/supabase/storage'

export default function HeroManagerPage() {
  const [images, setImages] = useState<any[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data } = await supabase.from('hero_images').select('*').order('created_at', { ascending: true })
      if (data) setImages(data)
    }
    fetchImages()
  }, [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newUrl, setNewUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      const url = await uploadImage(file)
      if (url) setNewUrl(url)
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Remove this image from the homepage sliding gallery?")) {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      await supabase.from('hero_images').delete().eq('id', id)
      setImages(images.filter(img => img.id !== id))
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUrl) return
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data } = await supabase.from('hero_images').insert([{ url: newUrl }]).select().single()
    if (data) setImages([...images, data])
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
              className="bg-white rounded-3xl overflow-y-auto max-h-[90vh] max-w-md w-full p-8 shadow-2xl relative"
            >
              <h2 className="text-2xl font-heading text-black mb-6">Add Hero Image</h2>
              <form onSubmit={handleAdd} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-gold font-medium block font-body">Hero Image</label>
                  <div className="flex flex-col gap-4">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
                    />
                    <div className="text-center text-xs text-gray-400">OR</div>
                    <Input label="Paste Image URL" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} required={!newUrl} disabled={isUploading} />
                  </div>
                  {isUploading && <p className="text-xs text-gold">Uploading image, please wait...</p>}
                  {newUrl && <img src={newUrl} className="mt-4 h-24 w-auto object-cover rounded-lg border border-gray-200" alt="Preview" />}
                </div>
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
