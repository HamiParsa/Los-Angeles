"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  submitting: boolean;
  success: string | null;
  error: string | null;
}

export default function LosAngelesFullSite() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const featuresRef = useRef<HTMLElement | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<FormStatus>({ submitting: false, success: null, error: null });

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  setMenuOpen(false);
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: null, error: null });

    if (!form.name.trim() || !validateEmail(form.email) || !form.message.trim()) {
      setFormStatus({ submitting: false, success: null, error: "Please fill all fields correctly." });
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setFormStatus({ submitting: false, success: "Message sent successfully!", error: null });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setFormStatus({ submitting: false, success: null, error: "Error occurred. Try again." });
    }
  };

  const heroVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const cardVariants = { hidden: { opacity: 0, y: 10 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12 } }) };

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#05060a] via-[#04040a] to-[#000000] text-white antialiased font-sans">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md shadow-md">
        <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm font-semibold tracking-wide uppercase text-gray-100/90 hover:text-[#ff6ad5] transition">
              Los Angeles
            </button>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <button onClick={() => scrollTo(aboutRef)} className="hover:text-[#ff6ad5] transition">About</button>
            <button onClick={() => scrollTo(featuresRef)} className="hover:text-[#ff6ad5] transition">Highlights</button>
            <button onClick={() => scrollTo(galleryRef)} className="hover:text-[#ff6ad5] transition">Gallery</button>
            <button onClick={() => scrollTo(contactRef)} className="hover:text-[#ff6ad5] transition">Contact</button>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-300 hover:text-[#ff6ad5]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md px-6 py-4 flex flex-col gap-4">
            <button onClick={() => scrollTo(aboutRef)} className="text-gray-200 hover:text-[#ff6ad5]">About</button>
            <button onClick={() => scrollTo(featuresRef)} className="text-gray-200 hover:text-[#ff6ad5]">Highlights</button>
            <button onClick={() => scrollTo(galleryRef)} className="text-gray-200 hover:text-[#ff6ad5]">Gallery</button>
            <button onClick={() => scrollTo(contactRef)} className="text-gray-200 hover:text-[#ff6ad5]">Contact</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <main>
        <section className="relative h-screen flex items-center justify-center text-center px-6">
          <div className="absolute inset-0 overflow-hidden">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30" src="https://yourimageshare.com/ib/5kf4k86i7K.mp4"></video>
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-transparent to-black/80"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h1 initial="hidden" animate="visible" variants={heroVariants} className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#ff6ad5] via-[#ff4db8] to-[#00d9ff]">
              LOS ANGELES
            </motion.h1>
            <motion.p initial="hidden" animate="visible" variants={heroVariants} transition={{ delay: 0.15 }} className="mt-6 text-lg md:text-xl text-gray-200/90">
              The city of opportunity, culture, and unforgettable nights. Explore the districts, the luxury, and the hidden places that make Los Angeles legendary.
            </motion.p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a whileHover={{ scale: 1.03 }} className="inline-block px-6 py-3 rounded-full bg-linear-to-r from-[#ff6ad5] via-[#ff4db8] to-[#00d9ff] text-black font-semibold shadow-lg" href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo(galleryRef); }}>
                Explore Gallery
              </motion.a>
              <motion.button whileHover={{ scale: 1.03 }} onClick={() => scrollTo(contactRef)} className="px-6 py-3 rounded-full border border-gray-700 text-sm text-gray-200">
                Contact Us
              </motion.button>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section ref={aboutRef} className="px-6 py-20 bg-linear-to-b from-transparent to-black/60">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={cardVariants} custom={0} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#ff6ad5]">About Los Angeles</h2>
              <p className="text-gray-300 leading-relaxed">
                Los Angeles — more than a city, a global icon. From historic studios to contemporary innovation hubs,
                LA is where creativity, business, and culture collide. Experience neighborhoods each with its own soul,
                venues that shaped cinema, and sunsets that linger like a memory.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <button onClick={() => scrollTo(featuresRef)} className="px-4 py-2 rounded-md bg-linear-to-r from-[#ff4db8] via-[#ff6ad5] to-[#00d9ff] text-black font-medium">Highlights</button>
                <a href="#" className="px-4 py-2 rounded-md border border-gray-700 text-gray-200">Official Info</a>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={cardVariants} custom={1} className="rounded-xl overflow-hidden shadow-lg">
              <Image width={1000} height={1000} src="https://wallpapercave.com/wp/wp6860275.jpg" alt="LA skyline" className="w-full h-72 object-cover" />
            </motion.div>
          </div>
        </section>

        {/* FEATURES / HIGHLIGHTS */}
        <section ref={featuresRef} className="px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-[#ff6ad5]">Highlights</h3>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">Signature places, exclusive experiences, and must-see cultural landmarks.</p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Hollywood & Theaters", desc: "Cinema history, premieres, and iconic streets." },
                { title: "Beaches & Sunset", desc: "Venice, Santa Monica — golden hours and boardwalk life." },
                { title: "Luxury & Nightlife", desc: "Rooftops, clubs, and exclusive dining experiences." },
              ].map((f, i) => (
                <motion.article key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={cardVariants} custom={i} className="bg-[rgba(255,255,255,0.02)] p-6 rounded-2xl shadow-md">
                  <h4 className="text-xl font-semibold">{f.title}</h4>
                  <p className="mt-3 text-gray-300">{f.desc}</p>
                  <a className="mt-4 inline-block text-sm text-[#bfefff] hover:underline" href="#">Learn more →</a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section ref={galleryRef} className="px-6 py-20 bg-linear-to-b from-black/0 to-black/60">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-[#ff6ad5]">Gallery</h3>
            <p className="text-center mt-3 text-gray-300 max-w-2xl mx-auto">A curated selection of LA’s finest moments — photography, streetscapes, and atmosphere.</p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "https://wallpapercave.com/wp/wp4507584.jpg",
                "https://wallpapercave.com/wp/wp6860536.jpg",
                "https://wallpapercave.com/wp/wp6860555.jpg",
                "https://wallpapercave.com/wp/wp6860551.jpg",
              ].map((src, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-xl overflow-hidden shadow-lg">
                  <Image width={1000} height={1000} src={src} alt={`gallery-${i}`} className="w-full h-56 object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section ref={contactRef} className="px-6 py-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-3xl font-bold text-[#ff6ad5]">Contact Us</h3>
              <p className="mt-4 text-gray-300">For partnerships, press, or bespoke experiences — reach out and we’ll connect you with the right team.</p>
              <div className="mt-6 text-gray-300">
                <p><strong>Address:</strong> Los Angeles, CA</p>
                <p className="mt-2"><strong>Email:</strong> info@la-example.com</p>
                <p className="mt-2"><strong>Phone:</strong> +1 (310) 555-0123</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-[rgba(255,255,255,0.02)] p-6 rounded-2xl shadow-md">
              <label className="block text-sm text-gray-300">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="mt-2 w-full rounded-md bg-transparent border border-gray-700 px-3 py-2 placeholder:text-gray-500" placeholder="Your full name" />
              <label className="block text-sm text-gray-300 mt-4">Email</label>
              <input name="email" value={form.email} onChange={handleChange} className="mt-2 w-full rounded-md bg-transparent border border-gray-700 px-3 py-2 placeholder:text-gray-500" placeholder="you@example.com" />
              <label className="block text-sm text-gray-300 mt-4">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="mt-2 w-full rounded-md bg-transparent border border-gray-700 px-3 py-2 placeholder:text-gray-500" placeholder="Tell us what you need"></textarea>
              <div className="mt-6 flex items-center gap-4">
                <button type="submit" disabled={formStatus.submitting} className="px-5 py-2 rounded-full bg-linear-to-r from-[#ff6ad5] via-[#ff4db8] to-[#00d9ff] text-black font-semibold shadow">
                  {formStatus.submitting ? "Sending..." : "Send Message"}
                </button>
                {formStatus.success && <p className="text-green-400">{formStatus.success}</p>}
                {formStatus.error && <p className="text-red-400">{formStatus.error}</p>}
              </div>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-black/70 mt-12">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3">
                <div>
                  <h4 className="font-semibold">Los Angeles</h4>
                  <p className="text-sm text-gray-400">City of Dreams — curated experiences & official guide</p>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-300">
              <h5 className="font-semibold mb-3">Explore</h5>
              <ul className="space-y-2">
                <li><button onClick={() => scrollTo(aboutRef)} className="hover:text-[#ff6ad5]">About</button></li>
                <li><button onClick={() => scrollTo(featuresRef)} className="hover:text-[#ff6ad5]">Highlights</button></li>
                <li><button onClick={() => scrollTo(galleryRef)} className="hover:text-[#ff6ad5]">Gallery</button></li>
                <li><button onClick={() => scrollTo(contactRef)} className="hover:text-[#ff6ad5]">Contact</button></li>
              </ul>
            </div>

            <div className="text-sm text-gray-300">
              <h5 className="font-semibold mb-3">Legal & Social</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#ff6ad5]">Terms</a></li>
                <li><a href="#" className="hover:text-[#ff6ad5]">Privacy</a></li>
                <li className="flex items-center gap-3 mt-2">
                  <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-[#ff6ad5]">IG</a>
                  <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-[#ff6ad5]">TW</a>
                  <a href="#" aria-label="YouTube" className="text-gray-300 hover:text-[#ff6ad5]">YT</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/6">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
              <p>© {new Date().getFullYear()} Los Angeles — All rights reserved.</p>
              <p>Built with care • Accessible • Responsive</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
