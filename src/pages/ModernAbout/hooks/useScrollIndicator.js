import { useState, useEffect, useCallback, useRef } from 'react';

const useScrollIndicator = (options = {}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef(null);
  
  const { 
    threshold = 100, 
    fadeDistance = 200,
    trackProgress = false,
    hideOnBottom = false 
  } = options;

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate visibility based on scroll position
    let visible = scrollY < threshold;
    
    // Hide when near bottom if enabled
    if (hideOnBottom) {
      const nearBottom = scrollY + windowHeight >= documentHeight - 100;
      visible = visible && !nearBottom;
    }
    
    // Calculate opacity for smooth fade
    let opacity = 1;
    if (scrollY > 0 && scrollY < fadeDistance) {
      opacity = Math.max(0, 1 - (scrollY / fadeDistance));
    } else if (scrollY >= fadeDistance) {
      opacity = 0;
      visible = false;
    }
    
    setIsVisible(visible);
    
    // Calculate scroll progress if tracking is enabled
    if (trackProgress) {
      const progress = Math.min(100, (scrollY / (documentHeight - windowHeight)) * 100);
      setScrollProgress(progress);
    }
    
    return { visible, opacity, progress: trackProgress ? scrollProgress : 0 };
  }, [threshold, fadeDistance, hideOnBottom, trackProgress, scrollProgress]);

  useEffect(() => {
    // Optimized scroll handler with RAF
    const debouncedScroll = () => {
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
        handleScroll();
        rafRef.current = null;
      });
    };

    // Throttled resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(debouncedScroll, 150);
    };

    window.addEventListener('scroll', debouncedScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Initial check
    debouncedScroll();
    
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [handleScroll]);

  // Smooth scroll to target function
  const scrollToTarget = useCallback((target, offset = 0) => {
    let targetElement;
    
    if (typeof target === 'string') {
      targetElement = document.querySelector(target);
    } else if (target instanceof Element) {
      targetElement = target;
    }
    
    if (targetElement) {
      const targetPosition = targetElement.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return {
    isVisible,
    scrollProgress,
    scrollToTarget,
    currentScroll: window.pageYOffset || 0
  };
};

export default useScrollIndicator;