import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInVariants } from "../../constants/animations";
import { HOUSES } from "../../constants/houseData";
import { HouseCard } from "./HouseCard";

export default function HousesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInVariants}
      className="relative z-10"
    >
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
          Meet The Four Houses
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 sm:mb-6"></div>
        <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed">
          Our Founders sorted themselves via 16Personalities Test (section 3).
          Now, you do it on-site. If you skip events, your House suffers (section 5).
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
        {HOUSES.map((house) => (
          <HouseCard key={house.name} house={house} inView={inView} />
        ))}
      </div>
    </motion.div>
  );
}