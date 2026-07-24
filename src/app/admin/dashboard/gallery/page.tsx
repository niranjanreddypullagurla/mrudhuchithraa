'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { motion, AnimatePresence } from 'framer-motion'
import { createBrowserClient } from '@supabase/ssr'
import { uploadImage } from '@/utils/supabase/storage'

export default function GalleryManagerPage() {
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      const url = await uploadImage(file)
      if (url) setImage(url)
      setIsUploading(false)
    }
  }

  const openAdd = () => { setEditingItem(null); setTitle(''); setImage(''); setIsModalOpen(true); }
  const openEdit = (item: any) => { setEditingItem(item); setTitle(item.title); setImage(item.image); setIsModalOpen(true); }
  const handleDelete = async (id: string) => { 
    if (confirm("Delete this gallery image?")) {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      await supabase.from('gallery').delete().eq('id', id)
      setItems(items.filter(i => i.id !== id))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) return
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    if (editingItem) {
      const { data } = await supabase.from('gallery')
        .update({ title, image })
        .eq('id', editingItem.id)
        .select().single()
      if (data) setItems(items.map(i => i.id === editingItem.id ? data : i))
    } else {
      const { data } = await supabase.from('gallery')
        .insert([{ title, image }])
        .select().single()
      if (data) setItems([data, ...items])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading text-black">Gallery Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Manage public gallery display images.</p>
        </div>
        <Button onClick={openAdd} className="bg-black text-white hover:bg-gold border-none"><Plus className="w-4 h-4 mr-2" /> Add Image</Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left font-body">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                </td>
                <td className="px-6 py-4 font-bold text-black">{item.title}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-blue-500"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 ml-2"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-3xl overflow-y-auto max-h-[90vh] max-w-md w-full p-8 shadow-2xl relative">
              <h2 className="text-2xl font-heading mb-6">{editingItem ? 'Edit Gallery Image' : 'New Gallery Image'}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                
                <div className="space-y-2">
                  <label className="text-xs text-gold font-medium block font-body">Artwork Image</label>
                  <div className="flex flex-col gap-4">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
                    />
                    <div className="text-center text-xs text-gray-400">OR</div>
                    <Input label="Paste Image URL" value={image} onChange={(e) => setImage(e.target.value)} required={!image} disabled={isUploading} />
                  </div>
                  {isUploading && <p className="text-xs text-gold">Uploading image, please wait...</p>}
                  {image && <img src={image} className="mt-4 h-24 w-auto object-cover rounded-lg border border-gray-200" alt="Preview" />}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="w-full">Cancel</Button>
                  <Button type="submit" className="w-full bg-black text-white hover:bg-gold border-none">Save</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
