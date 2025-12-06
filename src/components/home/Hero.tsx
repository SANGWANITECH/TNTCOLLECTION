// src/components/Hero.tsx
"use client";

import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Target } from "lucide-react";
import { useEffect, useState } from "react";

const Hero: NextPage = () => {
  const [counts, setCounts] = useState({ products: 0, customers: 0, satisfaction: 0 });

  useEffect(() => {
    const targets = { products: 1000, customers: 1000, satisfaction: 99 };
    const duration = 1200;
    const steps = 40;
    const increments = {
      products: targets.products / steps,
      customers: targets.customers / steps,
      satisfaction: targets.satisfaction / steps,
    };

    let current = { products: 0, customers: 0, satisfaction: 0 };
    const interval = setInterval(() => {
      current.products = Math.min(current.products + increments.products, targets.products);
      current.customers = Math.min(current.customers + increments.customers, targets.customers);
      current.satisfaction = Math.min(current.satisfaction + increments.satisfaction, targets.satisfaction);

      setCounts({
        products: Math.floor(current.products),
        customers: Math.floor(current.customers),
        satisfaction: Math.floor(current.satisfaction),
      });

      if (
        current.products >= targets.products &&
        current.customers >= targets.customers &&
        current.satisfaction >= targets.satisfaction
      ) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-center gap-[var(--gap-fluid)] pt-20 min-h-screen overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
        style={{ opacity: 0.25 }}             // make video barely visible
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* VERY HEAVY OVERLAY with gradient from bottom */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/90 to-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col gap-6 max-w-[500px] lg:max-w-[400px] xl:max-w-[500px] text-center px-6 lg:px-0">

        <h1 className="text-h1 font-heading font-bold text-white drop-shadow-2xl">
          Discover Amazing Products
        </h1>

        <p className="text-body text-white/90 drop-shadow-md max-w-md mx-auto">
          Explore our curated collection of high‑quality products. From electronics to clothing, find everything you need in one place.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <Link href="/tnt/products">
            <Button className="
              w-full sm:w-auto px-8 py-4 text-lg font-medium 
              bg-white/10 text-white backdrop-blur-sm border border-white/20
              hover:bg-white/20 hover:text-white hover:scale-110 
              transition-all duration-300 ease-out shadow-lg
            ">
              Shop Now
            </Button>
          </Link>
          <Link href="/tnt/categories">
            <Button className="
              w-full sm:w-auto px-8 py-4 text-lg font-medium 
              bg-white/10 text-white backdrop-blur-sm border border-white/20
              hover:bg-white/20 hover:text-white hover:scale-110 
              transition-all duration-300 ease-out shadow-lg
            ">
              Contact us
            </Button>
          </Link>
        </div>

        {/* COUNTERS */}
        <div className="flex justify-center gap-8 mt-6 text-white">
          <div className="text-center">
            <p className="text-3xl font-bold drop-shadow-lg">{counts.products.toLocaleString()}+</p>
            <p className="text-sm text-white/85">Products</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold drop-shadow-lg">{counts.customers.toLocaleString()}+</p>
            <p className="text-sm text-white/85">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold drop-shadow-lg">{counts.satisfaction}%</p>
            <p className="text-sm text-white/85">Satisfaction</p>
          </div>
        </div>
      </div>

      {/* HERO IMAGE + BADGE */}
      <div className="relative w-full max-w-[700px] md:aspect-[22/30] aspect-[4/5] lg:aspect-[16/20] mt-8 lg:mt-0">
        <Image
          src="https://images.pexels.com/photos/1020370/pexels-photo-1020370.jpeg"
          alt="hero-image"
          fill
          sizes="(max-width: 1024px) 100vw, 700px"
          className="object-cover rounded-xl shadow-2xl"
          priority
        />
        <div className="absolute bottom-6 left-6 flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          <Target className="w-5 h-5 text-white" />
          <p className="text-white">
            <span className="font-bold">Free Shipping</span><br />
            <span className="text-xs">on order over MK200,000</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
