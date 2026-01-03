import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import logo from "@assets/glenda-logo-light_1767438063235.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-12 px-6 md:px-12 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Newsletter Signup</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="bg-transparent border border-secondary-foreground/30 px-4 py-3 text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:border-primary"
                  data-testid="input-first-name"
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="bg-transparent border border-secondary-foreground/30 px-4 py-3 text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:border-primary"
                  data-testid="input-last-name"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-transparent border border-secondary-foreground/30 px-4 py-3 text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:border-primary"
                data-testid="input-newsletter-email"
              />
              <input 
                type="text" 
                placeholder="Birthday (MM/DD)" 
                className="w-full bg-transparent border border-secondary-foreground/30 px-4 py-3 text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:border-primary"
                data-testid="input-birthday"
              />
              <button 
                type="submit" 
                className="bg-primary text-white px-6 py-3 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
                data-testid="button-subscribe"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="space-y-4 md:pl-24">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://instagram.com/saltinherlungs" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors group">
                  Instagram <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://substack.com/@myhealinglanguage" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors group">
                  Substack <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <Link href="/privacy" className="flex items-center hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/acknowledgement" className="flex items-center hover:text-primary transition-colors">
                  Acknowledgement / Land & Lineage
                </Link>
              </li>
            </ul>
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
          
          <div className="text-sm text-muted-foreground">
             <p>© {currentYear} Glenda Macatangay</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
