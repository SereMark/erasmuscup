import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function useAnimation(options = {}) {
  const { 
    triggerOnce = true, 
    threshold = 0.2,
    rootMargin = "0px" 
  } = options;
  
  const [ref, inView] = useInView({ 
    triggerOnce, 
    threshold,
    rootMargin
  });
  
  const [hasBeenInView, setHasBeenInView] = useState(false);
  
  useEffect(() => {
    if (inView && !hasBeenInView) {
      setHasBeenInView(true);
    }
  }, [inView, hasBeenInView]);
  
  return { ref, inView, hasBeenInView };
}