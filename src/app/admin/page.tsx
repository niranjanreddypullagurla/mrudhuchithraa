'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function AdminLogin() {
  const [email, setEmail] = useState('mrudu@gmail.com')
  const [password, setPassword] = useState('admin')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Hardcoded bypass for the requested admin credentials
    if (email === 'mrudu@gmail.com' && password === 'admin') {
      document.cookie = "admin_bypass=true; path=/";
      router.push('/admin/dashboard')
      return
    }

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)] p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl text-[var(--color-brown)] mb-2">Studio Access</h1>
          <p className="text-sm text-gray-500 font-body">Sign in to manage Mrudhuchithraa</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Admin Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="studio@mrudhuchithraa.com"
          />
          
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />

          {error && <div className="text-sm text-red-500 text-center">{error}</div>}

          <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
            Enter Studio
          </Button>
        </form>
      </div>
    </div>
  )
}
