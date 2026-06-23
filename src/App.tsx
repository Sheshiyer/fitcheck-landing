import { useState, useEffect } from "react";
import CinematicLanding from "./components/CinematicLanding";
import LifestyleSection from "./components/LifestyleSection";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import HowItWorksSection from "./components/HowItWorksSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import PhysicalPage from "./components/PhysicalPage";

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return path;
}

export default function App() {
  const path = useRoute();

  if (path === "/privacy") {
    return <PrivacyPolicy />;
  }

  if (path === "/physical") {
    return <PhysicalPage />;
  }

  return (
    <div className="bg-[#1A1A2E] overflow-x-hidden antialiased font-sans">
      <CinematicLanding />
      <LifestyleSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
