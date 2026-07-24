'use client'

import { useState, useEffect } from 'react'
import { 
  LayoutDashboard, 
  Images, 
  FolderHeart, 
  MessageSquareHeart, 
  Star 
} from 'lucide-react'

export default function DashboardPage() {
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('custom_requests')
    if (saved) {
      const requests = JSON.parse(saved)
      const pending = requests.filter((r: any) => r.status === 'Pending')
      setPendingCount(pending.length)
    }
  }, [])

  const statCards = [
    { title: 'Total Collections', value: '0', icon: FolderHeart, trend: '0 this month' },
    { title: 'Gallery Items', value: '0', icon: Images, trend: '0 this week' },
    { title: 'Pending Requests', value: pendingCount.toString(), icon: MessageSquareHeart, trend: `${pendingCount} requires action` },
    { title: 'New Reviews', value: '0', icon: Star, trend: '0 average rating' },
  ]
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading text-gray-900">Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium text-sm">{stat.title}</span>
                <div className="w-10 h-10 rounded-full bg-[var(--color-cream)] flex items-center justify-center text-[var(--color-gold)]">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-heading text-gray-900">{stat.value}</h3>
                <p className="text-xs text-gray-400 mt-1">{stat.trend}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-96 flex items-center justify-center text-gray-400 border-dashed">
          <p className="font-body text-sm">Chart Placeholder (Monthly Requests)</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-96 flex flex-col">
          <h3 className="font-heading text-lg mb-4 text-gray-800">Recent Activity</h3>
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm italic">
            No recent activity recorded
          </div>
        </div>
      </div>
    </div>
  )
}
