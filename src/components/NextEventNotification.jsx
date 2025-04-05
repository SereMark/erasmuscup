import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowButton from "./ArrowButton";

const contentVariants = {
  hidden: { opacity: 0, x: 20, transition: { type: "spring", stiffness: 300, damping: 30 } },
  visible: { opacity: 1, x: 0, transition: { delay: 0.1, type: "spring", stiffness: 120, damping: 20 } }
};

const NextEventNotification = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [safeAreaBottom, setSafeAreaBottom] = useState("0px");

  useEffect(() => {
    const storedState = localStorage.getItem("nextEventNotificationOpen");
    setIsOpen(storedState !== "false");

    const computedSafeArea = getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)') || "0px";
    setSafeAreaBottom(computedSafeArea.trim());

    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);

    setTimeout(() => setInitialLoad(false), 0);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openWidth = isMobile ? 300 : 400;
  const zeroDurationTransition = initialLoad ? { duration: 0 } : undefined;
  const panelVariants = {
    open: { width: openWidth, transition: { type: "spring", stiffness: 150, damping: 25 } },
    closed: { width: 40, height: 48, transition: { type: "spring", stiffness: 250, damping: 30 } }
  };

  const togglePanel = () => {
    if (!hasInteracted) setHasInteracted(true);
    setIsOpen(prev => {
      const newState = !prev;
      localStorage.setItem("nextEventNotificationOpen", newState);
      return newState;
    });
  };

  const maxHeightStyle = isMobile
    ? { maxHeight: `calc(100vh - ${safeAreaBottom} - 16px)` }
    : {};

  return (
    <motion.div
      layout
      style={maxHeightStyle}
      className="fixed bottom-6 right-0 z-50 overflow-hidden"
      variants={panelVariants}
      initial={initialLoad ? (isOpen ? "open" : "closed") : undefined}
      animate={isOpen ? "open" : "closed"}
      transition={zeroDurationTransition}
    >
      <div
        className="bg-[#2a2a2a] rounded-l-xl shadow-xl flex flex-col"
        style={{ paddingBottom: `calc(${safeAreaBottom} + 1rem)` }}
      >
        {isOpen ? (
          <div className="flex items-center justify-between px-4 py-2">
            <h4 className="text-base font-bold text-gray-100">Next Event</h4>
            <div className="w-12 h-12 flex items-center justify-center">
              <ArrowButton state="open" toggle={togglePanel} initialLoad={initialLoad} transition={zeroDurationTransition} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-12 w-12">
            <ArrowButton state="closed" toggle={togglePanel} initialLoad={initialLoad} transition={zeroDurationTransition} />
          </div>
        )}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="px-4 pt-2 pb-4"
              variants={contentVariants}
              initial={initialLoad ? "visible" : "hidden"}
              animate="visible"
              exit="hidden"
              transition={zeroDurationTransition}
            >
              <div className="text-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-center">
                  <motion.img
                    src="/assets/logos/next-event.png"
                    alt="The Actual Cup Game Logo"
                    className="w-24 h-auto object-contain rounded-md"
                  />
                </div>
                <p className="text-base font-semibold text-center">The Actual Cup Game</p>
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