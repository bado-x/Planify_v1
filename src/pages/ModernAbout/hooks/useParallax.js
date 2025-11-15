import { useEffect, useRef, useCallback } from 'react';

const useParallax = (speed = 0.5, options = {}) => {
  const elementRef = useRef(null);
  const rafRef = useRef(null);
  const { 
    enableOnMobile = false, 
    threshold = 0,
    maxOffset = Infinity 
  } = options;

  const handleScroll = useCallback(() => {
    if (!elementRef.current) return;

    // Skip on mobile for performance unless explicitly enabled
    if (!enableOnMobile && window.innerWidth <= 768) return;

    const rect = elementRef.current.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    
    // Only animate if element is in viewport
    if (!isInViewport) return;

    const scrolled = window.pageYOffset;
    const elementTop = elementRef.current.offsetTop;
    const elementHeight = elementRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // Calculate parallax offset with bounds
    let rate = (scrolled - elementTop + windowHeight) * speed;
    
    // Apply threshold and max offset limits
    if (Math.abs(rate) < threshold) rate = 0;
    if (Math.abs(rate) > maxOffset) rate = Math.sign(rate) * maxOffset;
    
    // Use transform3d for hardware acceleration
    elementRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
    elementRef.current.style.willChange = 'transform';
  }, [speed, enableOnMobile, threshold, maxOffset]);

  useEffect(() => {
    // Debounced scroll handler for 60fps performance
    const debouncedScroll = () => {
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
        handleScroll();
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', debouncedScroll, { passive: true });
    window.addEventListener('resize', debouncedScroll, { passive: true });
    
    // Initial call
    debouncedScroll();
    
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      window.removeEventListener('resize', debouncedScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      // Clean up will-change property
      if (elementRef.current) {
        elementRef.current.style.willChange = 'auto';
      }
    };
  }, [handleScroll]);

  return elementRef;
};

export default useParallax;