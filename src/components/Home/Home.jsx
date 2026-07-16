import React from 'react'
import HeroSection from '../sections/HeroSection'
import ClientsSection from '../sections/ClientsSection'
import AboutSection from '../sections/AboutSection'
import ProcessSection from '../sections/ProcessSection'
import ProductsSection from '../sections/ProductsSection'
import ApplicationsGallery from '../sections/ApplicationsGallery'
import SustainabilitySection from '../sections/SustainabilitySection'
import InfrastructureSection from '../sections/InfrastructureSection'
import CTASection from '../sections/CTASection'

export default function Home({ loading }) {
  return (
    <div id="home">
      <HeroSection loading={loading} />
      <ClientsSection />
      <AboutSection />
      <ProcessSection />
      <ProductsSection />
      <ApplicationsGallery />
      <SustainabilitySection />
      <InfrastructureSection />
      <CTASection />
    </div>
  )
}
