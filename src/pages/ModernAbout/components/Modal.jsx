import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { X } from 'lucide-react';
import usePerformance from '../hooks/usePerformance';

const Modal = ({ isOpen, onClose, title, content, icon: Icon }) => {
    const modalRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { reducedMotion, getAnimationConfig } = usePerformance();

    // Motion values for interactive effects
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring animations for smooth tilt
    const rotateX = useSpring(mouseY, { stiffness: 300, damping: 30 });
    const rotateY = useSpring(mouseX, { stiffness: 300, damping: 30 });

    // Animation config based on performance
    const animationConfig = getAnimationConfig();

    // Enhanced keyboard handling
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
                return;
            }

            // Tab key handling for focus trapping
            if (event.key === 'Tab' && modalRef.current) {
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

        // Prevent body scroll and add padding for scrollbar
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, [isOpen, onClose]);

    // Auto-focus first element when modal opens
    useEffect(() => {
        if (isOpen && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
            );

            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    }, [isOpen]);

    // Handle mouse movement for 3D effect
    const handleMouseMove = (e) => {
        if (reducedMotion || !modalRef.current) return;

        const rect = modalRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (e.clientX - centerX) / (rect.width / 2) * 5;
        const y = (e.clientY - centerY) / (rect.height / 2) * 5;

        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
        mouseX.set(0);
        mouseY.set(0);
    };

    // Backdrop click handling
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    // Content rendering with enhanced formatting
    const renderContent = () => {
        if (typeof content === 'string') {
            return (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: animationConfig.duration, delay: 0.1 }}
                >
                    <p className="text-white/90 leading-relaxed text-lg">{content}</p>
                </motion.div>
            );
        }

        if (content.mission && content.vision) {
            return (
                <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: animationConfig.duration, delay: 0.1 }}
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: animationConfig.duration, delay: 0.2 }}
                    >
                        <h4 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center">
                            <span className="w-1 h-8 bg-emerald-400 mr-3 rounded-full"></span>
                            Mission
                        </h4>
                        <p className="text-white/90 leading-relaxed text-lg pl-4">{content.mission}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: animationConfig.duration, delay: 0.3 }}
                    >
                        <h4 className="text-2xl font-bold text-teal-400 mb-4 flex items-center">
                            <span className="w-1 h-8 bg-teal-400 mr-3 rounded-full"></span>
                            Vision
                        </h4>
                        <p className="text-white/90 leading-relaxed text-lg pl-4">{content.vision}</p>
                    </motion.div>
                </motion.div>
            );
        }

        if (Array.isArray(content)) {
            return (
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: animationConfig.duration, delay: 0.1 }}
                >
                    {content.map((value, index) => (
                        <motion.div
                            key={index}
                            className="group relative p-6 rounded-xl bg-white/5 border-l-4 border-emerald-400 hover:bg-white/10 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: animationConfig.duration,
                                delay: 0.2 + index * 0.1
                            }}
                            whileHover={!reducedMotion ? {
                                scale: 1.02,
                                x: 5,
                                transition: { duration: 0.2 }
                            } : {}}
                        >
                            <h4 className="text-xl font-bold text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                                {value.title}
                            </h4>
                            <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300">
                                {value.description}
                            </p>

                            {/* Decorative element */}
                            <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400/50 rounded-full group-hover:bg-emerald-400 transition-colors duration-300"></div>
                        </motion.div>
                    ))}
                </motion.div>
            );
        }

        return null;
    };

    // Animation variants
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: reducedMotion ? 0.01 : 0.3 }
        },
        exit: {
            opacity: 0,
            transition: { duration: reducedMotion ? 0.01 : 0.2 }
        }
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            rotateX: -15
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: reducedMotion ? 0.01 : 0.4,
                ease: "easeOut",
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 30,
            transition: {
                duration: reducedMotion ? 0.01 : 0.2,
                ease: "easeIn"
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={handleBackdropClick}
                >
                    {/* Enhanced Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md">
                        {/* Animated background pattern */}
                        <motion.div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `
                  radial-gradient(circle at 25% 25%, #2DD4BF 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, #14B8A6 0%, transparent 50%)
                `,
                            }}
                            animate={!reducedMotion ? {
                                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                            } : {}}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </div>

                    {/* Modal Container */}
                    <motion.div
                        ref={modalRef}
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-3xl backdrop-blur-xl bg-slate-900/90 border border-white/20 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transformStyle: 'preserve-3d',
                            rotateX: reducedMotion ? 0 : rotateX,
                            rotateY: reducedMotion ? 0 : rotateY
                        }}
                    >
                        {/* Gradient border effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400/20 to-teal-500/20 blur-xl opacity-50"></div>

                        {/* Header */}
                        <motion.div
                            className="relative flex items-center justify-between p-8 border-b border-white/10"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: animationConfig.duration, delay: 0.1 }}
                        >
                            <div className="flex items-center space-x-4">
                                {Icon && (
                                    <motion.div
                                        className="p-3 rounded-xl bg-emerald-400/20 border border-emerald-400/30"
                                        whileHover={!reducedMotion ? {
                                            scale: 1.1,
                                            rotate: 5,
                                            transition: { duration: 0.2 }
                                        } : {}}
                                    >
                                        <Icon size={32} className="text-emerald-400" />
                                    </motion.div>
                                )}
                                <h2 className="text-3xl font-bold text-white">{title}</h2>
                            </div>

                            <motion.button
                                onClick={onClose}
                                className="p-3 rounded-full hover:bg-white/10 transition-colors duration-200 group"
                                whileHover={!reducedMotion ? {
                                    scale: 1.1,
                                    rotate: 90,
                                    transition: { duration: 0.2 }
                                } : {}}
                                whileTap={!reducedMotion ? { scale: 0.9 } : {}}
                            >
                                <X size={24} className="text-white/70 group-hover:text-white transition-colors duration-200" />
                            </motion.button>
                        </motion.div>

                        {/* Content */}
                        <div className="relative p-8 overflow-y-auto max-h-[60vh] custom-scrollbar">
                            {renderContent()}
                        </div>

                        {/* Floating particles for visual enhancement */}
                        {!reducedMotion && (
                            <>
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 bg-emerald-400/60 rounded-full pointer-events-none"
                                        style={{
                                            left: `${10 + i * 12}%`,
                                            top: `${20 + (i % 3) * 30}%`
                                        }}
                                        animate={{
                                            y: [-5, -15, -5],
                                            opacity: [0.6, 1, 0.6],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{
                                            duration: 3 + i * 0.2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: i * 0.2
                                        }}
                                    />
                                ))}
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;