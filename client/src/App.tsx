import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Book from "@/pages/Book";
import Tour from "@/pages/Tour";
import Speaking from "@/pages/Speaking";
import Consulting from "@/pages/Consulting";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Acknowledgement from "@/pages/Acknowledgement";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/book" component={Book} />
      <Route path="/tour" component={Tour} />
      <Route path="/speaking" component={Speaking} />
      <Route path="/consulting" component={Consulting} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/acknowledgement" component={Acknowledgement} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
