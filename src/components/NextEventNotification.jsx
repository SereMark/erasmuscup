import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const panelVariants = {
  open: {
    width: 400,
    height: 360,
    transition: { type: "spring", stiffness: 150, damping: 25 }
  },
  closed: {
    width: 40,
    height: 48,
    transition: { type: "spring", stiffness: 250, damping: 30 }
  }
};

const arrowVariants = {
  open: {
    rotate: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  closed: {
    rotate: 180,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  }
};

const contentVariants = {
  hidden: {
    opacity: 0,
    x: 20,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.1, type: "spring", stiffness: 120, damping: 20 }
  }
};

const NextEventNotification = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const storedState = localStorage.getItem("nextEventNotificationOpen");
    setIsOpen(storedState === "false" ? false : true);
    setTimeout(() => {
      setInitialLoad(false);
    }, 0);
  }, []);

  const togglePanel = () => {
    if (!hasInteracted) setHasInteracted(true);
    setIsOpen(prev => {
      const newState = !prev;
      localStorage.setItem("nextEventNotificationOpen", newState);
      return newState;
    });
  };

  return (
    <motion.div
      className="fixed bottom-6 right-0 z-50 overflow-hidden"
      variants={panelVariants}
      initial={initialLoad ? (isOpen ? "open" : "closed") : undefined}
      animate={isOpen ? "open" : "closed"}
      transition={initialLoad ? { duration: 0 } : undefined}
    >
      <div className="bg-[#2a2a2a] rounded-l-xl shadow-xl flex flex-col h-full">
        {isOpen ? (
          <div className="flex items-center justify-between px-4 py-2">
            <h4 className="text-base font-bold text-gray-100">Next Event</h4>
            <button onClick={togglePanel} className="focus:outline-none">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-100"
                variants={arrowVariants}
                initial={initialLoad ? "open" : undefined}
                animate="open"
                transition={initialLoad ? { duration: 0 } : undefined}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <button onClick={togglePanel} className="focus:outline-none">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-100"
                variants={arrowVariants}
                initial={initialLoad ? "closed" : undefined}
                animate="closed"
                transition={initialLoad ? { duration: 0 } : undefined}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </button>
          </div>
        )}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="px-4 pb-4"
              variants={contentVariants}
              initial={initialLoad ? "visible" : "hidden"}
              animate="visible"
              exit="hidden"
              transition={initialLoad ? { duration: 0 } : undefined}
            >
              <div className="text-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-center">
                  <motion.img
                    src="/assets/logos/next-event.png"
                    alt="The Actual Cup Game Logo"
                    className="w-24 h-auto object-contain rounded-md"
                  />
                </div>
                <p className="text-base font-semibold text-center">
                  The Actual Cup Game
                </p>
                <p className="text-base text-center">
                  <strong>When:</strong> Saturday, 5 April @ 7:30 PM<br />
                  <strong>Where:</strong> In Common Room 4
                </p>
                <p className="text-base text-gray-400 leading-snug text-center">
                  Expect loud chants, minor humiliations, and hopefully no Buffalo fiascos.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NextEventNotification;