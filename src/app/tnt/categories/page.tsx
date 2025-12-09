"use client";

import Image from "next/image";
import { Phone, MapPin, User } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white py-14 px-4">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* CEO CARD */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <div className="relative h-64 w-full">
              <Image
                src="/images/ceo.jpg"
                alt="CEO Winnie C Phiri"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 text-center space-y-3">
              <h2 className="text-3xl font-bold text-yellow-400 flex justify-center items-center gap-2">
                <User className="text-yellow-500" />
                Meet Our CEO
              </h2>

              <p className="text-xl font-semibold tracking-wide">
                Winnie C. Phiri
              </p>

              <p className="text-sm text-gray-400 max-w-[500px] mx-auto">
                Founder & CEO of TNT Collection. Dedicated to delivering
                quality, reliability, and outstanding customer experience.
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT CARD */}
        <div className="bg-[#111] rounded-2xl p-8 shadow-2xl border border-gray-800 max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-center text-yellow-400">
            Contact Us
          </h1>

          <div className="space-y-4 text-lg">
            <div className="flex items-center gap-3">
              <Phone className="text-yellow-500" />
             <a href="/">+265 999 868 160</a>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-yellow-500" />
              <span>Lilongwe, Area 49 New Shire, Gulliver</span>
            </div>
          </div>

          <a
            href="https://wa.me/265999868160?text=Hello%20TNT%20Collection,%20I%20would%20like%20to%20make%20an%20inquiry."
            target="_blank"
            className="block w-full text-center bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-all shadow-md"
          >
            Send Message on WhatsApp
          </a>
        </div>

        {/* GOOGLE MAP — REAL EMBEDDED MAP */}
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
          <div className="w-full h-[400px]">
            <iframe
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.2978638278437!2d33.8125!3d-13.9333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1933fdba35b4bcbd%3A0x7f8bae9b1f556fb!2sArea%2049%20New%20Shire%2C%20Gulliver%2C%20Lilongwe!5e0!3m2!1sen!2smw!4v1234567890"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
