'use client'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function CustomOrdersPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newReq = {
      id: Date.now(),
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      type: formData.get('type'),
      desc: formData.get('desc'),
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    }
    const existing = JSON.parse(localStorage.getItem('custom_requests') || '[]')
    localStorage.setItem('custom_requests', JSON.stringify([newReq, ...existing]))
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Background Soft Blobs */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blush/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-sage/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="flex justify-center mb-8">
            <a href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gold transition-colors font-body text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              Back to Home
            </a>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl text-foreground mb-6">Bespoke Creations</h1>
          <p className="font-body text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Every great piece of art starts with a simple conversation. 
            Tell us about your vision, and we will weave it into reality.
          </p>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/40 backdrop-blur-2xl p-8 md:p-14 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 relative"
        >
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="font-heading text-3xl mb-4">Request Received</h2>
              <p className="font-body text-foreground/70 max-w-md mx-auto mb-8">
                Thank you for trusting us with your vision. We will review your request and reach out shortly to discuss timelines and design details.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline">
                Submit Another Request
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input label="Full Name" name="name" required />
                <Input label="Phone Number" name="phone" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input label="Email Address" name="email" type="email" />
                <div className="flex flex-col relative pt-4 group">
                  <label className="absolute left-0 top-7 text-base text-foreground/60 transition-all duration-300 pointer-events-none group-focus-within:-top-1 group-focus-within:text-xs group-focus-within:text-gold">
                    Collection Type
                  </label>
                  <select 
                    required
                    name="type"
                    defaultValue=""
                    className="w-full bg-transparent px-0 py-3 text-base text-foreground transition-all duration-300 border-b border-foreground/20 focus:border-gold outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled hidden></option>
                    <option value="crochet">Crochet</option>
                    <option value="phone-case">Phone Cases</option>
                    <option value="keychains">Keychains</option>
                    <option value="portraits">Portraits</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <Input 
                as="textarea"
                name="desc"
                label="Describe Your Vision" 
                required 
              />

              <div className="pt-4">
                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Submit Commission Request
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  )
}
