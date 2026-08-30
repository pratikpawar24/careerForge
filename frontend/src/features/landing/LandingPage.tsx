import { ApplicationTracking } from "./components/ApplicationTracking";
import { Features } from "./components/Features";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { ResumeShowcase } from "./components/ResumeShowcase";

export function LandingPage() {
  return (
    <>
      <Hero />
      <ResumeShowcase />
      <Features />
      <HowItWorks />
      <ApplicationTracking />
      <FinalCta />
      <Footer />
    </>
  );
}