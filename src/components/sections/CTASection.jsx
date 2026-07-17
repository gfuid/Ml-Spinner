import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}
const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
}

export default function CTASection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <section className="w-full flex items-center justify-center relative bg-white py-16 md:py-24 overflow-hidden" id="contact">
      {/* Background soft gradients */}
      <div className="absolute top-1/4 right-[-10%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-coral-soft to-blue-soft opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#FFF0EE] to-[#EBF2FF] opacity-30 blur-3xl pointer-events-none" />

      <div className="container-editorial w-full px-4 md:px-8 relative z-10">
        
        {/* Breadcrumbs and Top Titles */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-[12px] font-bold text-muted uppercase tracking-[0.3em] block">
            Home &nbsp;/&nbsp; Contact Us
          </span>
          <h1 className="text-[clamp(36px,4.5vw,64px)] font-bold text-heading tracking-tight leading-none">
            Contact Us
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-coral mt-4">
            Need customer support?
          </h2>
          <p className="text-base text-text max-w-md mx-auto leading-relaxed mt-2 font-medium">
            Feel Free to Contact Us on Our Email or Phone No.
          </p>
        </div>

        {/* Form and Contact Cards split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-8">
          
          {/* Left Column: Direct Info Cards */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="lg:col-span-5 flex flex-col gap-6 text-left"
          >
            {/* Address Card */}
            <motion.div 
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="p-6 bg-cream border border-border/40 rounded-3xl hover:shadow-soft transition-all duration-300 flex items-start gap-5"
              data-hover
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-border/30 flex items-center justify-center text-navy shadow-soft flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#FF6B5A] tracking-widest uppercase block mb-1">
                  ADDRESS
                </span>
                <p className="text-[14px] text-heading font-semibold leading-relaxed">
                  Khevat no. 251, Khatoni no. 275, Balana Road, VPO Naultha, Panipat - 132145, Haryana, India
                </p>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div 
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="p-6 bg-cream border border-border/40 rounded-3xl hover:shadow-soft transition-all duration-300 flex items-start gap-5"
              data-hover
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-border/30 flex items-center justify-center text-navy shadow-soft flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#FF6B5A] tracking-widest uppercase block mb-1">
                  CONTACT NUMBER
                </span>
                <a 
                  href="tel:+917422030303" 
                  className="text-[15px] md:text-[16px] text-heading font-bold hover:text-coral transition-colors"
                >
                  +91-7422 030303
                </a>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div 
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="p-6 bg-cream border border-border/40 rounded-3xl hover:shadow-soft transition-all duration-300 flex items-start gap-5"
              data-hover
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-border/30 flex items-center justify-center text-navy shadow-soft flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#FF6B5A] tracking-widest uppercase block mb-1">
                  EMAIL
                </span>
                <div className="flex flex-col gap-1">
                  <a 
                    href="mailto:office@mloverseas.com" 
                    className="text-[15px] md:text-[16px] text-heading font-bold hover:text-coral transition-colors break-all"
                  >
                    office@mloverseas.com
                  </a>
                  <a 
                    href="mailto:Mloverseasoffice@gmail.com" 
                    className="text-[13px] text-muted hover:text-coral transition-colors break-all"
                  >
                    Mloverseasoffice@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Inquiry Input form */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
            className="lg:col-span-7 bg-cream/30 border border-border/60 rounded-[32px] p-8 md:p-10 text-left relative overflow-hidden shadow-lifted"
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-coral to-navy" />
            
            <h3 className="text-xl font-bold text-heading mb-6 tracking-tight">
              Send us an inquiry
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-muted uppercase tracking-wider block">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={form.name} 
                    onChange={e => setForm({...form, name: e.target.value})} 
                    className="w-full bg-white border border-border/50 rounded-xl px-4 py-3 text-[14px] text-heading focus:outline-none focus:border-coral transition-colors" 
                    placeholder="Enter name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-muted uppercase tracking-wider block">Your Email</label>
                  <input 
                    type="email" 
                    required 
                    value={form.email} 
                    onChange={e => setForm({...form, email: e.target.value})} 
                    className="w-full bg-white border border-border/50 rounded-xl px-4 py-3 text-[14px] text-heading focus:outline-none focus:border-coral transition-colors" 
                    placeholder="name@gmail.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-muted uppercase tracking-wider block">Subject</label>
                <input 
                  type="text" 
                  required 
                  value={form.subject} 
                  onChange={e => setForm({...form, subject: e.target.value})} 
                  className="w-full bg-white border border-border/50 rounded-xl px-4 py-3 text-[14px] text-heading focus:outline-none focus:border-coral transition-colors" 
                  placeholder="Inquiry subject"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-muted uppercase tracking-wider block">Message</label>
                <textarea 
                  rows="4" 
                  required 
                  value={form.message} 
                  onChange={e => setForm({...form, message: e.target.value})} 
                  className="w-full bg-white border border-border/50 rounded-xl px-4 py-3 text-[14px] text-heading focus:outline-none focus:border-coral transition-colors resize-none" 
                  placeholder="How can we help you?"
                />
              </div>

              <button 
                type="submit" 
                data-hover 
                className="w-full inline-flex items-center justify-center gap-2.5 bg-navy hover:bg-coral text-white font-bold py-4 rounded-xl shadow-md transition-all duration-300"
              >
                {sent ? (
                  <span>Message Sent Successfully!</span>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

        {/* Location Google Map */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          className="mt-16 w-full rounded-[32px] overflow-hidden border border-border/60 shadow-lifted h-[350px] md:h-[450px] relative bg-cream"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111586.82285854651!2d76.84332468305886!3d29.35338167812543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390dd9bb9d6a2f7f%3A0x64e6f494f1c90c74!2sBalana%20Rd%2C%20Naultha%2C%20Haryana%20132145!5e0!3m2!1sen!2sin!4v1717652758496!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
            title="ML Overseas Location Map"
          ></iframe>
        </motion.div>

      </div>
    </section>
  )
}
