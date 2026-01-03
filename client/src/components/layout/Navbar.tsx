import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "The Book", href: "/book" },
    { name: "SALTY Tour", href: "/tour" },
    { name: "Speaking", href: "/speaking" },
    { name: "Consulting", href: "/consulting" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12",
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <a className="block group">
            {/* Using text logo for now as the name changed */}
            <span className="text-xl font-serif font-bold tracking-tighter">GLENDA</span>
          </a>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a className="text-xs font-bold tracking-widest uppercase hover:text-primary transition-colors">
                {link.name}
              </a>
            </Link>
          ))}
          <a 
            href="https://squarespace.com/placeholder" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black text-white px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-primary hover:text-black transition-colors"
          >
            Pre-Order Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-6 md:hidden flex flex-col space-y-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a
                className="text-sm font-bold tracking-widest uppercase hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            </Link>
          ))}
          <a 
            href="https://squarespace.com/placeholder" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black text-white text-center py-3 text-sm font-bold tracking-widest uppercase"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pre-Order Now
          </a>
        </div>
      )}
    </nav>
  );
}
