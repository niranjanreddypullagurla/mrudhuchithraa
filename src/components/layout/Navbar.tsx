'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, User } from 'lucide-react'
import { cn } from '@/utils/cn'

const links = [
  { name: 'Home', href: '/' },
  { name: 'Collections', href: '/collections' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Custom Orders', href: '/custom-orders' },
  { name: 'Contact', href: '/contact' },
]

export const Navbar = ({ user }: { user: any }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [brandName, setBrandName] = useState('Mrudhuchithraa')
  const [logoType, setLogoType] = useState('text')
  const [logoImage, setLogoImage] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith('/admin')) return
    const data = localStorage.getItem('admin_settings')
    if (data) {
      const parsed = JSON.parse(data)
      if (parsed.brandName) setBrandName(parsed.brandName)
      if (parsed.logoType) setLogoType(parsed.logoType)
      if (parsed.logoImage) setLogoImage(parsed.logoImage)
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  if (pathname.startsWith('/admin')) return null

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-500',
          isScrolled ? 'bg-background/80 backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] py-4' : 'bg-transparent py-6'
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="font-heading text-2xl tracking-wide text-foreground flex items-center">
            {logoType === 'image' && logoImage ? (
              <img src={logoImage} alt="Brand Logo" className="h-10 md:h-12 w-auto object-contain" />
            ) : (
              brandName
            )}
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-gold relative group',
                  pathname === link.href ? 'text-gold' : 'text-foreground'
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-300",
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6 text-foreground">
            <button className="hover:text-gold transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link 
              href={user ? "/account" : "/login"} 
              className="flex items-center gap-2 hover:text-gold transition-colors text-sm font-medium"
            >
              <User className="w-5 h-5" />
              {user ? 'Account' : 'Login'}
            </Link>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-cream flex flex-col pt-24 px-6"
          >
            <button
              className="absolute top-6 right-6 text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="flex flex-col gap-6 text-2xl font-heading text-foreground">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'transition-colors',
                    pathname === link.href ? 'text-gold' : 'hover:text-gold'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-foreground/10 my-4" />
              <Link 
                href={user ? "/account" : "/login"} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-body flex items-center gap-2 hover:text-gold"
              >
                <User className="w-5 h-5" /> {user ? 'My Account' : 'Sign In'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
