import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MousePointer } from 'lucide-react';
import useScrollIndicator from '../hooks/useScrollIndicator';
import usePerformance from '../hooks/usePerformance';

const ScrollIndicator = () => {
    const { isVisible, scrollToTarget } = useScrollIndicator({
        threshold: 100,
        fadeDistance: 200,
        hideOnBottom: true
    });
    const { reducedMotion, getAnimationConfig } = usePerformance();
    const [isHovered, setIsHovered] = useState(false);

    // Animation config
    const animationConfig = getAnimationConfig();

    const handleClick = () => {
        scrollToTarget('#cards-section', 80);
    };

    // Animation variants
    const containerVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: reducedMotion ? 0.01 : 0.6,
                ease: "easeOut",
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        exit: {
            opacity: 0,
            y: 20,
            scale: 0.8,
            transition: {
                duration: reducedMotion ? 0.01 : 0.3,
                ease: "easeIn"
            }
        }
    };

    const bounceVariants = {
        animate: {
            y: reducedMotion ? 0 : [0, 12, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const pulseVariants = {
        animate: {
            scale: reducedMotion ? 1 : [1, 1.1, 1],
            opacity: reducedMotion ? 0.8 : [0.8, 1, 0.8],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
                    onClick={handleClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <motion.div
                        className="flex flex-col items-center space-y-3 group"
                        whileHover={!reducedMotion ? {
                            scale: 1.1,
                            transition: { duration: 0.2 }
                        } : {}}
                        whileTap={!reducedMotion ? {
                            scale: 0.95,
                            transition: { duration: 0.1 }
                        } : {}}
                    >
                        {/* Main indicator container */}
                        <div className="relative">
                            {/* Background glow */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-emerald-400/30 blur-xl"
                                variants={pulseVariants}
                                animate="animate"
                            />

                            {/* Main circle */}
                            <motion.div
                                className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300"
                                variants={bounceVariants}
                                animate="animate"
                            >
                                {/* Ripple effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-emerald-400/50"
                                    animate={!reducedMotion ? {
                                        scale: [1, 1.5, 2],
                                        opacity: [0.5, 0.2, 0]
                                    } : {}}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeOut"
                                    }}
                                />

                                {/* Icon */}
                                <motion.div
                                    animate={!reducedMotion ? {
                                        rotate: isHovered ? 180 : 0
                                    } : {}}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <ChevronDown
                                        size={24}
                                        className="text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300"
                                    />
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Text label */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: animationConfig.duration,
                                delay: reducedMotion ? 0 : 0.3
                            }}
                        >
                            <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors duration-300 block">
                                Scroll to explore our story
                            </span>

                            {/* Mouse hint */}
                            <motion.div
                                className="flex items-center justify-center mt-2 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: isHovered ? 1 : 0.8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <MousePointer size={12} className="text-emerald-400/70" />
                                <span className="text-emerald-400/70 text-xs">Click or scroll</span>
                            </motion.div>
                        </motion.div>

                        {/* Decorative elements */}
                        {!reducedMotion && (
                            <>
                                {/* Floating dots */}
                                <motion.div
                                    className="absolute -top-4 -left-4 w-1 h-1 bg-emerald-400/60 rounded-full"
                                    animate={{
                                        y: [-3, 3, -3],
                                        opacity: [0.6, 1, 0.6]
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                <motion.div
                                    className="absolute -top-2 -right-6 w-0.5 h-0.5 bg-teal-400/50 rounded-full"
                                    animate={{
                                        y: [3, -3, 3],
                                        opacity: [0.5, 0.8, 0.5]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5
                                    }}
                                />

                                <motion.div
                                    className="absolute -bottom-6 left-2 w-0.5 h-0.5 bg-emerald-300/70 rounded-full"
                                    animate={{
                                        y: [-2, 4, -2],
                                        opacity: [0.7, 1, 0.7]
                                    }}
                                    transition={{
                                        duration: 2.8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                />
                            </>
                        )}

                        {/* Progress indicator */}
                        <motion.div
                            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex space-x-1">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 h-1 bg-emerald-400/50 rounded-full"
                                        animate={!reducedMotion ? {
                                            scale: [1, 1.5, 1],
                                            opacity: [0.5, 1, 0.5]
                                        } : {}}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: i * 0.2
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollIndicator;