import AboutUsHeroSection from '@/components/aboutUs/aboutUsHeroSection/aboutUsHeroSection'
import AboutIntro from '@/components/aboutUs/aboutUsIntro/aboutUsIntro'
import CTASection from '@/components/aboutUs/CTASection/CTASection'
import TeamSection from '@/components/aboutUs/teamSection/teamSection'
import WhyChooseUs from '@/components/aboutUs/whyChooseUsSection/whyChooseUsSection'

import React from 'react'

export default function AboutPage() {
  return (
    <>
      <AboutUsHeroSection />
      <AboutIntro/>
      <WhyChooseUs/>
      <TeamSection/>
      <CTASection/>
    </>
  )
}
