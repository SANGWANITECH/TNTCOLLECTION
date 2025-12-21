// app/tnt/layout.tsx
import React from "react";
import Script from "next/script";
import Header from "@/components/Heade";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="antialiased min-h-screen flex flex-col">
        <CartProvider>
          <Header />

          <main className="pt-21 pb-20 flex-grow">
            {children}
          </main>

          <Footer />
        </CartProvider>

        {/* Chatbase AI Floating Widget */}
        <Script id="chatbase-script" strategy="afterInteractive">
          {`
            (function(){
              if(!window.chatbase || window.chatbase("getState") !== "initialized"){
                window.chatbase = (...arguments) => {
                  if(!window.chatbase.q){
                    window.chatbase.q = []
                  }
                  window.chatbase.q.push(arguments)
                };
                window.chatbase = new Proxy(window.chatbase, {
                  get(target, prop){
                    if(prop === "q"){
                      return target.q
                    }
                    return (...args) => target(prop, ...args)
                  }
                })
              }

              const onLoad = function(){
                const script = document.createElement("script");
                script.src = "https://www.chatbase.co/embed.min.js";
                script.id = "nV06O8_baOvjRZJvK4dQi";
                script.domain = "www.chatbase.co";
                document.body.appendChild(script);
              };

              if(document.readyState === "complete"){
                onLoad();
              } else {
                window.addEventListener("load", onLoad);
              }
            })();
          `}
        </Script>
      </div>
    </div>
  );
}
