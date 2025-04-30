import { useEffect, useRef, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';

/**
 * Hook for applying a tilt effect to elements
 * @param {Object} options - Tilt effect options
 * @param {number} options.max - Maximum tilt in degrees
 * @param {number} options.scale - Scale factor on hover
 * @returns {React.RefObject} - Reference to attach to the element
 */
export const useTiltEffect = ({ max = 15, scale = 1.05 } = {}) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    let bounds;
    
    const handleMouseMove = (e) => {
      if (!bounds) bounds = element.getBoundingClientRect();
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const xPercentage = (mouseX - bounds.x) / bounds.width;
      const yPercentage = (mouseY - bounds.y) / bounds.height;
      
      const rotateX = max * (0.5 - yPercentage);
      const rotateY = max * (xPercentage - 0.5);
      
      // Apply transformation
      gsap.to(element, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.4
      });
    };
    
    const handleMouseEnter = () => {
      bounds = element.getBoundingClientRect();
      
      gsap.to(element, {
        scale,
        ease: 'power1.out',
        duration: 0.3
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        ease: 'power3.out',
        duration: 0.5
      });
    };
    
    // Use passive event listeners for better performance
    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [max, scale]);
  
  return ref;
};

/**
 * Hook for scroll-triggered animations
 * @param {Object} options - Animation options
 * @param {string} options.animation - Animation type ('fadeIn', 'slideUp', etc.)
 * @param {number} options.delay - Delay before animation starts
 * @returns {Array} - [ref, inView] tuple
 */
export const useScrollAnimation = ({ animation = 'fadeIn', delay = 0 } = {}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  // Predefined animations
  const animations = useMemo(() => ({
    fadeIn: {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay
    },
    slideUp: {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay
    },
    scaleIn: {
      scale: 0.95,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.5)',
      delay
    }
  }), [delay]);
  
  useEffect(() => {
    if (!inView) return;
    
    const element = ref.current;
    if (!element) return;
    
    // Apply animation
    gsap.from(element, animations[animation] || animations.fadeIn);
    
  }, [inView, animation, animations]);
  
  return [ref, inView];
};

/**
 * Hook for staggered animations on child elements
 * @param {Object} options - Animation options
 * @param {string} options.childSelector - CSS selector for children elements
 * @param {string} options.animation - Animation type
 * @param {number} options.stagger - Stagger delay between elements
 * @param {number} options.delay - Initial delay
 * @returns {Array} - [ref, inView] tuple
 */
export const useStaggerAnimation = ({ 
  childSelector, 
  animation = 'fadeIn', 
  stagger = 0.1, 
  delay = 0 
} = {}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Predefined animations
  const animations = useMemo(() => ({
    fadeIn: {
      opacity: 0,
      duration: 0.6,
      stagger,
      ease: 'power2.out',
      delay
    },
    slideUp: {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger,
      ease: 'power2.out',
      delay
    }
  }), [stagger, delay]);
  
  useEffect(() => {
    if (!inView) return;
    
    const parent = ref.current;
    if (!parent) return;
    
    const children = parent.querySelectorAll(childSelector);
    if (!children.length) return;
    
    // Apply animation
    gsap.from(children, animations[animation] || animations.fadeIn);
    
  }, [inView, childSelector, animation, animations]);
  
  return [ref, inView];
};

/**
 * Utility for clamping a value between min and max
 * @param {number} num - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped value
 */
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);