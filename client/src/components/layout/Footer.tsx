import { Link } from "wouter";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import logo from "@assets/glenda-logo-light_1767438063235.png";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const subscribeMutation = useMutation({
    mutationFn: async (data: { email: string; firstName?: string; lastName?: string; birthday?: string }) => {
      return apiRequest("/api/newsletter/subscribe", "POST", data);
    },
    onSuccess: () => {
      setSubscribed(true);
      setErrorMessage("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setBirthday("");
    },
    onError: (error: Error) => {
      setErrorMessage(error.message || "Failed to subscribe. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Email is required");
      return;
    }

    subscribeMutation.mutate({
      email,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      birthday: birthday || undefined,
    });
  };

  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-12 px-6 md:px-12 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#ffffff]">Stay Connected</h3>
            {subscribed ? (
              <div className="flex items-center gap-3 py-8">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-secondary-foreground">Thanks for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-transparent border border-secondary-foreground/30 px-4 py-3 text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:border-primary"
                    data-testid="input-first-name"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-transparent border border-secondary-foreground/30 px-4 py-3 text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:border-primary"
                    data-testid="input-last-name"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border border-secondary-foreground/30 px-4 py-3 text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:border-primary"
                  data-testid="input-newsletter-email"
                />
                <input
                  type="text"
                  placeholder="Birthday (MM/DD)"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full bg-transparent border border-secondary-foreground/30 px-4 py-3 text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:border-primary"
                  data-testid="input-birthday"
                />
                {errorMessage && (
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="bg-primary text-white px-6 py-3 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  data-testid="button-subscribe"
                >
                  {subscribeMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6 md:pl-24">
            <img 
              src={logo} 
              alt="Glenda Logo" 
              className="h-12 w-auto opacity-80"
            />
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

        <div className="pt-8 border-t border-secondary-foreground/10 text-center">
          <p className="text-sm text-muted-foreground">© 2026. Glenda Macatangay</p>
        </div>
      </div>
    </footer>
  );
}
