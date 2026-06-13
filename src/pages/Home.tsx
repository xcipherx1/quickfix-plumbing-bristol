import { Toaster } from 'sonner';
import { Navbar } from '@/components/shared';
import {
  Hero,
  Certifications,
  About,
  Reviews,
  Services,
  ServiceDetails,
  Projects,
  Partners,
  WhyChooseUs,
  Process,
  WhoWeServe,
  ServiceAreas,
  CTA,
  FAQs,
  Footer,
} from '@/sections';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <Hero />
        <Certifications />
        <About />
        <Reviews />
        <Services />
        <ServiceDetails />
        <Projects />
        <Partners />
        <WhyChooseUs />
        <Process />
        <WhoWeServe />
        <ServiceAreas />
        <CTA />
        <FAQs />
      </main>
      <Footer />
    </div>
  );
}
