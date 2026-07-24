'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Images, 
  FolderHeart, 
  Tags, 
  MessageSquareHeart, 
  Star, 
  Settings, 
  LogOut,
  Menu,
  X,
  FileImage
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Hero Manager', href: '/admin/dashboard/hero', icon: Images },
  { name: 'Collections', href: '/admin/dashboard/collections', icon: FolderHeart },
  { name: 'Categories', href: '/admin/dashboard/categories', icon: Tags },
  { name: 'Gallery', href: '/admin/dashboard/gallery', icon: FileImage },
  { name: 'Custom Requests', href: '/admin/dashboard/requests', icon: MessageSquareHeart },
  { name: 'Reviews', href: '/admin/dashboard/reviews', icon: Star },
  { name: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Only show sidebar if we are actually in the dashboard (not on the admin login page)
  const isDashboard = pathname.startsWith('/admin/dashboard')

  if (!isDashboard) {
    return <>{children}</>
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-[var(--foreground)]">
      {/* Sidebar Overlay for Mobile */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 shadow-sm transition-transform duration-300 lg:relative lg:translate-x-0 flex flex-col",
          isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl tracking-wide text-[var(--color-brown)]">Studio</h2>
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-[var(--color-cream)] text-[var(--color-brown)] shadow-sm" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-[var(--color-gold)]" : "")} />
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-100 p-4 flex items-center gap-4 shrink-0">
          <button onClick={() => setSidebarOpen(false)} className="p-2 -ml-2 text-gray-500">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-heading text-lg">Studio</span>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  )
}
