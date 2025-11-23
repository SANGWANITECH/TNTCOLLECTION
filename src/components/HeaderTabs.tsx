// src/components/HeaderTabs.tsx
'use client'
import { NextPage } from "next";
import { usePathname } from "next/navigation";
import Link from "next/link";

const HeaderTabs: NextPage = () => {
  const pathname = usePathname();
  const activeTab = (href: string) => 
    pathname === href 
      ? 'font-heading font-bold text-foreground' 
      : 'font-heading font-medium text-foreground/70 hover:text-foreground transition-colors';

  return (
    <div className="hidden md:flex gap-6 lg:gap-8 items-center">
      <Link href="/" className={activeTab('/tnt')}>
        Home
      </Link>
      <Link href="/tnt/products" className={activeTab('/tnt/products')}>
        Products
      </Link>
      <Link href="/tnt/categories" className={activeTab('/tnt/categories')}>
        Contact
      </Link>
    </div>
  );
};

export default HeaderTabs;