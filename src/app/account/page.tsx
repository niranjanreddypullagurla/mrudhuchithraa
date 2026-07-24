'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useEffect, useState } from 'react'

export default function AccountPage() {
  const [email, setEmail] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setEmail(data.user.email ?? '')
      } else {
        router.push('/login')
      }
    })
  }, [router, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (!email) return <div className="min-h-screen pt-32 flex justify-center text-foreground font-body">Loading...</div>

  return (
    <main className="min-h-screen pt-32 pb-20 bg-background relative">
      {/* Decorative */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <h1 className="text-4xl font-heading mb-8 text-foreground">My Account</h1>
        
        <div className="bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-foreground/5">
          <h2 className="text-2xl font-heading mb-6 text-foreground">Profile Details</h2>
          <div className="mb-10 p-6 bg-foreground/5 rounded-2xl">
            <p className="font-body text-sm text-foreground/50 mb-1">Registered Email</p>
            <p className="font-body text-lg text-foreground">{email}</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
            
            {/* Admin Quick Link */}
            {email === 'mrudu@gmail.com' && (
              <Button onClick={() => router.push('/admin/dashboard')} variant="primary">
                Enter Admin Studio
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
