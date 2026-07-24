'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { motion, AnimatePresence } from 'framer-motion'

const initialCats: any[] = []

export default function CategoriesManagerPage() {
  const [categories, setCategories] = useState(initialCats)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const openAdd = () => { setEditing(null); setName(''); setDescription(''); setIsModalOpen(true); }
  const openEdit = (cat: any) => { setEditing(cat); setName(cat.name); setDescription(cat.description); setIsModalOpen(true); }
  const handleDelete = (id: number) => { if(confirm("Delete this category?")) setCategories(categories.filter(c => c.id !== id)) }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      setCategories(categories.map(c => c.id === editing.id ? { ...c, name, description } : c))
    } else {
      setCategories([...categories, { id: Date.now(), name, description }])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading text-black">Categories</h1>
          <p className="text-gray-500 text-sm mt-1">Manage artwork categories.</p>
        </div>
        <Button onClick={openAdd} className="bg-black text-white hover:bg-gold border-none"><Plus className="w-4 h-4 mr-2" /> Add Category</Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left font-body">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-bold text-black">{cat.name}</td>
                <td className="px-6 py-4 text-gray-600">{cat.description}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => openEdit(cat)} className="p-2 text-gray-400 hover:text-blue-500"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(cat.id)} className="p-2 text-gray-400 hover:text-red-500 ml-2"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
              <h2 className="text-2xl font-heading mb-6">{editing ? 'Edit Category' : 'New Category'}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input label="Category Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
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
