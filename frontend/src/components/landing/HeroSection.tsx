import { Link } from "react-router-dom";
import FloatingBusinessPreview from "./FloatingBusinessPreview";
import PageContainer from "../layout/PageContainer";

import { motion, useReducedMotion } from "framer-motion";


export default function HeroSection() {
    const shouldReduceMotion = useReducedMotion();
  return (
    
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative overflow-hidden"
    >
     
      {/* Soft live background glow */}
<div
  className="absolute inset-0 -z-10 pointer-events-none"
  aria-hidden="true"
>
  <motion.div
    className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px]"
    animate={
      shouldReduceMotion
        ? { opacity: 1 }
        : {
            x: [0, 80, -40, 0],
            y: [0, 60, 20, 0],
            scale: [1, 1.08, 1],
          }
    }
    transition={{
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    }}
  />

  <motion.div
    className="absolute top-1/3 right-[-200px] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[140px]"
    animate={
      shouldReduceMotion
        ? { opacity: 1 }
        : {
            x: [0, -60, 40, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.06, 1],
          }
    }
    transition={{
      duration: 26,
      ease: "linear",
      repeat: Infinity,
    }}
  />
</div>



      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        
        {/* LEFT */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Where Selling Goes{" "}
            <span className="relative text-primary">
              Social
              <span className="absolute inset-0 bg-primary/20 blur-2xl -z-10 rounded-full" />
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-md">
            Discover local businesses, explore unique products, and connect
            with sellers who feel like friends — not corporations.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              to="/explore"
              className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-rose-600 transition"
            >
              Explore Businesses →
            </Link>

            <Link
              to="/get-started"
              className="px-6 py-3 rounded-full border border-gray-300 text-gray-800 font-medium hover:bg-gray-100 transition"
            >
              Start Selling
            </Link>
          </div>
        </div>

        {/* RIGHT — Floating preview */}
<div className="hidden md:flex justify-end">
  <FloatingBusinessPreview />
</div>


      </div>
    </motion.section>
  );
}
