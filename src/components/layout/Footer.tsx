'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Camera, Mail, MapPin, Phone } from 'lucide-react'
import { usePathname } from 'next/navigation'

export const Footer = () => {
  const pathname = usePathname()
  
  const [settings, setSettings] = useState({
    instagram: '@mrudhuchithraa',
    email: 'hello@mrudhuchithraa.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India'
  })

  useEffect(() => {
    const data = localStorage.getItem('admin_settings')
    if (data) setSettings(JSON.parse(data))
  }, [])
  
  if (pathname.startsWith('/admin')) return null

  return (
    <footer className="bg-foreground text-white pt-20 pb-10 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-heading text-3xl tracking-wide mb-6 inline-block text-white">
              Mrudhuchithraa
            </Link>
            <p className="font-body text-sm text-white/60 max-w-sm leading-relaxed">
              A luxury handcrafted digital gallery where every collection tells a story, every interaction feels intentional, and every piece reflects the care that goes into handmade creations.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-lg mb-6 text-white/90">Explore</h4>
            <ul className="space-y-4 font-body text-sm text-white/60">
              <li><Link href="/collections" className="hover:text-gold transition-colors">Collections</Link></li>
              <li><Link href="/gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-6 text-white/90">Connect</h4>
            <ul className="space-y-4 font-body text-sm text-white/60">
              <li className="flex items-center gap-3">
                <Camera className="w-4 h-4 text-gold" />
                <a href={`https://instagram.com/${settings.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{settings.instagram}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">{settings.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{settings.location}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 font-body relative z-10">
          <p>&copy; {new Date().getFullYear()} Mrudhuchithraa. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
