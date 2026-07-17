import React from 'react'
import { motion } from 'framer-motion'

// Import all 9 yarn application images from the assets folder
import canvasClothImg from '../../assets/Application/Canvas Cloth.png'
import carpetsImg from '../../assets/Application/Carpets.png'
import geotextileImg from '../../assets/Application/Geotextile Fabric.png'
import glovesImg from '../../assets/Application/Gloves.png'
import pillowCoversImg from '../../assets/Application/Pillow Covers.png'
import ragsMopsImg from '../../assets/Application/Rags & Mops.png'
import ropesImg from '../../assets/Application/Ropes.png'
import socksImg from '../../assets/Application/Socks.png'
import towelsImg from '../../assets/Application/Towels.png'

const APPLICATIONS_DATA = [
  { img: socksImg, title: "Socks & Hosiery", desc: "High-stretch, breathable cotton-elastane blends designed for extreme durability and everyday comfort." },
  { img: towelsImg, title: "Towels & Terry Cloth", desc: "Highly absorbent, soft carded cotton yarns spun to create plush pile loops with minimal linting." },
  { img: ropesImg, title: "Ropes & Industrial Cordage", desc: "High-tensile coarse count yarns engineered to handle heavy loads, extreme weather, and mechanical stress." },
  { img: carpetsImg, title: "Carpets & Floor Rugs", desc: "Dense, twisted coarse yarns offering premium thickness, wear resistance, and vibrant dye absorption." },
  { img: glovesImg, title: "Knit Protective Gloves", desc: "High-friction, elastic blended yarns tailored for protective wear and seamless industrial knitting." },
  { img: pillowCoversImg, title: "Pillow Covers & Bedding", desc: "Ultra-fine combed yarns woven into high thread counts for a smooth, cooling skin handle." },
  { img: ragsMopsImg, title: "Industrial Cleaning Tools", desc: "High-absorption coarse cotton yarns developed for maximum liquid retention and heavy-duty scrubbing." },
  { img: geotextileImg, title: "Geotextile Reinforcements", desc: "Specialized synthetic-hybrid threads spun for environmental soil filtration, drainage, and structural support." },
  { img: canvasClothImg, title: "Rugged Canvas Fabrics", desc: "Heavy-weight, double-twisted carded yarns designed for tents, sails, military gear, and high-wear canvas." }
]

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}
const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}
const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}
const slideInBottom = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export default function ApplicationsGallery() {
  return (
    <section className="w-full flex flex-col justify-center items-center relative bg-cream/20 noise border-t border-b border-border/40 py-16 md:py-24" id="gallery">
      {/* Soft background blurs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-soft/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-coral-soft/20 blur-3xl pointer-events-none" />

      <div className="container-editorial w-full px-4 md:px-8 relative z-10 text-center">
        
        {/* Header Block */}
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-[13px] text-coral font-semibold tracking-[0.15em] uppercase block mb-3">
            Product End Uses
          </span>
          <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-heading">
            Yarn Applications Gallery
          </h2>
          <p className="text-base text-text mt-4 leading-relaxed max-w-lg mx-auto">
            Explore how our combed and carded yarn packages are processed, woven, and twisted into industrial-strength and consumer luxury fabrics.
          </p>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
        >
          {APPLICATIONS_DATA.map((item, i) => (
            <motion.div
              key={i}
              variants={i % 3 === 0 ? slideInLeft : i % 3 === 2 ? slideInRight : slideInBottom}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className="flex flex-col group bg-white border border-border/50 rounded-3xl overflow-hidden shadow-soft hover:shadow-float transition-all duration-500 text-left"
              data-hover
            >
              {/* Image Frame */}
              <div className="h-56 overflow-hidden bg-cream relative">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Text Area */}
              <div className="p-6 space-y-2 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-heading tracking-tight group-hover:text-coral transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] text-text leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
