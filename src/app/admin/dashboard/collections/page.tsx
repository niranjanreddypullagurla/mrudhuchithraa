'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { motion, AnimatePresence } from 'framer-motion'
import { createBrowserClient } from '@supabase/ssr'
import { uploadImage } from '@/utils/supabase/storage'

export default function AdminCollections() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const fetchCollections = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data } = await supabase.from('collections').select('*').order('created_at', { ascending: false })
      if (data) setItems(data)
    }
    fetchCollections()
  }, [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Form State
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      const url = await uploadImage(file)
      if (url) setImage(url)
      setIsUploading(false)
    }
  }

  const openAddModal = () => {
    setEditingItem(null)
    setTitle('')
    setCategory('')
    setImage('')
    setIsModalOpen(true)
  }

  const openEditModal = (item: any) => {
    setEditingItem(item)
    setTitle(item.title)
    setCategory(item.category)
    setImage(item.image)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this piece?")) {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      await supabase.from('collections').delete().eq('id', id)
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
      const { data } = await supabase.from('collections')
        .update({ title, category, image })
        .eq('id', editingItem.id)
        .select().single()
      if (data) setItems(items.map(i => i.id === editingItem.id ? data : i))
    } else {
      const { data } = await supabase.from('collections')
        .insert([{ title, category, image }])
        .select().single()
      if (data) setItems([data, ...items])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading text-black">Manage Collections</h1>
          <p className="text-gray-500 font-body text-sm mt-1">Post new artwork, edit details, or delete old pieces from your public gallery.</p>
        </div>
        <Button onClick={openAddModal} className="gap-2 bg-black text-white hover:bg-gold border-none">
          <Plus className="w-4 h-4" /> Post New Artwork
        </Button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Artwork Image</th>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-black">{item.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button onClick={() => openEditModal(item)} className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-2" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    No artwork uploaded yet. Click "Post New Artwork" to start building your gallery.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add / Edit */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-y-auto max-h-[90vh] max-w-md w-full p-8 shadow-2xl relative"
            >
              <h2 className="text-2xl font-heading text-black mb-6">
                {editingItem ? 'Edit Artwork' : 'Post New Artwork'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input 
                  label="Artwork Title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required 
                />
                
                <Input 
                  label="Category (e.g., Resin, Canvas, Abstract)" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required 
                />
                
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
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="w-full">
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full bg-black text-white hover:bg-gold border-none">
                    {editingItem ? 'Save Changes' : 'Post to Gallery'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
