import React from 'react'
import ProcessSection from '../sections/ProcessSection'
import ProductsSection from '../sections/ProductsSection'
import ApplicationsGallery from '../sections/ApplicationsGallery'
import LabSection from '../sections/LabSection'

export default function Applications() {
  return (
    <div id="applications" className="pt-24 lg:pt-28">
      <ProcessSection />
      <ProductsSection />
      <ApplicationsGallery />
      <LabSection />
    </div>
  )
}
