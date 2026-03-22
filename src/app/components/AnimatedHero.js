"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AnimatedHero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?search=${query}`);
    } else {
      router.push(`/`);
    }
  };

  return (
    <section className="relative pt-48 pb-20 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-black leading-tight mb-6"
        >
          Find your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Dream Ride
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          The most advanced marketplace for performance and luxury vehicles in Sri Lanka.
        </motion.p>
        
        {/* Search Bar Form */}
        <motion.form 
          onSubmit={handleSearch}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-2xl mx-auto p-2 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center backdrop-blur-sm shadow-2xl"
        >
          <input 
            type="text" 
            placeholder="Search by brand or model (e.g. Toyota)..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent flex-1 px-4 py-3 outline-none text-white"
          />
          <button type="submit" className="bg-blue-600 p-3 rounded-xl hover:bg-blue-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </motion.form>
      </div>
    </section>
  );
}