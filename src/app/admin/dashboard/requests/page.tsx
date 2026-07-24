'use client'

import { useState, useEffect } from 'react'
import { Trash2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const initialRequests: any[] = []

export default function CustomRequestsManagerPage() {
  const [requests, setRequests] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('custom_requests')
    if (saved) setRequests(JSON.parse(saved))
  }, [])

  const handleStatus = (id: number, newStatus: string) => {
    const updated = requests.map(r => r.id === id ? { ...r, status: newStatus } : r)
    setRequests(updated)
    localStorage.setItem('custom_requests', JSON.stringify(updated))
  }

  const handleDelete = (id: number) => {
    if (confirm("Delete this custom request permanently?")) {
      const updated = requests.filter(r => r.id !== id)
      setRequests(updated)
      localStorage.setItem('custom_requests', JSON.stringify(updated))
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading text-black">Custom Requests</h1>
          <p className="text-gray-500 text-sm mt-1">Review orders submitted through the website.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 text-gray-500">{req.date}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-black">{req.name}</p>
                    <p className="text-xs text-gray-400">{req.email}</p>
                    <p className="text-xs text-gray-400 mt-1">{req.phone}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-gold">{req.type}</td>
                  <td className="px-6 py-4 max-w-xs truncate text-gray-600">{req.desc}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      req.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 
                      req.status === 'Accepted' ? 'bg-blue-100 text-blue-600' :
                      req.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {req.status === 'Pending' && (
                      <>
                        <button onClick={() => handleStatus(req.id, 'Accepted')} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium hover:bg-blue-100 transition-colors mr-2">
                          Accept
                        </button>
                        <button onClick={() => handleStatus(req.id, 'Rejected')} className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-xs font-medium hover:bg-red-100 transition-colors mr-2">
                          Reject
                        </button>
                      </>
                    )}
                    {req.status === 'Accepted' && (
                      <button onClick={() => handleStatus(req.id, 'Completed')} className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-md text-xs font-medium hover:bg-emerald-100 transition-colors mr-2" title="Mark Completed">
                        <CheckCircle className="w-4 h-4 inline mr-1 mb-0.5" /> Complete
                      </button>
                    )}
                    <button onClick={() => handleDelete(req.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-2" title="Delete Request">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
