import { useState, useEffect, useCallback, useRef } from 'react';

const usePerformance = (options = {}) => {
  const [fps, setFps] = useState(60);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafRef = useRef(null);
  
  const { 
    fpsThreshold = 30,
    sampleDuration = 1000,
    enableMonitoring = true 
  } = options;

  // FPS monitoring
  const measureFPS = useCallback(() => {
    const now = performance.now();
    frameCountRef.current++;
    
    if (now - lastTimeRef.current >= sampleDuration) {
      const currentFPS = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current));
      setFps(currentFPS);
      setIsLowPerformance(currentFPS < fpsThreshold);
      
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }
    
    if (enableMonitoring) {
      rafRef.current = requestAnimationFrame(measureFPS);
    }
  }, [fpsThreshold, sampleDuration, enableMonitoring]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Start/stop FPS monitoring
  useEffect(() => {
    if (enableMonitoring) {
      rafRef.current = requestAnimationFrame(measureFPS);
    }
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enableMonitoring, measureFPS]);

  // Debounced function factory
  const createDebouncedFunction = useCallback((func, delay = 16) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // Throttled function factory
  const createThrottledFunction = useCallback((func, delay = 16) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return func.apply(null, args);
      }
    };
  }, []);

  // RAF-based function factory
  const createRAFFunction = useCallback((func) => {
    let rafId = null;
    return (...args) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        func.apply(null, args);
        rafId = null;
      });
    };
  }, []);

  // Get optimized animation config based on performance
  const getAnimationConfig = useCallback(() => {
    if (reducedMotion) {
      return {
        duration: 0.01,
        ease: 'linear',
        reduce: true
      };
    }
    
    if (isLowPerformance) {
      return {
        duration: 0.2,
        ease: 'easeOut',
        reduce: true
      };
    }
    
    return {
      duration: 0.3,
      ease: 'easeOut',
      reduce: false
    };
  }, [reducedMotion, isLowPerformance]);

  // Memory usage monitoring (if available)
  const getMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) // MB
      };
    }
    return null;
  }, []);

  return {
    fps,
    isLowPerformance,
    reducedMotion,
    getAnimationConfig,
    createDebouncedFunction,
    createThrottledFunction,
    createRAFFunction,
    getMemoryUsage
  };
};

export default usePerformance;