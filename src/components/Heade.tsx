"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { ModeToggle } from "./theme-toggle";
import HeaderTabs from "./HeaderTabs";
import UserStatusIndicator from "./UserStatusIndicator";
import CartNotificatiion from "./CartNotification";
import {usePathname} from "next/navigation";


const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = usePathname();
  const isAdminPage = currentPath.startsWith("/admin");

    {/*Don't display header on admin*/}
    if (isAdminPage) return null;
  return (
    <>
      {/* HEADER BAR */}
      <div className="flex justify-between md:justify-center md:gap-[var(--gap-fluid)] fixed left-0 top-0 right-0 items-center border-b border-border-light dark:border-border-dark py-2 backdrop-blur-2xl px-4 sm:px-6 lg:px-8 z-50 bg-background/90">

        {/* LOGO */}
        <div>
          {/* Mobile logo: visible on small, hidden on md+ */}
          <Link
            href="/tnt"
            className="block md:hidden shiny-text text-2xl font-heading font-bold hover:scale-105 transition-transform duration-300"
          >
            T&T
          </Link>

          {/* Desktop logo: hidden on small, visible on md+ */}
          <Link
            href="/tnt"
            className="hidden md:block shiny-text text-2xl font-heading font-bold hover:scale-105 transition-transform duration-300"
          >
            T&T-COLLECTION
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:block">
          <HeaderTabs />
        </div>

        {/* SEARCH (DESKTOP) */}
        <div className="hidden lg:block max-w-xs w-full mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
        </div>

        {/* RIGHT ACTIONS + MOBILE MENU */}
        <div className="flex gap-4 sm:gap-6 items-center">

          <ModeToggle />
          <UserStatusIndicator />

          {/* CART */}
          <div className="relative group">
            <Link
              href="/tnt/cart"
              className="p-2 rounded-full hover:bg-accent/10 dark:hover:bg-accent/20 transition-all duration-300 group-hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5 text-foreground/70 group-hover:text-accent" />
            </Link>
            <CartNotificatiion />
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="block md:hidden cursor-pointer p-2 rounded-lg hover:bg-accent/10 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-accent transition-transform duration-300" />
            ) : (
              <Menu className="w-6 h-6 text-foreground/80 hover:text-accent transition-colors duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* DARK OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* MOBILE MENU PANEL — SLIDES IN */}
      <div
        className={`fixed top-[64px] left-0 h-[calc(100%-64px)] w-72 bg-background/95 backdrop-blur-xl shadow-2xl border-r border-border-light/30 dark:border-border-dark/30 transform transition-transform duration-300 z-50
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col gap-6 p-6">
          <nav className="flex flex-col gap-4 text-lg font-heading">
            <Link
              href="/tnt"
              className="text-foreground/80 hover:text-foreground transition-colors py-2 border-b border-border-light/20 dark:border-border-dark/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/tnt/products"
              className="text-foreground/80 hover:text-foreground transition-colors py-2 border-b border-border-light/20 dark:border-border-dark/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/tnt/categories"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>

          <div className="pt-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
          </div>

          <div className="text-sm text-foreground/60">
            <p>Premium Streetwear • Limited Drops</p>
          </div>

          <div className="text-sm shiny-text text-foreground/60">
            <p>T&T-COLLECTION</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
