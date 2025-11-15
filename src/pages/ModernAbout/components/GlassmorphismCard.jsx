import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import usePerformance from '../hooks/usePerformance';

const GlassmorphismCard = ({ icon: Icon, title, description, onClick, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);
    const { reducedMotion, getAnimationConfig } = usePerformance();

    // Motion values for smooth animations
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring animations for smooth movement
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
        stiffness: 300,
        damping: 30
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
        stiffness: 300,
        damping: 30
    });

    // Animation config based on performance
    const animationConfig = getAnimationConfig();

    // Handle mouse movement for 3D tilt effect
    const handleMouseMove = (e) => {
        if (reducedMotion || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);

        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
        mouseX.set(0);
        mouseY.set(0);
    };

    // Card variants for entrance animation
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9,
            rotateX: -15
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                duration: reducedMotion ? 0.01 : 0.6,
                delay: reducedMotion ? 0 : delay,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    // Icon animation variants
    const iconVariants = {
        initial: { scale: 1, rotate: 0 },
        hover: {
            scale: reducedMotion ? 1 : 1.1,
            rotate: reducedMotion ? 0 : 5,
            transition: { duration: 0.3, ease: "easeOut" }
        }
    };

    // Glow effect variants
    const glowVariants = {
        initial: { opacity: 0, scale: 0.8 },
        hover: {
            opacity: reducedMotion ? 0 : 0.6,
            scale: reducedMotion ? 0.8 : 1.2,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            ref={cardRef}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="group cursor-pointer perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                transformStyle: 'preserve-3d'
            }}
        >
            <motion.div
                className="relative h-full min-h-[320px] p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl overflow-hidden"
                style={{
                    rotateX: reducedMotion ? 0 : rotateX,
                    rotateY: reducedMotion ? 0 : rotateY,
                    transformStyle: 'preserve-3d'
                }}
                whileHover={!reducedMotion ? {
                    scale: 1.05,
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                } : {}}
                whileTap={!reducedMotion ? {
                    scale: 0.98,
                    transition: { duration: 0.1 }
                } : {}}
            >
                {/* Animated gradient border */}
                <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                        background: 'linear-gradient(45deg, #2DD4BF, #14B8A6, #0F766E, #2DD4BF)',
                        backgroundSize: '400% 400%',
                        padding: '2px',
                        zIndex: -1
                    }}
                    animate={isHovered && !reducedMotion ? {
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    } : {}}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <div className="w-full h-full rounded-2xl bg-slate-900/80 backdrop-blur-xl" />
                </motion.div>

                {/* Glow effect */}
                <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-teal-500/20 blur-xl"
                    variants={glowVariants}
                    initial="initial"
                    animate={isHovered ? "hover" : "initial"}
                    style={{ zIndex: -2 }}
                />

                {/* Shine effect */}
                <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                        background: `linear-gradient(
              ${mousePosition.x * 20 + 45}deg,
              transparent 30%,
              rgba(255, 255, 255, 0.1) 50%,
              transparent 70%
            )`,
                        transition: 'all 0.3s ease'
                    }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <motion.div
                        className="mb-6 flex justify-center"
                        variants={iconVariants}
                        initial="initial"
                        animate={isHovered ? "hover" : "initial"}
                    >
                        <div className="relative">
                            <Icon
                                size={48}
                                className="text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 drop-shadow-lg"
                            />

                            {/* Icon glow */}
                            <motion.div
                                className="absolute inset-0 blur-md"
                                animate={isHovered && !reducedMotion ? {
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                } : {}}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Icon size={48} className="text-emerald-400 opacity-50" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                        className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-100 transition-colors duration-300"
                        style={{
                            transform: reducedMotion ? 'none' : `translateZ(20px)`
                        }}
                    >
                        {title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                        className="text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300 flex-grow"
                        style={{
                            transform: reducedMotion ? 'none' : `translateZ(10px)`
                        }}
                    >
                        {description}
                    </motion.p>

                    {/* Interactive indicator */}
                    <motion.div
                        className="mt-6 flex items-center text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
                        initial={{ x: -10 }}
                        animate={isHovered ? { x: 0 } : { x: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <span className="mr-2">Learn More</span>
                        <motion.svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="stroke-current"
                            animate={isHovered && !reducedMotion ? { x: [0, 4, 0] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <path
                                d="M6 3l5 5-5 5"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </motion.svg>
                    </motion.div>
                </div>

                {/* Floating particles effect */}
                {isHovered && !reducedMotion && (
                    <>
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-60"
                                style={{
                                    left: `${20 + i * 15}%`,
                                    top: `${30 + (i % 2) * 40}%`
                                }}
                                animate={{
                                    y: [-10, -30, -10],
                                    opacity: [0.6, 1, 0.6],
                                    scale: [1, 1.5, 1]
                                }}
                                transition={{
                                    duration: 2 + i * 0.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.1
                                }}
                            />
                        ))}
                    </>
                )}

                {/* Ripple effect on click */}
                <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-emerald-400/50 pointer-events-none"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={!reducedMotion ? {
                        scale: [1, 1.1, 1.2],
                        opacity: [0, 0.5, 0]
                    } : {}}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

export default GlassmorphismCard;