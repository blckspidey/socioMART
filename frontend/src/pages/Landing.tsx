import HeroSection from "../components/landing/HeroSection";
import HowItWorks from "../components/landing/HowItWorks";
import FeaturedBusinesses from "../components/landing/FeaturedBusinesses";
export default function Landing() {
  return (
    <main className="white">
      <HeroSection />
      <HowItWorks />
      <FeaturedBusinesses />
    </main>
  );
}
