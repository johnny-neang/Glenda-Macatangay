import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  width?: "fit-content" | "100%";
}

export function ScrollReveal({ children, className, delay = 0, width = "fit-content" }: ScrollRevealProps) {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function StaggerContainer({ children, className, stagger = 0.2 }: { children: React.ReactNode, className?: string, stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const revealVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }
};
