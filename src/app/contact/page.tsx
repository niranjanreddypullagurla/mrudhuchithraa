import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <header className="mb-16 text-center">
          <div className="flex justify-center mb-8">
            <a href="/" className="inline-flex items-center gap-2 text-[var(--foreground)]/50 hover:text-gold transition-colors font-body text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              Back to Home
            </a>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl text-[var(--foreground)] mb-4">Contact Studio</h1>
          <p className="font-body text-lg text-[var(--foreground)]/70 max-w-xl mx-auto">
            Have a question about our collections or want to collaborate? We'd love to hear from you.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
              <h2 className="font-heading text-2xl mb-6">Get in Touch</h2>
              <div className="space-y-6 font-body text-[var(--foreground)]/80">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[var(--color-gold)] shrink-0" />
                  <p>Bangalore, Karnataka<br/>India</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-[var(--color-gold)] shrink-0" />
                  <p>+91 98765 43210</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-[var(--color-gold)] shrink-0" />
                  <p>hello@mrudhuchithraa.com</p>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[var(--color-gold)] shrink-0" />
                  <p>Mon - Fri, 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="aspect-video w-full bg-[var(--color-beige)] rounded-2xl flex items-center justify-center text-[var(--foreground)]/30">
              Map Placeholder
            </div>
          </div>

          <div className="bg-[var(--color-cream)] p-8 md:p-10 rounded-3xl">
            <h2 className="font-heading text-2xl mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input label="First Name" placeholder="Jane" />
                <Input label="Last Name" placeholder="Doe" />
              </div>
              <Input label="Email" type="email" placeholder="jane@example.com" />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--foreground)]">Message</label>
                <textarea 
                  className="w-full rounded-md border border-[var(--foreground)]/20 bg-transparent px-4 py-3 text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] min-h-[150px] resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <Button type="button" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
