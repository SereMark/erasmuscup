import React from "react";
import { motion } from "framer-motion";

const arrowVariants = {
  open: { rotate: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { rotate: 180, transition: { type: "spring", stiffness: 300, damping: 30 } }
};

const ArrowButton = ({ state, toggle, initialLoad, transition }) => (
  <button onClick={toggle} className="focus:outline-none">
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-6 w-6 text-gray-100"
      variants={arrowVariants}
      initial={initialLoad ? state : undefined}
      animate={state}
      transition={transition}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </motion.svg>
  </button>
);

export default ArrowButton;