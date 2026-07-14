import React from 'react'
import AboutSection from '../sections/AboutSection'
import SustainabilitySection from '../sections/SustainabilitySection'
import InfrastructureSection from '../sections/InfrastructureSection'

export default function AboutUs() {
  return (
    <div id="aboutus" className="pt-24 lg:pt-28">
      <AboutSection />
      <SustainabilitySection />
      <InfrastructureSection />
    </div>
  )
}
