'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Save, ShieldAlert } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

const initialSettings = {
  logoType: 'text',
  logoImage: '',
  brandName: 'Mrudhuchithraa',
  instagram: '@mrudhuchithraa',
  email: 'hello@mrudhuchithraa.com',
  phone: '+91 98765 43210',
  location: 'Bangalore, India'
}

export default function SettingsManagerPage() {
  const [settings, setSettings] = useState(initialSettings)
  const [saved, setSaved] = useState(false)
  
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [authMsg, setAuthMsg] = useState('')
  const [authError, setAuthError] = useState(false)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSettings({ ...settings, logoImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthMsg('Updating...')
    setAuthError(false)

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const updates: any = {}
    if (newEmail) updates.email = newEmail
    if (newPassword) updates.password = newPassword

    const { error } = await supabase.auth.updateUser(updates)

    if (error) {
      setAuthMsg(error.message)
      setAuthError(true)
    } else {
      setAuthMsg('Credentials updated successfully. If you changed your email, check both your old and new inboxes for a confirmation link before it takes effect.')
      setNewEmail('')
      setNewPassword('')
    }
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
            <div className="w-full flex flex-col relative group pt-4">
              <label className="text-xs text-gold font-medium mb-2 block font-body">Logo Type</label>
              <select 
                name="logoType" 
                value={settings.logoType || 'text'} 
                onChange={handleChange}
                className="w-full bg-transparent px-0 py-3 text-base text-foreground border-b border-foreground/20 focus:border-gold outline-none"
              >
                <option value="text">Text Logo</option>
                <option value="image">Image Logo</option>
              </select>
            </div>

            {settings.logoType === 'image' ? (
              <div className="w-full flex flex-col relative group pt-4">
                <label className="text-xs text-gold font-medium mb-2 block font-body">Upload Logo Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
                />
                {settings.logoImage && (
                  <img src={settings.logoImage} alt="Logo Preview" className="mt-4 h-12 object-contain bg-black/5 p-2 rounded" />
                )}
              </div>
            ) : (
              <Input 
                label="Brand / Logo Name" 
                name="brandName" 
                value={settings.brandName || ''} 
                onChange={handleChange} 
                required 
              />
            )}

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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-8">
        <h2 className="text-xl font-heading text-gray-800 mb-2 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500" /> Account Security
        </h2>
        <p className="text-gray-500 text-sm mb-6">Update your admin login email or password. Leave blank if you don't want to change it.</p>
        
        <form onSubmit={handleUpdateAuth} className="space-y-6 max-w-2xl">
          <div className="space-y-4">
            <Input 
              label="New Login Email" 
              type="email"
              value={newEmail} 
              onChange={(e) => setNewEmail(e.target.value)} 
              placeholder="Leave blank to keep current"
            />
            <Input 
              label="New Password" 
              type="password"
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              placeholder="Leave blank to keep current"
            />
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Button type="submit" variant="outline" className="gap-2">
              Update Credentials
            </Button>
            {authMsg && <span className={`font-medium text-sm max-w-xs leading-tight ${authError ? 'text-red-500' : 'text-emerald-500'}`}>{authMsg}</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
