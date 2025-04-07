import React from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../../../hooks/useAnimation";
import { fadeInVariants } from "../../../constants/animations";
import { HOUSES } from "../../../constants/houseData";
import { HouseCard } from "../../features/houses/HouseCard";
import { SectionTitle } from "../../common/ui/SectionTitle";

export default function HousesSection() {
  const { ref, inView } = useAnimation({ threshold: 0.1 });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInVariants}
      className="relative z-10"
    >
      <div className="text-center mb-8 sm:mb-12">
        <SectionTitle 
          title="Meet The Four Houses"
          subtitle="Our Founders sorted themselves via 16Personalities Test (section 3).
          Now, you do it on-site. If you skip events, your House suffers (section 5)."
          gradient="from-indigo-300 to-purple-300"
          align="center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
        {HOUSES.map((house) => (
          <HouseCard key={house.name} house={house} inView={inView} />
        ))}
      </div>
    </motion.div>
  );
}