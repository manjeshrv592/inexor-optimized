"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

interface ContactUsButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const ContactUsButton: React.FC<ContactUsButtonProps> = ({ className, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // State to track if user has scrolled past the hero section
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled past the viewport height (which is the hero section height)
      const scrolledPast = window.scrollY > window.innerHeight;
      setHasScrolledPastHero(scrolledPast);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial check in case the page is already scrolled
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleContactClick = () => {
    console.log("📞 Contact Us button clicked from", pathname);
    if (typeof window !== 'undefined') {
      // If user is already on contact page, navigate to home instead
      const targetHref = pathname === '/contact' ? '/' : '/contact';
      console.log("🎯 Contact target href:", targetHref, "(current:", pathname, ")");
      
      // Store the current path before navigation
      sessionStorage.setItem('lastPath', pathname);
      // Set navigation source for animation direction
      sessionStorage.setItem('navigationSource', 'contact-button');
      
      // Always use router to prevent page reload
      // Standard Next.js navigation without transitions
      console.log("✨ Using standard router for contact navigation");
      requestAnimationFrame(() => {
        router.push(targetHref);
      });
    }
  };

  // Determine what to show based on screen size and scroll state
  const shouldShowPhoneIcon = hasScrolledPastHero;

  return (
    <Button
      onClick={handleContactClick}
      variant={hasScrolledPastHero ? "default" : "outline"}
      size={hasScrolledPastHero ? "sm" : undefined}
      className={`font-michroma text-xs tracking-[1px] ${
        !hasScrolledPastHero ? '[&_.bg-svg_path]:!stroke-[#2A2A2A]' : ''
      } ${className}` }
    >
      {shouldShowPhoneIcon ? (
        <>
          {/* Show phone icon on screens < 1200px, text on larger screens */}
          <span className="xl:hidden">
            <Phone size={16} />
          </span>
          <span className="hidden xl:inline">
            {children || "Contact Us"}
          </span>
        </>
      ) : (
        children || "Contact Us"
      )}
    </Button>
  );
};

export default ContactUsButton;