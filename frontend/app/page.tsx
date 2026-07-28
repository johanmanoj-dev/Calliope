import { Navbar } from '@/components/marketing/Navbar';
import { Hero } from '@/components/marketing/Hero';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { Footer } from '@/components/marketing/Footer';

export default function HomePage() {
  return (
    <div className="dark bg-[#0A0A0F] text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureGrid />
      </main>
      <Footer />
    </div>
  );
}
