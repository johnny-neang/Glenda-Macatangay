import { Link } from "wouter";
import { Instagram, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
// Import the logo directly so Vite processes it correctly
import logo from "@assets/glenda-logo-light_1767438063235.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground pt-24 pb-12 px-6 md:px-12 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-serif font-medium leading-tight">
              Let's create something <br />
              <span className="italic text-[#ffffff]">impactful</span> together.
            </h2>
            <a 
              href="mailto:contact@michaela.com" 
              className="inline-flex items-center text-xl md:text-2xl font-bold uppercase tracking-widest hover:text-primary transition-colors group"
            >
              Get in Touch
              <ArrowUpRight className="ml-2 w-6 h-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 md:pl-24">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Sitemap</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#work" className="hover:text-primary transition-colors">Selected Work</a></li>
                <li><a href="#press" className="hover:text-primary transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Socials</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center hover:text-primary transition-colors group">
                    Instagram <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center hover:text-primary transition-colors group">
                    LinkedIn <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center hover:text-primary transition-colors group">
                    Twitter <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end md:items-center pt-8 border-t border-secondary-foreground/10 gap-4">
          <div className="flex items-center gap-4">
             <img 
              src={logo} 
              alt="Glenda Logo" 
              className="h-12 w-auto opacity-80"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-muted-foreground text-right md:text-left">
             <p>© {currentYear} Glenda Macatangay</p>
             <p>Designed & Developed with Care</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
