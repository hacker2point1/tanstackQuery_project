import CTASection from '@/components/aboutUs/CTASection/CTASection'
import ContactInfo from '@/components/contactUs/contactInfo/contactInfo'
import ContactForm from '@/components/contactUs/contactUsForm/contactUsForm'
import ContactHero from '@/components/contactUs/contactUsHome/contactUsHome'
import ContactUs from '@/components/contactUs/contactUsHome/contactUsHome'
import ContactCTA from '@/components/contactUs/CTASection/CTASection'
import React from 'react'

export default function ContactPage() {
  return (
    <>
      <ContactHero/>
      <ContactInfo/>
      <ContactForm/>
      <ContactCTA/>
    </>
  )
}
