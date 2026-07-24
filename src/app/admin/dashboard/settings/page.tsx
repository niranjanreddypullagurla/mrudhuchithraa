'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Save } from 'lucide-react'

const initialSettings = {
  instagram: '@mrudhuchithraa',
  email: 'hello@mrudhuchithraa.com',
  phone: '+91 98765 43210',
  location: 'Bangalore, India'
}

export default function SettingsManagerPage() {
  const [settings, setSettings] = useState(initialSettings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem('admin_settings')
    if (data) setSettings(JSON.parse(data))
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('admin_settings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading text-gray-900">Website Settings</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-heading text-gray-800 mb-6">Connect & Footer Information</h2>
        
        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
          <div className="space-y-4">
            <Input 
              label="Instagram Handle" 
              name="instagram" 
              value={settings.instagram} 
              onChange={handleChange} 
              required 
            />
            <Input 
              label="Email Address" 
              name="email" 
              type="email"
              value={settings.email} 
              onChange={handleChange} 
              required 
            />
            <Input 
              label="Phone Number" 
              name="phone" 
              value={settings.phone} 
              onChange={handleChange} 
              required 
            />
            <Input 
              label="Location" 
              name="location" 
              value={settings.location} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Button type="submit" className="gap-2">
              <Save className="w-4 h-4" /> Save Settings
            </Button>
            {saved && <span className="text-emerald-500 font-medium text-sm">Settings saved successfully!</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
