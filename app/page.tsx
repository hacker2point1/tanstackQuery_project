import Banner from "@/components/home/banner/banner";
import Image from "next/image";
import HomePage from "./home/page";

import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import AboutUsBanner from "@/components/home/aboutUs/aboutUsSection";
import LocationSection from "@/components/home/location/location";
import ReviewSection from "@/components/home/swipperSection/swiperSection";
import FAQSection from "@/components/home/faqSection/faqSection";

export default function Home() {
  return (
    <>
    {/* <Banner/> */}
    <HomePage/>
    <AboutUsBanner/>
      <ReviewSection/>
      <FAQSection/>
    <LocationSection/>
  
   
    </>
  );
}
