import { useState, useEffect, useCallback, useRef } from 'react';

const useModal = (options = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const previousFocusRef = useRef(null);
  const modalRef = useRef(null);
  
  const { 
    closeOnEscape = true, 
    closeOnBackdrop = true,
    trapFocus = true,
    preventScroll = true,
    animationDuration = 300 
  } = options;

  const openModal = useCallback((data) => {
    // Store current focus to restore later
    previousFocusRef.current = document.activeElement;
    
    setModalData(data);
    setIsOpen(true);
    
    if (preventScroll) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    }
  }, [preventScroll]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    
    // Restore scroll and padding
    if (preventScroll) {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    
    // Restore focus to previous element
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
    
    // Delay clearing data to allow exit animation
    setTimeout(() => setModalData(null), animationDuration);
  }, [preventScroll, animationDuration]);

  // Enhanced keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      // ESC key handling
      if (event.key === 'Escape' && closeOnEscape) {
        event.preventDefault();
        closeModal();
        return;
      }

      // Tab key handling for focus trapping
      if (event.key === 'Tab' && trapFocus && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal, closeOnEscape, trapFocus]);

  // Auto-focus first element when modal opens
  useEffect(() => {
    if (isOpen && trapFocus && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
      );
      
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen, trapFocus]);

  // Backdrop click handling
  const handleBackdropClick = useCallback((event) => {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      closeModal();
    }
  }, [closeModal, closeOnBackdrop]);

  return {
    isOpen,
    modalData,
    modalRef,
    openModal,
    closeModal,
    handleBackdropClick
  };
};

export default useModal;