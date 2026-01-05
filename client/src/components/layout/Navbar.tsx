import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-shopify-cart";
import logo from "@assets/glenda-logo_1767436360222.png";

const BOOK_VARIANT_ID = "gid://shopify/ProductVariant/51523523805466";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, openCart, addToCart, isLoading } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = async () => {
    try {
      await addToCart(BOOK_VARIANT_ID, 1);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

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
        <Link href="/" className="block group">
          <img 
            src={logo} 
            alt="Glenda Logo" 
            className="h-12 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-xs font-bold tracking-widest uppercase hover:text-primary transition-colors">
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="bg-primary text-white px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors disabled:opacity-50"
            data-testid="button-navbar-add-to-cart"
          >
            {isLoading ? "Adding..." : "Pre-Order Now"}
          </button>
          {cart && cart.totalQuantity > 0 && (
            <button
              onClick={openCart}
              className="relative p-2 hover:bg-muted transition-colors"
              data-testid="button-open-cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.totalQuantity}
              </span>
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          {cart && cart.totalQuantity > 0 && (
            <button
              onClick={openCart}
              className="relative p-2"
              data-testid="button-open-cart-mobile"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.totalQuantity}
              </span>
            </button>
          )}
          <button
            className="p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-6 md:hidden flex flex-col space-y-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-bold tracking-widest uppercase hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              handleAddToCart();
              setIsMobileMenuOpen(false);
            }}
            disabled={isLoading}
            className="bg-black text-white text-center py-3 text-sm font-bold tracking-widest uppercase disabled:opacity-50"
          >
            {isLoading ? "Adding..." : "Pre-Order Now"}
          </button>
        </div>
      )}
    </nav>
  );
}
