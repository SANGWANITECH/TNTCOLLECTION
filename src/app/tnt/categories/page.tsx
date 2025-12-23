import { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with TNT COLLECTION. Contact our CEO Winnie C. Phiri or visit our office in Lilongwe, Area 49 Gulliver for premium curated essentials.",
    openGraph: {
        title: "Contact TNT COLLECTION | Lilongwe, Malawi",
        description: "Connect with us via WhatsApp, phone, or visit our location in Area 49.",
    },
};


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white py-14 px-4">
        <ContactClient />
    </div>
  );
}
