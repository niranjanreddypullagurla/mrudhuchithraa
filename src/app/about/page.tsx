export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <header className="mb-16 text-center">
          <div className="flex justify-center mb-8">
            <a href="/" className="inline-flex items-center gap-2 text-[var(--foreground)]/50 hover:text-gold transition-colors font-body text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              Back to Home
            </a>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl text-[var(--foreground)] mb-6">Our Story</h1>
          <p className="font-body text-lg text-[var(--foreground)]/70 leading-relaxed">
            Mrudhuchithraa started as a passion for handcrafted art, slowly blossoming into a digital studio where creativity meets elegance. Every stitch, every brushstroke, and every design is intentional.
          </p>
          <p>
            We believe that art should not just be seen, but experienced. Whether it is a perfectly poured resin piece or a detailed portrait, our goal is to bring a touch of luxury and personalization to your everyday life.
          </p>
        </header>

        <div className="aspect-video w-full bg-[var(--color-beige)] rounded-2xl mb-20 flex items-center justify-center text-[var(--foreground)]/30">
          Studio Video / Image Placeholder
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="aspect-square bg-[var(--color-cream)] rounded-2xl flex items-center justify-center text-[var(--foreground)]/30">
            Artist Photo
          </div>
          <div>
            <h2 className="font-heading text-3xl mb-4">Meet the Artist</h2>
            <p className="font-body text-[var(--foreground)]/70 mb-4">
              Behind every piece at Mrudhuchithraa is an artist dedicated to bringing your vision to life.
              I believe in the beauty of slowness, in taking the time to craft something that feels truly yours.
            </p>
          </div>
        </section>

        <section className="text-center bg-[var(--color-cream)] p-12 rounded-3xl">
          <h2 className="font-heading text-3xl mb-8">Why Choose Handmade?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {['Made with Love', 'Personalized', 'Unique Designs'].map((feature) => (
              <div key={feature} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-gold)]/20 mb-4 flex items-center justify-center text-[var(--color-gold)] font-bold text-xl">✨</div>
                <h3 className="font-heading text-xl">{feature}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
