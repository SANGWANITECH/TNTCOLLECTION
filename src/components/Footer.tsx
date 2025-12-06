import { NextPage } from "next";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Github, Linkedin, PhoneCallIcon, MapPin, Mail } from "lucide-react";
import StayUpdated from "./footer/StayUpdated";

const socialLinks = [
  { href: "https://web.facebook.com/profile.php?id=61565095888624", icon: Facebook },
  { href: "https://x.com/WisdomPhir676", icon: Twitter },
  { href: "https://www.instagram.com/wisdomphiri408/", icon: Instagram },
  { href: "https://github.com/wisdomphiri408", icon: Github },
  { href: "https://www.linkedin.com/in/wisdom-phiri-546a4b364", icon: Linkedin },
];


const Footer: NextPage = () => {
    return(
        <div className="card pt-4 ">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="px-2 flex flex-col gap-4 ">
                <h4 className="text-h4">T&T COLLECTION</h4>
                <p className="text-text-secondary text-sm md:max-w-[300px]">
                    Your trusted partner for quality products. We&apos;re committed to providing the best shopping experience with excellent customer service.
                </p>
           <div className="flex gap-4 items-center">
            {socialLinks.map(({ href, icon: Icon }, i) => (
                <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary"
                >
                <Icon className="w-4 h-4 cursor-pointer" />
                </a>
            ))}
            </div>

            </div>

            {/* Quick Links */}
            <div className="px-2 flex flex-col gap-2 ">
                <h4 className="text-h4 ">Quick Links</h4>
                <div className="flex flex-col gap-2">
                <Link href={'/categories'} className="text-sm text-text-secondary">Home</Link>
                
                    <Link href={'/products'} className="text-sm text-text-secondary">products</Link>
                    
                    <Link href={'/contact'} className="text-sm text-text-secondary">Contact</Link>
                    <Link href={'/support'} className="text-sm text-text-secondary">Support</Link>
                </div>
            </div>

            <div className="px-2 flex flex-col gap-2 ">
                <h4 className="text-h4 ">Categories</h4>
                <div className="flex flex-col gap-2">
                <Link href={'/categories'} className="text-sm text-text-secondary">Men</Link>
                
                    <Link href={'/products'} className="text-sm text-text-secondary">Women</Link>
                    
                    <Link href={'/contact'} className="text-sm text-text-secondary">kids</Link>
                    <Link href={'/support'} className="text-sm text-text-secondary">Footwear                               </Link>
                </div>
            </div>



            {/* Stay Updated */}
            <div className="px-2 flex flex-col gap-2 pb-4">
                <h4 className="text-h4">Stay Updated</h4>

                <p className="text-text-secondary text-sm">
                    Subscribe to our newsletter for the latest updates and exclusive offers.
                </p>
                <div>
                    <StayUpdated />
                </div>
                <div>
                    <Link href={'/'} className="text-text-secondary flex items-center gap-2">
                    <Mail className="w-3 h-3"/>
                    winniecphiri@gmail.com
                    </Link>
                    <div className="text-sm text-text-secondary flex items-center gap-2">
                        <PhoneCallIcon className="w-3 h-3"/> +265999868160
                    </div>
                                     
                    
                    <div className="text-sm text-text-secondary flex items-center gap-2">
                        <MapPin className="w-3 h-3"/>area 49 gulliver_new shire, lilongwe, Malawi
                    </div>
                </div>
            </div>

        </div>
            {/* final links */}
            <div className="flex flex-col gap-2 items-center sm:flex-row justify-between px-4 border-t border-border-dark pt-4">
                <p className="text-sm text-text-secondary text-ce">© 2025   tnt-collection. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    <Link href={'/'} className="text-sm text-text-secondary">Privacy</Link>
                    <Link href={'/'} className="text-sm text-text-secondary">Terms</Link>
                    <Link href={'/'} className="text-sm text-text-secondary">Cookies</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;