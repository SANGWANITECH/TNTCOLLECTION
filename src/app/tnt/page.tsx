import FeaturedContent from "@/components/home/FeaturedContent";
import Hero from "@/components/home/Hero";

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
