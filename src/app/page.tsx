import { Metadata } from "next";
import FeaturedContent from "@/components/home/FeaturedContent";
import Hero from "@/components/home/Hero";

export const metadata: Metadata = {
    description: "TNT COLLECTION: Your destination for curated modern essentials. Shop our exclusive range of high-quality products designed for clean, simple living.",

    openGraph: {
        title: "TNT COLLECTION | Modern Curated Essentials",
        description: "Discover simple, stylish products that elevate your everyday life.",
        url: "https://tnt-collection.store",
        images: [
            {
                url: "/images/home banner.jpg",
                width: 1200,
                height: 630,
                alt: "TNT COLLECTION Home Page Preview",
            },
        ],
    },
};


export default function Home() {

  return (
    <div className="px-2">
      {/* Hero section */}
      <Hero />
      <div>
      <FeaturedContent />
      </div>
    </div>
  );
}
